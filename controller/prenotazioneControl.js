const express = require('express');
const router = express.Router();
const db = require("../models");
const Pagamento = db.pagamento;
const Prenotazione =db.prenotazione;
const createError= require('http-errors');



exports.pagamento = async (req,res,next)=>{
const {intestatario, mese, anno, numero_carta,cvv,id_prenotazione,prezzo}= req.body;
console.log(req.body)
if ((intestatario !== undefined) && (mese !== undefined) && (anno !== undefined) && (numero_carta !== undefined)
 && (cvv !== undefined) && (id_prenotazione !== undefined) && (prezzo !== undefined) ) {
    try {
        let pagamento = await Pagamento.create({
                intestatario: intestatario,
                mese: mese,
                anno:anno,
                numero_carta: numero_carta,
                cvv:cvv,
                id_prenotazione:id_prenotazione,
                prezzo:prezzo
            })
            /*const token = await jwt.sign({user}, jwtConfig.secret, {
                expiresIn: 86400 // 24 ore
            });

            user.setDataValue('token', token);*/
            res.send(pagamento)
        }
     catch (e) {
        next(console.log(500, e.original ? (e.original.sqlMessage ? e.original.sqlMessage : e) : e));
    }

} else {
    next(console.log(422, "una proprietà fra intestatario , mese , anno , cvv  non è stata definita"))
}

};

exports.getid=async(req, res,next)=>{
    const {id_cliente, check_in,id_camera,id_struttura,check_out} = req.body;
    console.log(req.body)
        if(id_camera !== null)
        try{
            const { QueryTypes } = require('sequelize');
            let prenotazione = await db.sequelize.query(
                `SELECT id FROM prenotazioni
                 WHERE check_in = "${check_in}"
                 AND check_out = "${check_out}"
                 AND id_camere = "${id_camera}"
                 AND id_struttura = "${id_struttura}"
                 AND id_cliente = "${id_cliente}"`,

                 {type : QueryTypes.SELECT})
       res.send(prenotazione)
       console.log(prenotazione)
        }
        catch(e)
            { next(console.log(500, e.original ? (e.original.sqlMessage ? e.original.sqlMessage : e) : e));

        }
        else{
            const { QueryTypes } = require('sequelize');
            let prenotazionestruttura = await db.sequelize.query(
                `SELECT id FROM prenotazioni
                 WHERE check_in = "${check_in}"
                 AND check_out = "${check_out}"
                 AND id_struttura = "${id_struttura}"
                 AND id_cliente = "${id_cliente}"`,

                 {type : QueryTypes.SELECT})
                 res.send(prenotazionestruttura)
                 console.log(prenotazionestruttura)
        }
    }

exports.prenotaStruttura=async(req,res,next)=>
{
    const {id_struttura, id_cliente, check_in, check_out, prezzo, pagamento, confermata, tassa_totale} = req.body
    console.log(req.body)
    if ((id_struttura !== undefined) && (id_cliente !== undefined) && (check_in !== undefined) && (check_out !== undefined) &&
        (prezzo !== undefined) && (pagamento !== undefined) && (confermata !== undefined) && (tassa_totale !== undefined)) {
            try{
                let prenotazione = await Prenotazione.create({
                    id_struttura:id_struttura,
                    id_camere: null,
                    id_cliente : id_cliente,
                    check_in : check_in,
                    check_out : check_out,
                    prezzo: prezzo,
                    pagamento_tasse: pagamento,
                    confermata: confermata,
                    totale_tassa: tassa_totale
                })
                res.send(prenotazione)
                console.log(prenotazione)
            }
            catch(e){
                next(console.log(500, e.original ? (e.original.sqlMessage ? e.original.sqlMessage : e) : e));
            }
        }

}

exports.PrenotazioniGestoreStrutture = async (req, res, next) => {
    const {id} = req.body
    console.log(req.body)
    const { QueryTypes } = require('sequelize');
    let response = await db.sequelize.query(
        `SELECT strutture.id_gestore, prenotazioni.id_cliente, prenotazioni.id, strutture.nome, prenotazioni.prezzo, prenotazioni.check_in, prenotazioni.check_out,
         prenotazioni.confermata, prenotazioni.totale_tassa FROM prenotazioni, strutture, camere
         WHERE prenotazioni.id_struttura=strutture.id
         AND strutture.tipologia="0"
         AND strutture.id_gestore = "${id}"
         GROUP BY prenotazioni.id
         ` ,
         {type : QueryTypes.SELECT}
          )
          res.send(response)
          console.log(response)
    }

    exports.PrenotazioniUtenteStrutture = async (req, res, next) => {
        const {id} = req.body
        console.log(req.body)
        const { QueryTypes } = require('sequelize');
        let response = await db.sequelize.query(
            `SELECT strutture.id_gestore, prenotazioni.id_cliente, prenotazioni.id, strutture.nome, prenotazioni.prezzo, prenotazioni.check_in, prenotazioni.check_out,
             prenotazioni.confermata, prenotazioni.totale_tassa FROM prenotazioni, strutture, camere
             WHERE prenotazioni.id_struttura=strutture.id
             AND strutture.tipologia="0"
             AND prenotazioni.id_cliente = "${id}"
             GROUP BY prenotazioni.id
             ` ,
             {type : QueryTypes.SELECT}
              )
              res.send(response)
              console.log(response)
        }

    exports.PrenotazioniGestoreCamere = async (req, res, next) => {
        const {id} = req.body
        const { QueryTypes } = require('sequelize');
          let risposta = await db.sequelize.query(
          `SELECT camere.nome as nome_camera, strutture.id_gestore, prenotazioni.id_cliente, prenotazioni.id, strutture.nome, prenotazioni.prezzo, prenotazioni.check_in, prenotazioni.check_out,
             prenotazioni.confermata, prenotazioni.totale_tassa FROM prenotazioni, strutture, camere
             WHERE prenotazioni.id_struttura=strutture.id
             AND prenotazioni.id_camere=camere.id
             AND camere.id_struttura=strutture.id
             AND strutture.tipologia="1"
             AND strutture.id_gestore = "${id}"
             GROUP BY prenotazioni.id
             ` ,
             {type : QueryTypes.SELECT}
             )
             res.send(risposta)
             console.log(risposta)
}

exports.PrenotazioniUtenteCamere = async (req, res, next) => {
    const {id} = req.body
    const { QueryTypes } = require('sequelize');
      let risposta = await db.sequelize.query(
      `SELECT camere.nome as nome_camera, strutture.id_gestore, prenotazioni.id_cliente, prenotazioni.id, strutture.nome, prenotazioni.prezzo, prenotazioni.check_in, prenotazioni.check_out,
         prenotazioni.confermata, prenotazioni.totale_tassa FROM prenotazioni, strutture, camere
         WHERE prenotazioni.id_struttura=strutture.id
         AND camere.id_struttura=strutture.id
         AND prenotazioni.id_camere=camere.id
         AND strutture.tipologia="1"
         AND prenotazioni.id_cliente = "${id}"
         GROUP BY prenotazioni.id
         ` ,
         {type : QueryTypes.SELECT}
         )
         res.send(risposta)
         console.log(risposta)
}

exports.conferma = async (req, res, next) => {
    console.log(req.body)
    const {id_prenotazione, confermata} = req.body
    let response = await Prenotazione.update({
        confermata:confermata
    } , {
        where: {id: id_prenotazione,
             }, 
            })
            res.send(response)
}

exports.getGuadagni= async(req,res,next)=>{
    const{id}=req.body
    console.log({id})
    if (id !==undefined){
        try{
            const { QueryTypes } = require('sequelize');
            let guadagni = await db.sequelize.query(
                `SELECT sum(prezzo) AS guadagni ,sum (totale_tassa) AS tassa FROM prenotazioni
                where id_struttura IN (SELECT id FROM strutture
                                            WHERE id_gestore = "${id}")`,
                    
             {type : QueryTypes.SELECT} 
            )
            res.send(guadagni)
        }
        catch(e){
            next(createError(500, e.original ? (e.original.sqlMessage ? e.original.sqlMessage : e) : e));
        }
    }
    else{
        next(createError(422, "Utente non trovato"));
    } 
    }