// 把「统一内容仓库」同步进站点，使站点可自包含构建 / 部署。
// - JSON（index + tech + industry）  -> <root>/content/
// - docx 原件                       -> <root>/public/docs/<type>/<week>.docx （供下载）
//
// 源仓库默认 D:\Workbuddy_data\sequencing-weekly-hub，可用环境变量 SOURCE_HUB 覆盖。
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const SOURCE = process.env.SOURCE_HUB || "D:/Workbuddy_data/sequencing-weekly-hub";

function ensureDir(d) {
  fs.mkdirSync(d, { recursive: true });
}
function copyFile(src, dst) {
  if (!fs.existsSync(src)) return false;
  ensureDir(path.dirname(dst));
  // 目标可能带只读属性（如 npm 安装后），先解除再覆盖，避免 Windows EPERM
  if (fs.existsSync(dst)) {
    try { fs.chmodSync(dst, 0o666); } catch { /* ignore */ }
  }
  try {
    fs.copyFileSync(src, dst);
    return true;
  } catch (e) {
    // 目标被其它进程占用（宿主文件监视器/残留进程拒绝写-删）时，降级为跳过：
    // content/ 中已存在的数据依然可用，构建照常进行；如需强制刷新，先解除占用或改读 hub。
    console.warn(`[sync] 跳过(文件被占用无法覆盖)： ${dst} -> ${e.code || e.message}`);
    return false;
  }
}

function main() {
  if (!fs.existsSync(SOURCE)) {
    // CI/云端构建机（Vercel/Netlify 等）没有本地 D 盘统一仓库：跳过同步，
    // 直接使用仓库内已提交的 content/ 与 public/docs/（由每周自动化 push 刷新）。
    console.warn(`[sync] 源仓库不存在(${SOURCE})，跳过同步（将直接使用已提交的 content/）`);
    return;
  }
  ensureDir(path.join(root, "content", "tech"));
  ensureDir(path.join(root, "content", "industry"));
  ensureDir(path.join(root, "public", "docs", "tech"));
  ensureDir(path.join(root, "public", "docs", "industry"));

  // index.json
  copyFile(path.join(SOURCE, "index.json"), path.join(root, "content", "index.json"));

  let count = 0;
  for (const type of ["tech", "industry"]) {
    const srcDir = path.join(SOURCE, type);
    if (!fs.existsSync(srcDir)) continue;
    for (const fn of fs.readdirSync(srcDir)) {
      const src = path.join(srcDir, fn);
      if (fn.endsWith(".json")) {
        copyFile(src, path.join(root, "content", type, fn));
        count++;
      } else if (fn.endsWith(".docx")) {
        copyFile(src, path.join(root, "public", "docs", type, fn));
      }
    }
  }
  console.log(`[sync] 已从 ${SOURCE} 同步 ${count} 个 JSON + docx 到 content/ 与 public/docs/`);
}

main();
