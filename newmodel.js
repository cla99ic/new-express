#!/usr/bin/env node

const path = require('path')
const fs = require('fs')

const filename = __dirname + '/newmodel.content'
if (process.argv.length > 2) {
    const fileName = process.argv[2].split('/')[process.argv[2].split('/').length - 1]
    const fullPath = path.join(process.cwd(), 'src', 'model', process.argv[2] + '.ts').replace(fileName + '.ts', fileName.toLowerCase() + '.ts')
    fs.writeFileSync(fullPath, fs.readFileSync(filename, 'utf-8').replace(/{filename}/g, fileName).replace(/{lowerfilename}/g, fileName.toLowerCase()))
}