const multer = require('multer');
const express = require("express");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/immagini')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
})

exports.upload = multer({ storage: storage }).array("immagini",5 )