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
import '../css/visualizzaStruttura.css';
import Table from 'react-bootstrap/Table';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import axios from 'axios';
import { fab, faWindows } from '@fortawesome/free-brands-svg-icons'
import { faCheck, faCheckSquare, faMapMarkerAlt, faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

export default class GestioneCamere extends Component{

state={
    camere:[],
    id:AutenticazioneConn.getCurrentUser().id,
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
    const response = await StrutturaConn.getCamere(id);
    this.setState({camere: response.data})
    console.log(response.data)
}

cancellaCamera=async () => {
    let id_camera = this.state.id_camera
    let cancella = await StrutturaConn.cancellaCamera(id_camera)
  }

state={
camere:[],
id_struttura:"",
id_camera:"",
}

    render(){ 
        return (
<div className="main">
            <h1 align="center">{'Gestione Camere'} </h1>
            <div className="tablecontainer">
                <br></br> <br></br>
<Table bordered hover responsive>
  <thead>
    <tr className="btnConferma">
            <th>ID</th>
            <th>Nome</th>
            <th>Nome Struttura</th>
            <th>Descrizione</th>
            <th>Posti letto</th>
            <th>Modifica</th>
            <th>Elimina</th>
          </tr>
        </thead>
        <tbody>
        {this.state.camere.map((camera, index) => 
        <tr key={index}>
        <td>{camera.id}
          </td>
          <td>{camera.nome}
          </td>
          <td>{camera.nome_struttura}
          </td>
          <td>{camera.descrizione}
          </td>
          <td>{camera.numero_ospiti}
          </td>
          
          
        <td className="btnConferma"> 
          <Button onClick = {  () => {
           this.props.history.push({
            pathname: "/areaPersonaleGestore/gestioneCamere/modificaCamera",
            state: {    
              id_camera: camera.id,
              nome: camera.nome,
              descrizione: camera.descrizione,
              prezzo: camera.prezzo,
              numero_ospiti: camera.numero_ospiti,
              riscaldamento: camera.riscaldamento,
              aria_condizionata: camera.aria_condizionata,
              servizio_in_camera:camera.servizio_in_camera,              
            },
          });
            this.setState({id_camera:camera.id});
          }} 
            variant="primary"
        ><FontAwesomeIcon icon="edit"/></Button></td>
        <td className="btnConferma"> 
          <Button onClick = { async () => {
              await this.setState({id_camera:camera.id});
              this.cancellaCamera();
              window.location.reload();
          }} 
            variant="danger"
        ><FontAwesomeIcon icon="trash"/></Button> </td>
    </tr> )}
          </tbody>
</Table>
</div>
</div>
        )
    }
}


library.add(fab, faCheck, faMapMarkerAlt, faEdit, faTrash, faPlus)
