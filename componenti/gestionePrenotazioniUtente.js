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
  import prenotazioneConn from "../connessioni/prenotazioneConn";
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { fab, faWindows } from '@fortawesome/free-brands-svg-icons'
  import { faCheck, faCheckSquare, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  
  export default class GestionePrenotazioniUtente extends Component{
  
    async componentDidMount(){
      let id = AutenticazioneConn.getCurrentUser().id
      let response = await prenotazioneConn.getPrenotazioniUtenteStrutture(id)
      let risposta = await prenotazioneConn.getPrenotazioniUtenteCamere(id)
      this.setState({prenotazioni: response.data,
                      prenotazionicamera: risposta.data})
    }
  
    state={
      prenotazioni:[],
      prenotazionicamera:[],
      id_prenotazione:"",
      confermata:0,
    }
  
      render(){ 
        const prenotazioni = this.state.prenotazioni
          return (
  
              
              <div className="tablecontainer">
                  <h1 align="center">Gestione Prenotazioni</h1>
                  <br></br> <br></br>
  <Table bordered hover responsive>
    <thead>
    <tr className="btnConferma">
              <th>ID</th>
              <th>Struttura</th>
              <th>Camera</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Prezzo</th>
              <th>Tassa</th>
              <th>Conferma</th>
            </tr>
          </thead>
    <tbody>
      {this.state.prenotazioni.map((prenotazione, index) => 
       <tr key={index}>
          <td>{prenotazione.id}
            </td>
            <td>{prenotazione.nome}
            </td>
            <td>{prenotazione.nome_camera}
            </td>
            <td>{prenotazione.check_in}
            </td>
            <td>{prenotazione.check_out}
            </td>
            <td>{prenotazione.prezzo}
            </td>
            <td>{prenotazione.totale_tassa}
            </td>
            {prenotazione.confermata == 0 ?
            <td> 
            Non confermata</td> : <td> Confermata </td> }
      </tr>)}
  
      {this.state.prenotazionicamera.map((prenotazionecamera, index) => 
       <tr key={index}>
          <td>{prenotazionecamera.id}
            </td>
            <td>{prenotazionecamera.nome}
            </td>
            <td>{prenotazionecamera.nome_camera}
            </td>
            <td>{prenotazionecamera.check_in}
            </td>
            <td>{prenotazionecamera.check_out}
            </td>
            <td>{prenotazionecamera.prezzo}
            </td>
            <td>{prenotazionecamera.totale_tassa}
            </td>
            {prenotazionecamera.confermata == 0 ?
            <td> 
            Non confermata</td> : <td> Confermata </td> }
      </tr>)}
  
    {console.log(this.state)}
    </tbody>
  </Table>
  </div>
          )
      }
  }
  
  
  
  library.add(fab, faCheck, faMapMarkerAlt)
  
  