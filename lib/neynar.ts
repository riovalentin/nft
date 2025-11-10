import { NeynarAPIClient, Configuration } from "@neynar/nodejs-sdk";
export const neynar = new NeynarAPIClient(new Configuration({ apiKey: process.env.NEYNAR_API_KEY! }));

export async function getUserByFid(fid: number) {
  const r = await neynar.userV2(fid);
  const u = r.result.user;
  return { fid: u.fid, username: u.username, displayName: u.display_name, pfp: u.pfp?.url || "" };
}
