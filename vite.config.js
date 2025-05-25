import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "VITE_");

	return {
		plugins: [react(), tailwindcss()],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
		server: {
			host: "0.0.0.0",
			port: process.env.PORT || 3000,
			proxy: {
				"/api": {
					target: env.VITE_PROXY_TARGET,
					changeOrigin: true,
					secure: false,
				},
			},
		},
		preview: {
			host: "0.0.0.0",
			port: process.env.PORT || 3000,
			allowedHosts: ["crm-frontend-zylg.onrender.com"],
		},
	};
});
