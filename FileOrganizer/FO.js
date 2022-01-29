#!/usr/bin/env node
// We will be creating a File System Organizer
//Features of the Project 
//If you have numerous Files in a folder and they are not Properly arranged
//So you can use this tool to arrange them in specific directory according to their extension
// like text files will go into text File Folder .exe files will go into application folder and so on
// so at the end you will have a arranged set of files in specific folders

//in js input array ki form me liya jata h and that array is process.argv

const fs = require('fs')
const path = require('path')
const treeModule = require('../commands/tree')
const organizeModule = require('../commands/organize')
const helpModule = require('../commands/help')

// let input = process.argv.slice(2)
let command = process.argv[2];
let srcPath = process.argv[3];

// let inputArr = input
// let command = inputArr[0]
// let directoryPath = inputArr[1]


switch(command){
    case 'tree':
        treeModule.treeFunction(srcPath)
        break;
    case 'organize':
        organizeModule.organizeFunction(srcPath)
        break;
    case 'help':
        helpModule.helpFunction()
        break;
    default:
        console.log('Please enter a valid command')
        break;        
}





