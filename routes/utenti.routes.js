const express = require('express');
const router = express.Router();
const db = require("../models");
const Utente = db.utente;
const AutenticazioneControl = require( "../controller/autenticazioneControl.js");

//router.metodo('URL', funzione o oggetto da utilizzare)


/*exports.stampaEmail= async (req, res) => {
    console.log(req.body)
    
        let prova= await Utente.findOne({where:{email:req.body.email}})
        res.send(prova);
    
};*/

router.post('/login', AutenticazioneControl.login);

//router.post('/', this.stampaEmail);

router.post('/registrazione', AutenticazioneControl.registrazione);




module.exports = router;