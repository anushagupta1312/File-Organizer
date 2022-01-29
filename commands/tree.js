const fs = require('fs')
const path = require('path')

function treeFn(srcPath){
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
    let isValid = fs.existsSync(srcPath)
    if(isValid){
        treeHelper(srcPath, "")
    }
    else{
        console.log("This is not a directory. Please provide a valid directory path")
        return
    }
}


function treeHelper(srcPath,indent){
    // console.log(srcPath)
    let isFile = fs.lstatSync(srcPath).isFile()
    if(isFile){
        let fileName = path.basename(srcPath);
        console.log(indent+"├──"+fileName);
    }else{
        let dirName = path.basename(srcPath);
        console.log(indent+"└──"+dirName);
        let children = fs.readdirSync(srcPath);
        for(let i=0;i<children.length;i++){
            let updatedPath = path.join(srcPath,children[i]);
            treeHelper(updatedPath,indent+"\t");
        }
    }
}

module.exports = {
    treeFunction : treeFn
}