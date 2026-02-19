import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import sollicitatieHandler from "./api/sollicitatie";
import contactHandler from "./api/contact";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load ALL env vars (incl. RESEND_*) into process.env for dev middleware.
  const env = loadEnv(mode, process.cwd(), "");
  for (const [k, v] of Object.entries(env)) process.env[k] = v;

  return {
    plugins: [
      react(),
      {
        name: "keppler-dev-api",
        configureServer(server) {
          const mount = (path: string, handler: any) => {
            server.middlewares.use(path, (req, res, next) => {
              if (!req.url) req.url = "/";
              if (req.method !== "POST") return next();

              let body = "";
              req.on("data", (c) => {
                body += String(c);
              });
              req.on("end", async () => {
                try {
                  (req as any).body = body ? JSON.parse(body) : {};
                } catch {
                  res.statusCode = 400;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ ok: false, error: "Invalid JSON body." }));
                  return;
                }

                try {
                  await handler(req, res);
                } catch (e: any) {
                  res.statusCode = 500;
                  res.setHeader("Content-Type", "application/json");
                  res.end(
                    JSON.stringify({
                      ok: false,
                      error: e?.message ? String(e.message) : "Server error.",
                    }),
                  );
                }
              });
            });
          };

          mount("/api/sollicitatie", sollicitatieHandler as any);
          mount("/api/contact", contactHandler as any);
        },
      },
    ],
  };
});
