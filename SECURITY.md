# Security Notes

- **Never commit secrets**: `.env.local` is ignored by `.gitignore`. Use Vercel Project Environment Variables.
- **Tokens**: `NEYNAR_API_KEY` and `WEB3_STORAGE_TOKEN` must only be set in server-side environment.
- **CSP & Headers**: See `middleware.ts` for Content Security Policy and hardening headers.
- **Rate limiting**: Basic in-memory limiter for API routes. For production, prefer Vercel Edge Config or an external KV/Redis.
- **Payments**: Contract pulls **0.01 USDC (6 decimals)** from the caller after explicit `approve`. Ensure you verify token addresses on Base mainnet.
- **File templates**: Only serve trusted assets from `/public`. Avoid proxying arbitrary URLs from user input.
- **Dependency updates**: Audit regularly with `npm audit` and lock major versions.
