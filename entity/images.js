const spawn = require('child_process').spawn
const exec = require('child_process').exec

const Images = {}
let files = []
Images.files = files

let pngData = ''


exec(`find /Users/W_littlewhite/Documents/图片/桌面 -name '*jpg'`, (error, stdout, stderr) => {
    Images.files = stdout.split('\n').filter(v => v)
})

module.exports = Images
