"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [fid, setFid] = useState<number>();
  const [pfp, setPfp] = useState<string>("");
  const [metadataURI, setMetadataURI] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function loadProfile() {
    const inputFid = prompt("Masukkan FID Farcaster kamu:");
    if (!inputFid) return;
    const r = await fetch("/api/profile", { method: "POST", headers: { "Content-Type":"application/json" }, body: JSON.stringify({ fid: Number(inputFid) }) });
    const d = await r.json();
    setFid(d.fid); setPfp(d.pfp);
  }

  async function generate() {
    if (!fid || !pfp) return alert("Load profile dulu.");
    setLoading(true);
    const r = await fetch("/api/generate", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ fid, pfpUrl: pfp }) });
    const d = await r.json();
    setMetadataURI(d.metadataURI);
    setLoading(false);
  }

  async function approveAndMint() {
    alert("Wallet flow dilakukan di produk final (approve 0.01 USDC lalu mint). Pastikan NEXT_PUBLIC addresses terisi.");
  }

  return (
    <main style={{ maxWidth: 480, margin: "0 auto", padding: 16 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>Cyberpunk PFP Mini App</h1>

      <section style={{ marginTop: 12, border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
        <button onClick={loadProfile}>Load Farcaster Profile</button>
        {fid && (
          <div style={{ marginTop: 8, display: "flex", gap: 12, alignItems: "center" }}>
            {pfp && <Image src={pfp} alt="pfp" width={64} height={64} style={{ borderRadius: 999 }} />}
            <div>FID: {fid}</div>
          </div>
        )}
      </section>

      <section style={{ marginTop: 12, border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
        <button onClick={generate} disabled={!pfp || loading}>
          {loading ? "Generating..." : "Generate NFT"}
        </button>
        {loading && <p style={{ opacity: 0.7 }}>Please wait…</p>}
        {metadataURI && <p style={{ marginTop: 8, fontSize: 12, wordBreak: "break-all" }}>metadataURI: {metadataURI}</p>}
        <button style={{ marginTop: 8 }} onClick={approveAndMint} disabled={!metadataURI}>Pay 0.01 USDC & Mint</button>
      </section>
    </main>
  );
}
