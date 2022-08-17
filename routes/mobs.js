import express from "express";
import { promises as fs } from "fs";
//import cors from "cors";
const { readFile, writeFile } = fs;
const router = express.Router();

router.post("/", async (req, res, next) => {
try {
    let mob = req.body;
    console.log(req.body)
    if (mob.nome == null || mob.size == null ||  mob.age == null || mob.atck == null ||  mob.spd == null ||  mob.hp == null ||  mob.classe == null || mob.picture == null || mob.aliado == null || mob.raca == null) {
        throw new Error("DIGITAIVOS TODOS OS PARAMETROS!!!");
    }

    const data = JSON.parse(await readFile(global.fileName));

    mob = { 
        index: data.nextId++, 
        nome: mob.name,
        size: mob.size,
        age: mob.age,
        atck: mob.atck,
        spd: mob.spd,
        hp: mob.hp,
        classe: mob.classe,
        picture: mob.picture,
        aliado: mob.aliado,
        raca: mob.raca  
    };

    data.mobs.push(mob);
    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(mob);

    logger.info(`POST /mob - ${JSON.stringify(mob)}`);
} catch (err) {        
    next(err);
}
});


router.put("/:id", async (req, res, next) => {
try {
    const mob = req.body;
    if (mob.nome == null || mob.size == null ||  mob.age == null || mob.atck == null ||  mob.spd == null ||  mob.hp == null ||  mob.classe == null || mob.picture == null || mob.aliado == null || mob.raca == null) {
        throw new Error("DIGITAIVOS TODOS OS PARAMETROS!!!");
    }

    const data = JSON.parse(await readFile(global.fileName));
    const index = req.params.id;
    console.log(index)
    if (index === -1 || index >= data.mob.length) {
        throw new Error("Registro não encontrado.");
    }
    data.mobs[index].nome = mob.nome;
    data.mobs[index].size = mob.size;
    data.mobs[index].age = mob.age;
    data.mobs[index].atck = mob.atck;
    data.mobs[index].spd = mob.spd;
    data.mobs[index].hp = mob.hp;
    data.mobs[index].classe = mob.classe;
    data.mobs[index].picture = mob.picture;
    data.mobs[index].raca = mob.raca;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(mob);
    logger.info(`PUT /mob - ${JSON.stringify(mob)}`);
} catch (err) {
    next(err);               
}
});


router.get("/", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        res.send(data);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        console.log(data)
        const idAtual = req.params.id;
        // console.log(idAtual)
        let dataToRender = "";
        let mob = data.mobs.map((eachData)=>{
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
        if (classe != "assassino" && classe != "atirador" && classe != "tanque" && classe != "ladrao" && classe != "lutador" && classe != "mago") {
            throw new Error("DIGITE A CLASSE CERTA!!!");
        }
        console.log(classe)
        let dataToRender = [];
        let mob = data.mobs.map((eachData)=>{
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