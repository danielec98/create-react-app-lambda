import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import { Formik } from "formik";
import Card from "react-bootstrap/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Component} from 'react';
import StrutturaConn from '../connessioni/StrutturaConn'
import AutenticazioneConn from "../connessioni/AutenticazioneConn"
import '../css/gestioneStrutture.css';
import Table from 'react-bootstrap/Table';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import axios from 'axios';
import { fab, faWindows } from '@fortawesome/free-brands-svg-icons'
import { faCheck, faCheckSquare, faMapMarkerAlt, faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

export default class GestioneStrutture extends Component{

state={
    strutture:[],
    id:AutenticazioneConn.getCurrentUser().id,
    id_struttura:""
}

/*handleCiao=()=>{
    var form = [];
    for (var i = 0; i < this.state.strutture.length; i++) {
    if (this.state.id == this.state.strutture[i].id_gestore) {
    form.push(<tbody>
        <tr>
          <td>{this.state.strutture[i].id}</td>
          <td>{this.state.strutture[i].nome}</td>
          <td>{this.state.strutture[i].citta}</td>
          <td>{this.state.strutture[i].indirizzo}</td>
          <td>{this.state.strutture[i].prezzo}</td>
        </tr>
      </tbody>)}
     }
    return form;
} */

async componentDidMount(){ 

    let id=AutenticazioneConn.getCurrentUser().id
    const response = await StrutturaConn.getStrutture(id);
    this.setState({strutture: response.data})
    console.log(response.data)



}


 deleteStruttura=async () => {
  let id_struttura = this.state.id_struttura
  let cancella = await StrutturaConn.deleteStruttura(id_struttura)
}

state={
strutture:[],
id_struttura:"",
}

    render(){ 
        const strutture = this.state.strutture
        return (
<div className="main">
            <h1 align="center">{'Gestione Strutture'} </h1>
            <div className="tablecontainer">
                <br></br> <br></br>
<Table bordered hover responsive>
  <thead>
    <tr className="btnConferma">
            <th>ID</th>
            <th>Nome</th>
            <th>Città</th>
            <th>Indirizzo</th>
            <th>Tipo</th>
            <th>Aggiungi Camere</th>
            <th>Modifica</th>
            <th>Elimina</th>
          </tr>
        </thead>
        <tbody>
        {this.state.strutture.map((struttura, index) => 
        <tr key={index}>
        <td>{struttura.id}
          </td>
          <td>{struttura.nome}
          </td>
          <td>{struttura.citta}
          </td>
          <td>{struttura.indirizzo}
          </td>
          <td>{struttura.tipologia == 0 ? "Casa Vacanza" : "B&B"}
          </td>
          
          <td className="btnConferma"> 
          {struttura.tipologia == 1 ?
          <Button onClick={() => {                        
            this.props.history.push({
              pathname: "/areaPersonaleGestore/gestioneStrutture/inserisciCamere",
              state: {    
                id_struttura: struttura.id,
              },
            });
          }}
            variant="success"
        ><FontAwesomeIcon icon="plus"/></Button> : null} </td>

        <td className="btnConferma"> 
          <Button onClick = {  () => { 
           
            this.props.history.push({
              pathname: "/areaPersonaleGestore/gestioneStrutture/modificaStruttura",
              state: {    
                id_struttura: struttura.id,
                nome: struttura.nome,
                descrizione: struttura.descrizione,
                prezzo: struttura.prezzo,
                cap: struttura.cap,
                citta: struttura.citta,
                indirizzo: struttura.indirizzo,
                numero_ospiti: struttura.numero_ospiti,
                tassa: struttura.tassa,
                piscina: struttura.piscina,
                wifi: struttura.wifi,
                parcheggio:struttura.parcheggio,
                tipologia:struttura.tipologia,
                
              },
            });
            this.setState({id_struttura:struttura.id});
          }} 
            variant="primary"
        ><FontAwesomeIcon icon="edit"/></Button></td>
        <td className="btnConferma"> 
          <Button onClick = { async  () => {
            await this.setState({id_struttura:struttura.id});
            this.deleteStruttura();
            window.location.reload()
          }} 
            variant="danger"
        ><FontAwesomeIcon icon="trash"/></Button> </td>
    </tr> )}
          </tbody>
</Table>
</div>
        <div className="funzioniGestore">
        <Link to='gestioneStrutture/gestioneCamere'>
            <Button className="btnGestore" variant="dark">
                    Gestione Camere
            </Button>
            </Link>

            <Link to='gestioneStrutture/inserisciStruttura'>
            <Button className="btnGestore" variant="dark">
                    Inserisci Struttura
            </Button>
            </Link>

            </div>
</div>
        )
    }
}


library.add(fab, faCheck, faMapMarkerAlt, faEdit, faTrash, faPlus)
