import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = 'c:/Users/Lenovo/Downloads/New folder (15)/energy-drinks-study/src/components/presentation/slides';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

let modifiedFiles = [];

files.forEach(file => {
  // Do not touch Cover slides, we designed them perfectly manually.
  if (file.startsWith('Cover')) return;

  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Bump fixed fonts to responsive clamp functions
  content = content.replace(/fontSize:\s*"(\d+)px"/g, (match, px) => {
    let size = parseInt(px, 10);
    if (size === 9) return `fontSize: "clamp(9px, 1.1vw, 13px)"`;
    if (size === 10) return `fontSize: "clamp(10px, 1.2vw, 15px)"`;
    if (size === 11) return `fontSize: "clamp(11px, 1.4vw, 17px)"`;
    if (size === 12) return `fontSize: "clamp(12px, 1.5vw, 18px)"`;
    if (size === 13) return `fontSize: "clamp(13px, 1.6vw, 20px)"`;
    if (size === 14) return `fontSize: "clamp(14px, 1.8vw, 22px)"`;
    if (size === 15) return `fontSize: "clamp(15px, 2.0vw, 24px)"`;
    if (size === 16) return `fontSize: "clamp(16px, 2.2vw, 26px)"`;
    if (size === 18) return `fontSize: "clamp(18px, 2.5vw, 30px)"`;
    if (size === 20) return `fontSize: "clamp(20px, 2.8vw, 34px)"`;
    if (size >= 24) return `fontSize: "clamp(${size}px, ${Math.min((size/10)+1, 6)}vw, ${Math.round(size*1.5)}px)"`;
    return match;
  });

  // Scale up existing clamp functions so they get bigger on large screens
  // Match `fontSize: "clamp(10px, 1.5vw, 20px)"`
  content = content.replace(/fontSize:\s*"clamp\((\d+)px,\s*([\d.]+)vw,\s*(\d+)px\)"/g, (match, min, vw, max) => {
    let numMin = parseInt(min);
    let numVw = parseFloat(vw);
    let numMax = parseInt(max);

    // Only boost if it's likely a body text / heading that needs scaling up on desktop
    // Increase the max bound by 40% and the vw scale by 30%
    let newMin = numMin;
    let newVw = (numVw * 1.3).toFixed(1);
    let newMax = Math.round(numMax * 1.4);

    return `fontSize: "clamp(${newMin}px, ${newVw}vw, ${newMax}px)"`;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedFiles.push(file);
  }
});

console.log("Modified " + modifiedFiles.length + " slides:");
console.log(modifiedFiles.map(f => "- " + f).join("\n"));
