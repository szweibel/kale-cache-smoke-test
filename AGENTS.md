# kale-cache-smoke-test

This repository targets CAIL Deploy on Cloudflare Workers.

## What to build

- Prefer TypeScript and Hono unless there is a clear reason not to.
- Prefer small server-rendered HTML routes and lightweight JSON APIs.
- Keep the project simple and editable for collaborators who may not be deeply technical.

## Good first app shapes

- exhibit or archive sites
- course or project sites
- guestbooks, forms, and submissions
- small APIs
- bibliographies or lightweight searchable collections

## Deployment assumptions

- Production bindings are attached by the CAIL Deploy service, not by this repository.
- Keep `wrangler.jsonc` minimal and local-development-focused.
- Run `npm run check` after structural changes.
- Before asking Kale Deploy to validate or deploy, make sure this repo still has:
  - `package.json`
  - `wrangler.jsonc`
  - `src/index.ts`
  - a root route at `/`
  - `/api/health`

## Standard binding names

- `DB`: D1 database
- `FILES`: R2 bucket or project-scoped file storage facade
- `CACHE`: KV namespace
- `AI`: Workers AI
- `VECTORIZE`: Vectorize index
- `ROOMS`: Durable Object namespace

Current policy defaults for platform-managed bindings are:

- `DB`, `FILES`, and `CACHE` are self-service
- `AI`, `VECTORIZE`, and `ROOMS` require approval
- `FILES` and `CACHE` are attached as isolated per-project resources when the repository requests them

To request `FILES` or `CACHE`, add the standard binding names to `wrangler.jsonc`:

- `r2_buckets` with `binding: "FILES"`
- `kv_namespaces` with `binding: "CACHE"`

Kale replaces the production bucket and namespace values during deployment, so local placeholder values are acceptable when the repository only needs the production binding.

## Guardrails

- Avoid Python, native Node modules, long-running jobs, and local filesystem assumptions.
- Do not use `app.listen(...)`, Express-style bootstraps, or long-lived in-memory server state.
- Prefer Workers-compatible packages.
- Use plain-language UX and error messages where possible.
- If Kale Deploy returns a `guidedInstallUrl`, stop and hand that URL to the user for the GitHub approval step.
