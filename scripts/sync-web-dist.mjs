import { cpSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const dist = resolve(root, "web-dist");

mkdirSync(dist, { recursive: true });

for (const file of ["index.html", "app.js", "styles.css", "tauri-bridge.js"]) {
  cpSync(resolve(root, file), resolve(dist, file), { force: true });
}

if (existsSync(resolve(root, "assets"))) {
  cpSync(resolve(root, "assets"), resolve(dist, "assets"), { recursive: true, force: true });
}

