const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');
const db = require("./models");
const bodyParser = require('body-parser')


//Route
const indexRouter = require('./routes');
const utentiRouter = require('./routes/utenti.routes');
const struttureRouter = require('./routes/strutture.routes');
const areaPersonaleRouter = require('./routes/areaPersonale.routes');
const prenotazioneRouter = require('./routes/prenotazione.routes')

const app = express();
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.options('*', cors()) // da includere prima delle altre routes
app.use(bodyParser.json()); // <--- Here

app.use('/', indexRouter);
app.use('/strutture', struttureRouter);
app.use('/utenti', utentiRouter);
app.use('/areaPersonale', areaPersonaleRouter);
app.use('/prenotazione', prenotazioneRouter);

db.sequelize.sync();


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err.message);
  //res.render('error');
});

module.exports = app;