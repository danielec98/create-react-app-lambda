
import React from 'react';
import {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import axios from 'axios';
import '../css/datiPersonali.css';
import AutenticazioneConn from '../connessioni/AutenticazioneConn'
import { Card } from 'react-bootstrap';
import Row from 'react-bootstrap/Row'
import AreaPersonaleConn from '../connessioni/AreaPersonaleConn';


export default class datiPersonali extends Component{
state = {
    utente:[],
    tipo:AutenticazioneConn.getCurrentUser().tipo
    }
   

  
        componentDidMount=async()=>{
            try{
              let id=AutenticazioneConn.getCurrentUser().id;
              console.log(id)
              let risposta = await AreaPersonaleConn.fetchUtente(id)
              this.setState({utente:risposta.data})
             
          }
          catch(e){}
        }



    render(){
    return(
        <div className="main">
        <h1 align="center">Riepilogo dati personali</h1>
        <div className="container">
            {'Nome: ' + this.state.utente.nome} <br></br>
            {'Cognome: ' + this.state.utente.cognome} <br></br>
            {'Email: ' + this.state.utente.email} <br></br>
            {'Città: ' + this.state.utente.citta} <br></br>
            {'CAP: ' + this.state.utente.cap} <br></br>
            {'Indirizzo: ' + this.state.utente.indirizzo} <br></br>
            {'Data di nascita: ' + this.state.utente.data_di_nascita} <br></br>
            {'Telefono: ' + this.state.utente.telefono} <br></br>
            {this.state.utente.tipo === true ?
            'Partita IVA: ' + this.state.utente.partita_iva : null}
      </div>
      <div className="btnAlignModifica">
          <Row>
          {this.state.tipo == true ?
      <Link to="/areaPersonaleGestore/datiPersonali/modificaDatiPersonali">
              <Button variant="dark" type="submit" className="btnModifica">
                Modifica dati
              </Button>
              </Link> :
      <Link to="/areaPersonaleUtente/datiPersonali/modificaDatiPersonali">
        <Button variant="dark" type="submit" className="btnModifica">
                Modifica dati
              </Button>
              </Link>}

              <Link to='datiPersonali/modificaPassword'>
              <Button variant="dark" type="submit" className="btnModifica">
                Modifica password
              </Button>
              </Link>

              </Row>
            </div>            
        </div>
    );
};
};