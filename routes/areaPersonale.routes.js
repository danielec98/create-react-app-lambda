const express = require('express');
const router = express.Router();
const db = require("../models");
const Utente = db.utente;
const areaPersonaleControl = require('../controller/areaPersonaleControl')


router.post('/modificaDati', areaPersonaleControl.modificaDati);
router.post('/modificaPassword', areaPersonaleControl.modificaPassword);
router.get('/getGuadagni', areaPersonaleControl.getGuadagni);
router.post('/fetchUtenti', areaPersonaleControl.fetchUtenti);

module.exports = router;

