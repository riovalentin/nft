import { NextResponse } from "next/server";
import sharp from "sharp";
import { w3 } from "@/lib/ipfs";
import { File } from "web3.storage";

export async function POST(req: Request) {
  const { fid, pfpUrl, title } = await req.json();
  if (!pfpUrl || !fid) return NextResponse.json({ error: "missing params" }, { status: 400 });

  const pfpRes = await fetch(pfpUrl);
  const pfpBuf = Buffer.from(await pfpRes.arrayBuffer());
  const tmplRes = await fetch(new URL("/templates/card_cyberpunk.png", process.env.APP_BASE_URL).toString());
  const tmplBuf = Buffer.from(await tmplRes.arrayBuffer());

  const avatarProcessed = await sharp(pfpBuf).resize(700,700).modulate({saturation:0.6,brightness:1.1}).blur(1.5).toBuffer();
  const finalPng = await sharp(tmplBuf).composite([{ input: avatarProcessed, gravity:"center", blend:"overlay", opacity:0.35 }]).png().toBuffer();

  const imageFile = new File([finalPng], `nft_${fid}.png`, { type: "image/png" });
  const imageCid = await w3.put([imageFile], { name: `nft-image-${fid}` });
  const imageURI = `ipfs://${imageCid}/nft_${fid}.png`;

  const meta = { name: title ?? `Cyberpunk PFP #${fid}`, description: "Cyberpunk-styled from Farcaster PFP (low influence).", image: imageURI, attributes: [{ trait_type: "Source", value: "Farcaster PFP" }] };
  const metaFile = new File([Buffer.from(JSON.stringify(meta))], `metadata_${fid}.json`, { type: "application/json" });
  const metaCid = await w3.put([metaFile], { name: `nft-meta-${fid}` });
  const metadataURI = `ipfs://${metaCid}/metadata_${fid}.json`;

  return NextResponse.json({ imageURI, metadataURI });
}
