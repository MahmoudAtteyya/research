import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const htmlPath = path.resolve(__dirname, 'index.html')

if (!fs.existsSync(htmlPath)) {
  console.error("No index.html found!")
  process.exit(1)
}

let html = fs.readFileSync(htmlPath, 'utf-8')

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      if(file !== 'node_modules' && file !== '.next' && file !== '.git') {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
      }
    } else {
      const ext = path.extname(file).toLowerCase()
      if (['.jpeg', '.jpg', '.png', '.svg', '.webp', '.gif'].includes(ext)) {
         arrayOfFiles.push(path.join(dirPath, file))
      }
    }
  })

  return arrayOfFiles
}

const allImages = getAllFiles(__dirname)

for (const absPath of allImages) {
  // We want to find references to this image.
  // The path in HTML could be /images/sample_size.png or /1.jpeg
  // So we strip the __dirname from absPath and change \ to /
  let relPath = absPath.replace(__dirname, '').replace(/\\/g, '/')
  
  // if relPath is like /public/images/maysa.jpeg, the app code uses /images/maysa.jpeg
  // so we should try matching both versions.
  let p = relPath
  if (p.startsWith('/public/')) {
     p = p.substring(7) // becomes /images/maysa.jpeg
  }

  const ext = path.extname(absPath).toLowerCase()
  let mimeType = 'application/octet-stream'
  if (ext === '.svg') mimeType = 'image/svg+xml'
  else if (ext === '.jpeg' || ext === '.jpg') mimeType = 'image/jpeg'
  else if (ext === '.png') mimeType = 'image/png'
  else if (ext === '.webp') mimeType = 'image/webp'
  else if (ext === '.gif') mimeType = 'image/gif'
  
  try {
    const fileData = fs.readFileSync(absPath)
    const base64Data = `data:${mimeType};base64,${fileData.toString('base64')}`
    
    // Replace p (e.g. "/images/maysa.jpeg") and also the other relPath if different
    const searchStrings = [p]
    if (relPath !== p) searchStrings.push(relPath)
      
    // Next.js static imports with NextImage sometimes inject _next/static...
    // But since this is a Vite build, the React JSX literally has the raw string like "/images/maysa.jpeg"
    
    for (const s of searchStrings) {
        // Find both double-quoted and single-quoted versions
        const dq = `"${s}"`
        const sq = `'${s}'`
        
        if (html.includes(dq) || html.includes(sq) || html.includes(`url(${s})`) || html.includes(`url("${s}")`)) {
            console.log("Inlining found string:", s)
            html = html.split(dq).join(`"${base64Data}"`)
            html = html.split(sq).join(`'${base64Data}'`)
            html = html.split(`url(${s})`).join(`url(${base64Data})`)
            html = html.split(`url("${s}")`).join(`url("${base64Data}")`)
            html = html.split(`url('${s}')`).join(`url('${base64Data}')`)
        }
    }
  } catch (err) {
     console.error("Error reading file", absPath)
  }
}

fs.writeFileSync(htmlPath, html)
console.log("Success! index.html updated.")
