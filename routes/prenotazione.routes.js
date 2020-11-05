const express = require('express');
const router = express.Router();
const db = require("../models");
const Prenotazione = db.prenotazione;
const prenotazioneControl = require('../controller/prenotazioneControl')


router.post('/pagamento', prenotazioneControl.pagamento);
router.post('/getPrenotazioniStrutture', prenotazioneControl.PrenotazioniGestoreStrutture);
router.post('/getPrenotazioniCamere', prenotazioneControl.PrenotazioniGestoreCamere);
router.post('/getPrenotazioniUtenteStrutture', prenotazioneControl.PrenotazioniUtenteStrutture);
router.post('/getPrenotazioniUtenteCamere', prenotazioneControl.PrenotazioniUtenteCamere);
router.post('/getId', prenotazioneControl.getid);
router.post('/prenotaStruttura', prenotazioneControl.prenotaStruttura);
router.post('/conferma', prenotazioneControl.conferma);
router.post('/getGuadagni', prenotazioneControl.getGuadagni);


//router.post('/ricerca', StruttureControl.ricerca);

module.exports = router;
