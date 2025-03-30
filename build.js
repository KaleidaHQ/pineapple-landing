const fs = require("fs-extra");
const path = require("path");

const srcDir = path.join(__dirname, "src");
const distDir = path.join(__dirname, "dist");

fs.removeSync(distDir);
fs.ensureDirSync(distDir);
fs.copySync(srcDir, distDir, { filter: (src) => !src.includes("fonts") });

console.log("Build completed! Files copied to dist/");
