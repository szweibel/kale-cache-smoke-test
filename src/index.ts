import { Hono } from "hono";

type CacheNamespace = {
  put(key: string, value: string): Promise<void>;
  get(key: string): Promise<string | null>;
};

type Bindings = {
  CACHE: CacheNamespace;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => c.html(`<!doctype html>
<html lang="en">
  <body style="font-family: ui-sans-serif, sans-serif; padding: 2rem;">
    <h1>kale-cache-smoke-test</h1>
    <p>This app verifies the isolated CACHE namespace that Kale Deploy provisions for a project.</p>
    <p><a href="/api/cache-smoke">Run the cache smoke test</a></p>
  </body>
</html>`));

app.get("/api/health", (c) => c.json({ ok: true, project: "kale-cache-smoke-test" }));

app.get("/api/cache-smoke", async (c) => {
  const key = "smoke:ping";
  const value = `CACHE smoke test at ${new Date().toISOString()}`;
  await c.env.CACHE.put(key, value);
  const readBack = await c.env.CACHE.get(key);

  return c.json({
    ok: true,
    binding: "CACHE",
    key,
    wrote: value,
    readBack,
    matches: readBack === value
  });
});

export default app;
this is not valid typescript
