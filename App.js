import React from 'react';
import logo from './logo.svg';
import './css/App.css';
import {Component} from 'react';
import Button from 'react-bootstrap/Button';
import { Nav } from 'react-bootstrap';
import { render } from '@testing-library/react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Login from './componenti/login.js';
import Registrazione from './componenti/register.js';
import Card from 'react-bootstrap/Card';
import areaPersonaleGestore from './componenti/areaPersonaleGestore';
import areaPersonaleUtente from './componenti/areaPersonaleUtente'
import AutenticazioneConn from './connessioni/AutenticazioneConn'
import inserisciStruttura from './componenti/inserisciStruttura';
import inserisciCamere from './componenti/inserisciCamere';
import gestioneStrutture from './componenti/gestioneStrutture';
import datiPersonali from './componenti/datiPersonali';
import ModificaDati from './componenti/modificaDati';
import ModificaPassword from './componenti/modificaPassword'
import home from './componenti/home';
import gestioneEconomica from './componenti/gestione_economica'
import datiUfficio from './componenti/datiUfficio'
import visualizzaStruttura from './componenti/visualizzaStruttura';
import gestionePrenotazioni from './componenti/gestionePrenotazioniGestore';
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import prenotazione from './componenti/prenotazione'
import pagamento from './componenti/pagamento'
import gestioneCamere from './componenti/gestioneCamere'
import modificaStruttura from './componenti/modificaStruttura';
import modificaCamera from './componenti/modificaCamera';
import verificaGuadagni from './componenti/verificaGuadagni';
import gestionePrenotazioniUtente from './componenti/gestionePrenotazioniUtente'



export default class NavigationBar extends Component {

  state = {
    showAdminBoard: undefined,
    currentUser: undefined
  }

  constructor(props){
    super(props)
    this.state = {
      showAdminBoard:"",
      currentUser:undefined,
    }
  }

  componentDidMount() {
    const utente = AutenticazioneConn.getCurrentUser();
    if (utente) {
      this.setState({
        currentUser: utente,
        showAdminBoard: utente.tipo,
      })}
 }

  logout() {
    AutenticazioneConn.logout();
  }

  render(){
    const { currentUser, showAdminBoard} = this.state;
  return (
<div className="main">
  <Router>
    <Navbar className="Navbar" variant="dark">
      <Navbar.Brand href="/home">
      <img
        src={require("./logo.svg")}
        width="133"
        height="40"
        className="d-inline-block align-top"
        />
      </Navbar.Brand>
        <Nav className="Nav">
        {showAdminBoard === true ? (
          <Nav.Link bsPrefix="nlink" href="/areaPersonaleGestore">Area Personale Gestore</Nav.Link>
            ) : null}

        {showAdminBoard === false ? (
          <Nav.Link bsPrefix="nlink" href="/areaPersonaleUtente">Area Personale Utente</Nav.Link>
            ) : null}
     
          
          {currentUser ? (
          <Nav.Link bsPrefix="nlink" href="http://localhost:3000" onClick={this.logout}>Logout</Nav.Link>
          ) : (
            <div className="notLoggedIn">
          <Nav.Link bsPrefix="nlink" href="/login">Login</Nav.Link>
          <Nav.Link bsPrefix="nlink" href="/register">Registrati</Nav.Link>
          </div>
          )}
        </Nav>
    </Navbar> 

    {showAdminBoard === false ?
    <Switch>
      <Route exact path="/areaPersonaleUtente/datiPersonali" component={datiPersonali}/>
      <Route exact path="/areaPersonaleUtente/datiPersonali/modificaDatiPersonali" component={ModificaDati}/>
      <Route exact path="/areaPersonaleUtente/datiPersonali/modificaPassword" component={ModificaPassword}/>
      <Route exact path="/areaPersonaleUtente/gestionePrenotazioniUtente" component={gestionePrenotazioniUtente}/>
      <Route exact path="/areaPersonaleUtente" component={areaPersonaleUtente}/>
      <Route exact path="/prenotazione" component={prenotazione}/>
      <Route exact path="/pagamento" component={pagamento}/>
    </Switch>      
     : null }


    {showAdminBoard === true ?
    <Switch>
      <Route exact path="/areaPersonaleGestore" component={areaPersonaleGestore}/>
      <Route exact path="/areaPersonaleGestore/gestioneStrutture/inserisciStruttura" component={inserisciStruttura}/>
      <Route exact path="/areaPersonaleGestore/datiPersonali" component={datiPersonali}/>
      <Route exact path="/areaPersonaleGestore/datiPersonali/modificaDatiPersonali" component={ModificaDati}/>
      <Route exact path="/areaPersonaleGestore/datiPersonali/modificaPassword" component={ModificaPassword}/>
      <Route exact path="/areaPersonaleGestore/gestioneEconomica" component={gestioneEconomica}/>
      <Route exact path="/areaPersonaleGestore/gestioneEconomica/datiUfficio" component={datiUfficio}/>
      <Route exact path="/areaPersonaleGestore/gestionePrenotazioniGestore" component={gestionePrenotazioni}/>
      <Route exact path="/areaPersonaleGestore/gestioneStrutture" component={gestioneStrutture}/>
      <Route exact path="/areaPersonaleGestore/gestioneStrutture/modificaStruttura" component={modificaStruttura}/>
      <Route exact path="/areaPersonaleGestore/gestioneCamere/modificaCamera" component={modificaCamera}/>
      <Route exact path="/areaPersonaleGestore/gestioneStrutture/gestioneCamere" component={gestioneCamere}/>
      <Route exact path="/areaPersonaleGestore/gestioneStrutture/inserisciCamere" component={inserisciCamere}/>
      <Route exact path="/areaPersonaleGestore/gestioneEconomica/verificaGuadagni" component={verificaGuadagni}/>
      </Switch>
      : null }


<Route exact path="/home" component={home}/>
<Route exact path="/" component={home}/>
<Route exact path="/login" component={Login}/>
<Route exact path="/register" component= {Registrazione}/>
<Route exact path="/visualizzaStruttura" component={visualizzaStruttura}/>


  </Router>
  </div>
    
  );
  };

};

library.add(fab, faCheckSquare, faCoffee)
