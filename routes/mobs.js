import express from "express";
import { promises as fs } from "fs";
//import cors from "cors";
const { readFile, writeFile } = fs;
const router = express.Router();


router.get("/", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        res.send(data);
        logger.info("GET /account");
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        console.log(data.length)
        const idAtual = req.params.id;
        // console.log(idAtual)
        let dataToRender = "";
        let mob = data.map((eachData)=>{
            if(eachData.index == idAtual){
                dataToRender = eachData;
            }
        })
        
        console.log(dataToRender);
        if(idAtual == data.length - 1){
            dataToRender["next"] = false;
        }
        else{
            dataToRender["next"] = true;
        }

        if(idAtual == 0){
            dataToRender["before"] = false;
        }
        else{
            dataToRender["before"] = true;
        }

        
        // console.log(mob)
        
        res.render('mob.ejs', dataToRender);

    } catch (err) {
        next(err);
    }
});



router.get("/classe/:classe", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        const classe = req.params.classe;
        console.log(classe)
        let dataToRender = [];
        let mob = data.map((eachData)=>{
            if(eachData.classe == classe){
                console.log(dataToRender)
                dataToRender.push(eachData);
            }
        })
        
        console.log(dataToRender)
        
        res.send(dataToRender);

    } catch (err) {
        next(err);
    }
});

//exportando o routes
export default router;