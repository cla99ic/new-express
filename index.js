#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

function getAllFilePaths(directory) {
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry =>
        entry.isDirectory() ? getAllFilePaths(path.join(directory, entry.name)) : path.join(directory, entry.name)
    )
}
const filename = __dirname + '/content'
const scan = () => {
    const scanResult = getAllFilePaths(process.cwd()).filter((a) => !a.includes('generator.js') && !a.includes(filename))
    const result = []
    for (let file of scanResult) {
        result.push({ path: file.replace(process.cwd(), ''), content: fs.readFileSync(file).toString() })
    }
    fs.writeFileSync(filename, JSON.stringify(result))
    console.log('done')
}

function writeFileWithFolders(filePath, data) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, data)
}

const generate = () => {
    const result = JSON.parse(fs.readFileSync(filename).toString())
    for (let file of result) {
        writeFileWithFolders(process.cwd() + file.path, file.content)
    }
    fs.mkdirSync(process.cwd() + '/public')
    execSync('npm i', { stdio: 'inherit' })
    execSync('npx tsc', { stdio: 'inherit' })
    console.log('done')
}
generate()