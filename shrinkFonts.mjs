import fs from 'fs';
import path from 'path';

const dir = 'c:/Users/Lenovo/Downloads/New folder (15)/energy-drinks-study/src/components/presentation/slides';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

let modifiedFiles = [];

files.forEach(file => {
  if (file.startsWith('Cover') || file === 'TOCSlide.tsx') return; // Don't touch these

  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Reduce size by multiplying vw and max by 0.85
  content = content.replace(/fontSize:\s*"clamp\((\d+)px,\s*([\d.]+)vw,\s*(\d+)px\)"/g, (match, min, vw, max) => {
    let numMin = parseInt(min);
    let numVw = parseFloat(vw);
    let numMax = parseInt(max);

    let newVw = (numVw * 0.85).toFixed(1);
    let newMax = Math.round(numMax * 0.85);

    if (newMax < numMin) newMax = numMin;

    return `fontSize: "clamp(${numMin}px, ${newVw}vw, ${newMax}px)"`;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedFiles.push(file);
  }
});
console.log('Shrunk fonts in ' + modifiedFiles.length + ' files');
