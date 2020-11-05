const express = require('express');
const router = express.Router();
const db = require("../models");
const Utente = db.utente;
const crypto = require('crypto');
    
exports.modificaDati = async (req, res, next) => {
    const {nome, cognome, data_di_nascita,cap,indirizzo,partita_iva, citta, telefono,id} = req.body;
    console.log(id)
    if ((nome !== undefined) && (cognome !== undefined) && (data_di_nascita !== undefined) 
        && (citta !== undefined) && (cap !== undefined) && (indirizzo !== undefined)
        && (partita_iva !== undefined) && (telefono !== undefined) && (id !== undefined)) {
        try {
                user = await Utente.update({
                    nome: nome,
                    cognome: cognome,
                    citta:citta,
                    cap: cap,
                    indirizzo:indirizzo,
                    telefono:telefono,
                    data_di_nascita: data_di_nascita,
                    partita_iva: partita_iva,
                }, {
                where: {id: id}, })
                res.send(user)

        } catch (e) {
            next(console.log(500, e.original ? (e.original.sqlMessage ? e.original.sqlMessage : e) : e));
        }

    } else {
        next(console.log(422, "una proprietà fra nome , cognome , data_nascita , citta, telefono non è stata definita"))
    }

  };
  exports.modificaPassword = async (req,res,next)=>{
      const {old_password, new_password, id}=req.body;
  if ((old_password !== undefined) && (new_password !== undefined) && (id !== undefined)){
      try {
        let encPass = crypto.createHash("sha512").update(old_password).digest('hex');
        let newPass = crypto.createHash("sha512").update(new_password).digest('hex');
        console.log(newPass)
          let response= await Utente.update({
              password:newPass}, {
                where: {password: encPass,
                        id : id
                     }, 
                })
            res.send(response)
     }
     
        catch (e) {
            next(console.log(500, e.original ? (e.original.sqlMessage ? e.original.sqlMessage : e) : e));
        }
        }
        else {
            next(console.log(422, "la Password non è stata definita"))
        }
    }

    exports.getGuadagni = async (req, res, next) => {
        const { QueryTypes } = require('sequelize');
        let response = await db.sequelize.query(
            `SELECT pagamento.prezzo, strutture.id_gestore from strutture, pagamento, prenotazioni, camere
            WHERE prenotazioni.id = pagamento.id_prenotazione
            AND prenotazioni.id_camere=camere.id
            AND prenotazioni.id_struttura=strutture.id
            AND camere.id_struttura=strutture.id
             ` ,
             {type : QueryTypes.SELECT}
              )
        res.send(response)
        console.log(response)
    }
    exports.fetchUtenti= async (req, res, next) => { 
        console.log(req.body)
        const {id} = req.body;
        if (id !== undefined) {
            try {
                let utente = await Utente.findOne({where: {id: id}});
                if (utente === null) {
                    next(createError(404,'Utente non trovato'));
                
                } else {
                    res.send(utente)
                    console.log(utente.dataValues)
                }
            } catch (e) {
                next(console.log(500, e.original ? (e.original.sqlMessage ? e.original.sqlMessage : e) : e));
            }
    
        } else {
            next(createError(422,'devi essere loggato per continuare'));
        }
    
    }