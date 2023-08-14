import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  format: ["esm", "cjs"],
  minify: true,
  bundle: true,
  skipNodeModulesBundle: true,
  entry: ["src/index.ts"],
  target: "es2020",
  platform: "browser",
});
