
import React from 'react';
import {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import axios from 'axios';
import AutenticazioneConn from "../connessioni/AutenticazioneConn";
import '../css/areaPersonale.css';

export default class areaPersonaleGestore extends Component{
state = {
    nome:"",
    cognome:"",
    }

    componentDidMount(){
        const utente = AutenticazioneConn.getCurrentUser();
        if (utente) {
            this.setState({
                nome : utente.nome,
                cognome : utente.cognome,
            })
        }
    }



    render(){
    return(
        console.log(this.state.nome),
        <div className="main">
            <h1 align="center">{'Bentornato!'} </h1>
            <h2 align="center">{'Area personale di ' + this.state.nome +  ' ' + this.state.cognome} </h2>
        <div className="funzioniGestore">
        <Link to='/areaPersonaleGestore/gestioneStrutture'>
            <Button className="btnGestore" variant="dark">
                Gestione Strutture
            </Button>
            </Link>
            <Link to='/areaPersonaleGestore/gestionePrenotazioniGestore'>
            <Button className="btnGestore" variant="dark">
                Gestione Prenotazioni
            </Button>
            </Link>
            <Link to='/areaPersonaleGestore/datiPersonali'>
            <Button  className="btnGestore" variant="dark">
                Gestione Dati Personali
            </Button>
            </Link>
            <Link to='/areaPersonaleGestore/gestioneEconomica'>
            <Button className="btnGestore" variant="dark">
                Gestione Economica e Legale
            </Button>
            </Link>
        </div>
        </div>
    );
};
};