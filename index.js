import express from "express";
import {promises as fs} from "fs";
const { readFile, writeFile} = fs;


global.fileName = "monstrinhos.json";


const app = express();
app.use(express.static("public"));
app.use(express.json());
app.listen(3000, async () => {    
    try {
        await readFile(global.fileName);
        console.log("ok")
    } catch (err) {
        console.log(err)
    }       
});