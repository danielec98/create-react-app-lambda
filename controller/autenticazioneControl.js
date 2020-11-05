const express = require('express');
const router = express.Router();
const db = require("../models");
const Utente = db.utente;
const crypto = require('crypto');
const createError= require('http-errors');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../configurazione/configurazionejwt');
const configurazionejwt = require('../configurazione/configurazionejwt');

exports.login = async (req,res, next) => {
     const {email, password}=req.body;
     if ((email !== undefined) && (password !== undefined)){
         try {
             let response= await Utente.findOne({where:{email: email}})
                if(response===null){
                    next(createError(404,'Utente non trovato'));
                }
                else {
                    let encPass = crypto.createHash("sha512").update(password).digest('hex');
                    if(response.password===encPass){
                        const token = await jwt.sign({response}, configurazionejwt.secret, {
                            expiresIn: 86400 // 24 ore
                        });
            
                        response.setDataValue('token', token);
                        res.send(response);
                    }
                    else {
                        next(createError(422,'password non corretta'));
                    }
                   

                }

                
             }
             catch(e){
                next(createError(401, e.original ? (e.original.sqlMessage ? e.original.sqlMessage : e) : e));
             }
    
     }
     else next(createError(422,'campi non corretti'));
     
};


//mettere gli errori
exports.registrazione = async (req, res, next) => { console.log(req.body)
    const {nome, cognome, email, data_di_nascita,cap,indirizzo,partita_iva, password, citta, telefono, tipo} = req.body;
    if ((nome !== undefined) && (cognome !== undefined) && (email !== undefined) && (password !== undefined)
     && (data_di_nascita !== undefined) && (citta !== undefined) && (cap !== undefined) && (indirizzo !== undefined)
      && (partita_iva !== undefined) && (telefono !== undefined) && (tipo !== undefined)) {
        try {
            let encPass = crypto.createHash("sha512").update(password).digest('hex');
            let user = await Utente.findOne({where: {email: email}});
            if (user === null) {
                user = await Utente.create({
                    nome: nome,
                    cognome: cognome,
                    citta:citta,
                    cap: cap,
                    indirizzo:indirizzo,
                    telefono:telefono,
                    email:email,
                    password:encPass,
                    data_di_nascita: data_di_nascita,
                    tipo:tipo,
                    partita_iva: partita_iva,
                })
                /*const token = await jwt.sign({user}, jwtConfig.secret, {
                    expiresIn: 86400 // 24 ore
                });

                user.setDataValue('token', token);*/
                res.send(user)
            } else {
                next(console.log(400, 'Email già utilizzata'));
            }
        } catch (e) {
            next(console.log(500, e.original ? (e.original.sqlMessage ? e.original.sqlMessage : e) : e));
        }

    } else {
        next(console.log(422, "una proprietà fra nome , cognome , mail , data_nascita , password , citta, telefono, tipologia non è stata definita"))
    }

  };

  