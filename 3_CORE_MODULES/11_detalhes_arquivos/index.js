const fs = require('fs')

fs.stat('novoArquivo.txt', (err, stats) =>{
    if(err){
        console.log(err)
        return
    }
    console.log(stats.isDirectory())
    console.log(stats.isFile())
    console.log(stats.isBlockDevice())    
    console.log(stats.isSymbolicLink())
    console.log(stats.size)
    console.log(stats.ctime)
    console.log(stats.mtime)
})