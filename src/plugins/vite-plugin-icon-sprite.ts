import { promises as fs } from "fs";
import path from "path";

export default function IconSpritePlugin() {
  async function generateIconSprite() {
    const iconsDir = path.join(process.cwd(), "public", "icons");
    const files = await fs.readdir(iconsDir);
    let symbols = "";
    for (const file of files) {
      if (!file.endsWith(".svg")) continue;
      let svgContent = await fs.readFile(path.join(iconsDir, file), "utf8");
      const id = file.replace(".svg", "");
      svgContent = svgContent
        .replace(/id="[^"]+"/, "")
        .replace("<svg", `<symbol id="${id}"`)
        .replace("</svg>", "</symbol>");
      symbols += svgContent + "\n";
    }
    const sprite = `<svg width="0" height="0" style="display: none">\n\n${symbols}</svg>`;
    await fs.writeFile(
      path.join(process.cwd(), "public", "icon-sprite.svg"),
      sprite,
    );
  }

  async function generateIconType() {
    const iconsDir = path.join(process.cwd(), "public", "icons");
    const files = await fs.readdir(iconsDir);
    const iconNameType =
      'export type TGeneratedIconName = "' +
      files.map((f) => f.replace(".svg", "")).join('" | "') +
      '"' +
      "| string";
    await fs.writeFile(
      path.join(process.cwd(), "src/types", "generatedIconName.ts"),
      iconNameType,
    );
  }
  const onBuildStart = async () => {
    await generateIconSprite();
    await generateIconType();
  };
  return {
    name: "icon-sprite-plugin",
    buildStart() {
      return onBuildStart();
    },
    configureServer(server: any) {
      server.watcher.add(path.join(process.cwd(), "public", "icons", "*.svg"));
      server.watcher.on("change", async (changedPath: string) => {
        if (changedPath.endsWith(".svg")) return generateIconSprite();
      });
    },
  };
}
