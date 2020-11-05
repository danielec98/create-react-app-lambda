const express = require('express');
const router = express.Router();
const db = require("../models");
const Struttura = db.struttura;
const createError= require('http-errors');
const Immagini = db.immagini;
const Camere = db.camera;
const Controlli = require('./Controlli');
const { immagini } = require('../models');
const Prenotazione = db.prenotazione;
const Camera = db.camera;

exports.aggiungi = async (req, res, next) => {
    console.log(req.body)
    console.log("AAAAAAAAAA")
    const {nome, descrizione, prezzo, tipologia,cap,indirizzo, citta, numero_ospiti, wifi, parcheggio, piscina, tassa, id_gestore} = req.body;
    if ((nome !== undefined) && (descrizione !== undefined) && (prezzo !== undefined) && (tipologia !== undefined)
    && (indirizzo !== undefined) && (citta !== undefined) && (cap !== undefined) && (numero_ospiti !== undefined) 
    && (wifi !== undefined) && (parcheggio !== undefined) && (piscina !== undefined) && (tassa !== undefined)
    && (id_gestore !== undefined)) {
        try{
        let struttura = await Struttura.create({
                    nome: nome,
                    descrizione: descrizione,
                    citta:citta,
                    cap: cap,
                    indirizzo:indirizzo,
                    tipologia:tipologia,
                    numero_ospiti:numero_ospiti,
                    wifi:wifi,
                    parcheggio: parcheggio,
                    piscina:piscina,
                    prezzo:prezzo,
                    tassa:tassa,
                    id_gestore:id_gestore,
        })
        res.send(struttura);
    }
    catch (e) {
        next(createError(404, e.original ? (e.original.sqlMessage ? e.original.sqlMessage : e) : e));
    }
}
else next(createError(422,'campi non corretti'));
}


exports.registraCamera = async (req, res, next) => {
    console.log(req.body)
    const {nome, descrizione, prezzo, numero_ospiti, riscaldamento, servizio, aria_condizionata, id_struttura} = req.body;
    if ((nome !== undefined) && (descrizione !== undefined) && (prezzo !== undefined) && (riscaldamento !== undefined)
    && (servizio !== undefined) && (aria_condizionata !== undefined) && (id_struttura !== undefined) && (numero_ospiti !== undefined)) 
   {
        try{
        let struttura = await Camera.create({
                    nome: nome,
                    descrizione: descrizione,
                    numero_ospiti:numero_ospiti,
                    aria_condizionata:aria_condizionata,
                    servizio_in_camera: servizio,
                    riscaldamenti:riscaldamento,
                    prezzo:prezzo,
                    id_struttura:id_struttura,
        })
        res.send(struttura);
    }
    catch (e) {
        next(createError(404, e.original ? (e.original.sqlMessage ? e.original.sqlMessage : e) : e));
    }
}
else next(createError(422,'campi non corretti'));
}


exports.aggiungiImmagini = async (req, res, next) => {
    Controlli.upload(req, res, async() => {
    console.log(req.files)
    console.log(req.body.id)
    const immagini = req.files;
    const id = req.body.id;
    const { QueryTypes } = require('sequelize');
    try {
        for (image of immagini) {
            let imm = db.sequelize.query(
                `INSERT INTO immagini (path , id_struttura) 
                 VALUES ("${image.filename}" , "${id}")
                    `,
                 {type : QueryTypes.INSERT}) }        
        res.send({id:id, immagini:immagini})
    }
    catch (e) {
        next(createError(404, e.original ? (e.original.sqlMessage ? e.original.sqlMessage : e) : e));
    }
    });
};

exports.aggiungiImmaginiCamera = async (req, res, next) => {
    Controlli.upload(req, res, async() => {
    console.log(req.files)
    console.log(req.body.id)
    const immagini = req.files;
    const id = req.body.id;
    const { QueryTypes } = require('sequelize');
    try {
        let imm = await Camera.update({
           foto : immagini[0].filename,
            }, {
                where: {
                        id : id
                     }, 
})
        res.send({id:id, immagini:immagini})
    }
    catch (e) {
        next(createError(404, e.original ? (e.original.sqlMessage ? e.original.sqlMessage : e) : e));
    }
    });
};

exports.search = async (req, res, next) => {
    const {citta, tipologia, numero_ospiti,wifi,parcheggio, piscina, check_in, check_out} = req.body;
    if( (wifi !== undefined) || (parcheggio !== undefined) || (piscina !== undefined) || (check_in !== undefined) || (check_out !== undefined)) {
        try { 
            const { QueryTypes } = require('sequelize');
            let result = await db.sequelize.query(
                `SELECT strutture.*,immagini.path FROM strutture, immagini
                 WHERE strutture.id = immagini.id_struttura
                 AND citta = "${citta}" 
                 AND numero_ospiti >= "${numero_ospiti}"
                 AND tipologia = "${tipologia}"
                 ${wifi==true  ?
                 `AND wifi = "${wifi}" `: '" "'}
                 ${parcheggio==true  ?
                 `AND parcheggio = "${parcheggio}" `: '" "'}  
                 ${piscina==true  ?
                `AND piscina = "${piscina}" `: '" "'}
                AND strutture.id NOT IN (SELECT strutture.id
                                         FROM strutture, prenotazioni
                                        WHERE  strutture.id = prenotazioni.id_struttura
                                        AND check_in >= "${check_in}" 
                                         AND check_out <= "${check_out}"  )
                  GROUP BY (strutture.id)                       
                 `,
                 
                 {type : QueryTypes.SELECT}
            )
            
                res.send(result)
            
        }
        catch (e) {
            next(createError(404, e.original ? (e.original.sqlMessage ? e.original.sqlMessage : e) : e));
        }
        }
        }

exports.searchCamere = async (req, res, next) => {
    const {citta, numero_ospiti,wifi,parcheggio, piscina, servizio, riscaldamenti, aria_condizionata, check_in, check_out} = req.body;
    if ( (wifi !== undefined) || (parcheggio !== undefined) || (piscina !== undefined)  || (servizio !== undefined)
     || (riscaldamenti !== undefined) || (aria_condizionata !== undefined) || (check_in !== undefined) || (check_out !== undefined)) {
        try {
            const { QueryTypes } = require('sequelize');
            let result = await db.sequelize.query(
                `SELECT camere.*, strutture.nome as nome_s, strutture.citta, strutture.cap, strutture.indirizzo, strutture.tassa FROM strutture, camere
                 WHERE strutture.citta = "${citta}" 
                 AND strutture.id = camere.id_struttura
                 AND camere.numero_ospiti >= "${numero_ospiti}"
                 ${wifi==true  ?
                `AND wifi = "${wifi}" `: '" "'}
                 ${parcheggio==true  ?
                `AND parcheggio = "${parcheggio}" `: '" "'}  
                 ${piscina==true  ?
                `AND piscina = "${piscina}" `: '" "'}
                ${servizio==true  ?
                `AND servizio_in_camera = "${servizio}" `: '" "'}
                ${riscaldamenti==true  ?
                `AND riscaldamento = "${riscaldamenti}" `: '" "'}  
                ${aria_condizionata==true  ?
                `AND aria_condizionata = "${aria_condizionata}" `: '" "'}
                AND camere.id NOT IN (SELECT camere.id
                    FROM camere, prenotazioni
                    WHERE  camere.id = prenotazioni.id_camere
                    AND check_in >= "${check_in}" 
                    AND check_out <= "${check_out}")
                    `,
                 {type : QueryTypes.SELECT}
            )
            
                res.send(result)
                console.log(result)
            
        }
        catch (e) {
            next(createError(404, e.original ? (e.original.sqlMessage ? e.original.sqlMessage : e) : e));
        }
        
        }
};

        


        exports.getStrutture= async(req,res,next)=>{
            const{id}= req.body;
            console.log(req.body)
            console.log({id})
            if (id !==undefined){
                try{
                    const { QueryTypes } = require('sequelize');
                    let strutture = await db.sequelize.query(
                        `SELECT * FROM strutture
                        WHERE id_gestore = "${id}" 
                        ` ,
                     {type : QueryTypes.SELECT}
                     
                  )
                  res.send(strutture)
                    }
                    catch (e){
                        next(createError(500, e.original ? (e.original.sqlMessage ? e.original.sqlMessage : e) : e));
                    }
                }
                else{
                    next(createError(422, "Utente non trovato"));
                }
            }

            exports.getCamere= async(req,res,next)=>{
                const{id}= req.body;
                if (id !==undefined){
                    try{
                        const { QueryTypes } = require('sequelize');
                        let strutture = await db.sequelize.query(
                            `SELECT camere.*, strutture.nome AS nome_struttura FROM camere,strutture
                            WHERE camere.id_struttura IN (
                            SELECT id FROM strutture
                        WHERE id_gestore = "${id}") 
                        GROUP BY camere.id
                            ` ,
                         {type : QueryTypes.SELECT}
                         
                      )
                      res.send(strutture)
                        }
                        catch (e){
                            next(createError(500, e.original ? (e.original.sqlMessage ? e.original.sqlMessage : e) : e));
                        }
                    }
                    else{
                        next(createError(422, "Utente non trovato"));
                    }
                }

exports.getNome= async(req,res,next)=>{
    const { QueryTypes } = require('sequelize');
    let response = await db.sequelize.query(
        `SELECT nome, id_gestore FROM strutture` ,
         {type : QueryTypes.SELECT}
          )
    res.send(response)
    console.log(response)
}

exports.prenotaCamera=async(req,res,next)=>
{
    console.log(req.body)
    const {id_struttura, id_cliente,id_camera, check_in, check_out, prezzo, pagamento, confermata, tassa_totale} = req.body
    if ((id_struttura !== undefined) && (id_camera !== undefined) &&  (id_cliente !== undefined) && (check_in !== undefined) && (check_out !== undefined) &&
        (prezzo !== undefined) && (pagamento !== undefined) && (confermata !== undefined) && (tassa_totale !== undefined)) {
            try{
                let prenotazione = await Prenotazione.create({
                    id_struttura:id_struttura,
                    id_camere: id_camera,
                    id_cliente : id_cliente,
                    check_in : check_in,
                    check_out : check_out,
                    prezzo: prezzo,
                    pagamento_tasse: pagamento,
                    confermata: confermata,
                    totale_tassa: tassa_totale
                })
                res.send(prenotazione)
            }
            catch(e){
                next(console.log(500, e.original ? (e.original.sqlMessage ? e.original.sqlMessage : e) : e));
            }
        }

}




exports.modificaStruttura = async (req, res, next) => {
    console.log(req.body)
    const {nome, descrizione, prezzo,cap,indirizzo, citta, numero_ospiti, wifi, parcheggio, piscina, tassa, id_struttura} = req.body;
    if ((nome !== undefined) && (descrizione !== undefined) && (prezzo !== undefined)
    && (indirizzo !== undefined) && (citta !== undefined) && (cap !== undefined) && (numero_ospiti !== undefined) 
    && (wifi !== undefined) && (parcheggio !== undefined) && (piscina !== undefined) && (tassa !== undefined)
    && (id_struttura !== undefined)) {
        try{
        let struttura = await Struttura.update({
                    nome: nome,
                    descrizione: descrizione,
                    citta:citta,
                    cap: cap,
                    indirizzo:indirizzo,
                    numero_ospiti:numero_ospiti,
                    wifi:wifi,
                    parcheggio: parcheggio,
                    piscina:piscina,
                    prezzo:prezzo,
                    tassa:tassa,
                    }, {
                        where: {
                                id : id_struttura
                             }, 
        })
        res.send(struttura);
        console.log(struttura)
    }
    catch (e) {
        next(createError(404, e.original ? (e.original.sqlMessage ? e.original.sqlMessage : e) : e));
    }
}
else next(createError(422,'campi non corretti'));
}


exports.editCamera = async (req, res, next) => {
    console.log(req.body)
    const {nome, descrizione, prezzo, numero_ospiti, riscaldamento, servizio, aria_condizionata, id_camera} = req.body;
    if ((nome !== undefined) && (descrizione !== undefined) && (prezzo !== undefined) && (riscaldamento !== undefined)
    && (servizio !== undefined) && (aria_condizionata !== undefined) && (id_camera !== undefined) && (numero_ospiti !== undefined)) {
        try{
        let camera = await Camera.update({
            nome: nome,
            descrizione: descrizione,
            numero_ospiti:numero_ospiti,
            aria_condizionata:aria_condizionata,
            servizio_in_camera: servizio,
            riscaldamento:riscaldamento,
            prezzo:prezzo,
                    }, {
                        where: {
                                id : id_camera
                             }, 
        })
        res.send(camera);
    }
    catch (e) {
        next(createError(404, e.original ? (e.original.sqlMessage ? e.original.sqlMessage : e) : e));
    }
}
else next(createError(422,'campi non corretti'));
}

exports.deleteStruttura = async (req, res, next) => {
    const id_struttura=req.body.id_struttura
    if (id_struttura !== undefined) {
        try{
            let cancella = await Struttura.destroy({
                            where: {
                                    id : id_struttura
                                 }, 
            })
            res.sendStatus(cancella)
        }
        catch (e) {
            next(createError(404, e.original ? (e.original.sqlMessage ? e.original.sqlMessage : e) : e));
        }
    }
    else next(createError(422,'campi non corretti'));
}





exports.deleteCamera = async (req, res, next) => {
    const id_camera=req.body.id_camera
    console.log(id_camera)
    if (id_camera !== undefined) {
        try{
            let canc = await Camera.destroy({
                            where: {
                                    id : id_camera
                                 }, 
            })
            res.sendStatus(canc)
        }
        catch (e) {
            next(createError(404, e.original ? (e.original.sqlMessage ? e.original.sqlMessage : e) : e));
        }
    }
    else next(createError(422,'campi non corretti'));
}
exports.getTassa= async(req,res,next)=>{
    const{id_gestore}= req.body;
    console.log(req.body)
    console.log({id_gestore})
    if (id_gestore !==undefined){
        try{
            const { QueryTypes } = require('sequelize');
            let strutture = await db.sequelize.query(
                `SELECT SUM(prenotazioni.totale_tassa) AS tassa,strutture.nome  FROM strutture , prenotazioni
                WHERE prenotazioni.id_struttura = strutture.id AND strutture.id_gestore="${id_gestore}"
                GROUP BY (strutture.id)
                ` ,
             {type : QueryTypes.SELECT}
             
          )
          res.send(strutture)
          console.log(strutture)
            }
            catch (e){
                next(createError(500, e.original ? (e.original.sqlMessage ? e.original.sqlMessage : e) : e));
            }
        }
        else{
            next(createError(422, "Utente non trovato"));
        }
    }


    exports.prendiImmagini= async(req,res,next)=>{
        const{id}= req.body;
        
        if (id !==undefined){
            try{
                const { QueryTypes } = require('sequelize');

                let img = await db.sequelize.query(
                    `SELECT path from immagini WHERE id_struttura = "${id}"`,
                    {type : QueryTypes.SELECT}
                )


                
                res.send(img)
                console.log(img)
            }
                catch (e){
                    next(createError(500, e.original ? (e.original.sqlMessage ? e.original.sqlMessage : e) : e));
                }
            }
            else{
                next(createError(422, "Utente non trovato"));
            }
        }
        exports.modificaFoto = async (req, res, next) => {
            Controlli.upload(req, res, async() => {
            console.log(req.files)
            console.log(req.body.id)
            const immagini = req.files;
            const id = req.body.id;
            const { QueryTypes } = require('sequelize');
            try {
                for (image of immagini) {
                    let imm = db.sequelize.query(
                        `
                         INSERT INTO immagini (path , id_struttura) 
                         VALUES ("${image.filename}" , "${id}")
                         
                            `,
                         {type : QueryTypes.INSERT}) }        
                res.send({id:id, immagini:immagini})
                console.log({id:id, immagini:immagini})
            }
            catch (e) {
                next(createError(404, e.original ? (e.original.sqlMessage ? e.original.sqlMessage : e) : e));
            }
            });
        };

        exports.modificaFoto = async (req, res, next) => {
            Controlli.upload(req, res, async() => {
            console.log(req.files)
            console.log(req.body.id)
            const immagini = req.files;
            const id = req.body.id;
            const { QueryTypes } = require('sequelize');
            try {
                for (image of immagini) {
                    let imm = db.sequelize.query(
                        `
                         INSERT INTO immagini (path , id_struttura) 
                         VALUES ("${image.filename}" , "${id}")
                         
                            `,
                         {type : QueryTypes.INSERT}) }        
                res.send({id:id, immagini:immagini})
                console.log({id:id, immagini:immagini})
            }
            catch (e) {
                next(createError(404, e.original ? (e.original.sqlMessage ? e.original.sqlMessage : e) : e));
            }
            });
        };
        
        exports.cancella = async (req, res, next) => {
            Controlli.upload(req, res, async() => {
            const id = req.body.id;
            const { QueryTypes } = require('sequelize');
            try {
                    let imm = db.sequelize.query(
                        `DELETE FROM immagini WHERE id_struttura="${id}"
                         
                            `,
                         {type : QueryTypes.DELETE})

                         res.send(imm)
                }        
            catch (e) {
                next(createError(404, e.original ? (e.original.sqlMessage ? e.original.sqlMessage : e) : e));
            }
        })
        };