const fs = require('fs')
const path = require('path')

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
        "docx",
        "doc",
        "pdf",
        "xlsx",
        "xls",
        "odt",
        "ods",
        "odp",
        "odg",
        "odf",
        "txt",
        "ps",
        "tex",
    ],
    app: ["exe", "dmg", "pkg", "deb"]
};


function organizeFn(srcPath){
    if(srcPath == undefined){
        // console.log('Please enter a valid directory path')
        // return
        destPath = path.join(process.cwd(),"organized_files")
            if(!fs.existsSync(destPath)){
                fs.mkdirSync(destPath)
            }
    }

    // if(!fs.existsSync(dirPath)){
    //     console.log('This directory does not exist')
    // }
    let isValid = fs.existsSync(srcPath) && fs.lstatSync(srcPath).isDirectory()
    if(isValid){
        destPath = path.join(srcPath, "organized_folder")
        if(!fs.existsSync(destPath)){
            fs.mkdirSync(destPath)
        }
    }
    else{
        console.log("This is not a directory. Please provide a valid directory path")
        return
    }

    orgHelper(srcPath, destPath);
}

function orgHelper(srcPath, destPath){
    let childNames = fs.readdirSync(srcPath)
    for(let i = 0; i < childNames.length; i++){
        let childPath = path.join(srcPath, childNames[i])
        let check = fs.lstatSync(childPath).isFile()
        
        if(check){
            let type = getType(childNames[i])
        // console.log(childNames[i] + "=>" + type)
        sendFile(childPath,destPath,type)
        }
        
    }
}

function sendFile(childPath, destPath, type){
    let destFolderPath = path.join(destPath,type)
    let fileName = path.basename(childPath)
    if(fs.existsSync(destFolderPath)==false){
        fs.mkdirSync(destFolderPath)
    }

    //Copy File
    let destFilePath = path.join(destFolderPath,fileName);
    fs.copyFileSync(childPath,destFilePath); 
    fs.unlinkSync(childPath)
    console.log(fileName+" copied!");
}


function getType(fileName){
    let ext = path.extname(fileName)
    ext = ext.slice(1)
    for(let type in types){
        let typeArray = types[type]
        for(let i = 0; i < typeArray.length; i++){
            if(ext == typeArray[i]){
                return type
            }
        }
    }
    return "others"
}

module.exports = {
    organizeFunction : organizeFn
}