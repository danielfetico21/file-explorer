import { existsSync, renameSync, mkdirSync, readdirSync, rmdirSync } from "fs";
import { join, basename } from "path";

const basePath = join(__dirname, "src", "components");
const fromDir = join(basePath, "SmallComponents");
const toFileExplorer = join(basePath, "fileExplorer");
const toShared = join(basePath, "shared");

// Define fișierele care merg în fileExplorer
const fileExplorerFiles = [
  "FileHeader.tsx",
  "FileDetails.tsx",
  "FileError.tsx",
  "FileList.tsx",
];

// Restul merg în shared
function moveFile(fileName, destination) {
  const from = join(fromDir, fileName);
  const to = join(destination, fileName);

  if (existsSync(from)) {
    renameSync(from, to);
    console.log(`✅ Moved ${fileName} -> ${basename(destination)}/`);
  } else {
    console.warn(`⚠️ File not found: ${fileName}`);
  }
}

function ensureDir(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
    console.log(`📁 Created folder: ${dir}`);
  }
}

function runRefactor() {
  ensureDir(toFileExplorer);
  ensureDir(toShared);

  const files = readdirSync(fromDir);

  files.forEach((file) => {
    const destination = fileExplorerFiles.includes(file)
      ? toFileExplorer
      : toShared;
    moveFile(file, destination);
  });

  // Șterge SmallComponents dacă e gol
  const remaining = readdirSync(fromDir);
  if (remaining.length === 0) {
    rmdirSync(fromDir);
    console.log("🧹 Removed empty SmallComponents/");
  } else {
    console.warn("⚠️ SmallComponents not empty. Manual cleanup needed.");
  }
}

runRefactor();
