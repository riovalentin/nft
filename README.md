# Cyberpunk PFP Mini App (Farcaster + Vercel)

1. Isi `.env.local` berdasarkan `.env.example`.
2. `npm i`
3. Deploy kontrak: `npm run compile:contracts` lalu `npm run deploy:base-sepolia`.
4. Set `NEXT_PUBLIC_NFT_ADDRESS` ke alamat kontrak deploy.
5. Jalankan lokal: `npm run dev`.
6. Deploy ke Vercel dan set Environment Variables yang sama.


## Base Mainnet
- Set `NEXT_PUBLIC_CHAIN_ID=8453`
- Set `NEXT_PUBLIC_USDC_ADDRESS=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- Provide `RPC_BASE_MAINNET` and your `DEPLOYER_PK`
- Deploy: `npm run deploy:base-mainnet`

- Treasury wallet (USDC receiver) preset: `0x42ff9e6432a7523fD8194Cb37d4B37d8092E0E10`
