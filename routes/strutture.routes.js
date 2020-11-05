const express = require('express');
const router = express.Router();
const db = require("../models");
const Struttura = db.struttura;
const StruttureControl = require('../controller/StruttureControl')

router.post('/strutture', StruttureControl.aggiungi);
router.post('/immagini', StruttureControl.aggiungiImmagini);
router.post('/immaginiCamera', StruttureControl.aggiungiImmaginiCamera);
router.post('/search', StruttureControl.search);
router.post('/searchCamere', StruttureControl.searchCamere);
router.post('/getStrutture', StruttureControl.getStrutture);
router.post('/getCamere', StruttureControl.getCamere);
router.get('/getNome', StruttureControl.getNome);
router.post('/prenotaCamera', StruttureControl.prenotaCamera);
router.post('/registraCamera', StruttureControl.registraCamera);
router.post('/modificaStruttura', StruttureControl.modificaStruttura);
router.post('/modificaCamera', StruttureControl.editCamera);
router.post('/deleteStruttura', StruttureControl.deleteStruttura);
router.post('/cancellaCamera', StruttureControl.deleteCamera);
router.post('/getTassa', StruttureControl.getTassa);
router.post('/fetchImage', StruttureControl.prendiImmagini);
router.post('/modificaFoto', StruttureControl.modificaFoto);
router.post('/cancella', StruttureControl.cancella);











module.exports = router;
