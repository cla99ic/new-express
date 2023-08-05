#!/usr/bin/env node

const path = require('path')
const fs = require('fs')

const filename = __dirname + '/newrouter.content'

if (process.argv.length > 2) {
    const fullPath = path.join(process.cwd(), 'src', 'router', process.argv[2] + '.ts')
    fs.writeFileSync(fullPath, fs.readFileSync(filename, 'utf-8').replace('{filename}', process.argv[2]))
}