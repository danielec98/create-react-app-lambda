import React from 'react';
import {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import axios from 'axios';
//import AutenticazioneConn from "../connessioni/AutenticazioneConn";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "react-bootstrap/Card";
import '../css/register.css';
import AutenticazioneConn from "../connessioni/AutenticazioneConn"
import StrutturaConn from "../connessioni/StrutturaConn"
import prenotazioneConn from "../connessioni/prenotazioneConn"


export default class datiUfficio extends Component{
    
  constructor(props){
    super(props)
    this.caricamento();

  }
  state={
    strutture:[],
    indice:0,
  }

   caricamento=async()=>{
     try{
      let id_gestore=AutenticazioneConn.getCurrentUser().id;
      console.log(id_gestore)
      let risposta = await StrutturaConn.getTassa(id_gestore)
      this.setState({strutture:risposta.data})
      console.log(this.state.strutture)
    }
      catch(e){

      }
    }
  
  
    handleSubmit = async (values) => {
      let obj = {...values}
      try {
          
        await toast(
          `dati correttamente inviati all'ufficio del turismo`
        );
      } catch (e) {
        toast(e);
      }
  }

  
  


    render(){
        
        return (

            
            <div className="datiufficio">
                
                <Formik
            initialValues={this.state}>
            {({
            handleSubmit, //Funzione che serve al submitting (pressione del tasto registrati)
            handleChange, //Funzione che serve a inizializzare funzioni al cambiamento dei campi 
            handleBlur, //Funzione che serve a inizializzare funzioni al cambio del focus
            values, //Array che attraverso una serie di campi definiti su "name", proprietà dei componenti del form
            touched, //Quando è stato utilizzato il campo
            isValid, //Condizioni per le quali un campo risulta corretto (senza errori)
            dirty, //Quando un campo non ha gli stessi valori di quelli salvati in initialValues
            errors, //Array che contiene gli errori relativi ai campi contenuti in Formik
          }) => (
            <div className="Form">
            <ToastContainer />
      <Card className="DatiCard">
        <Card.Header>Invio dati Ufficio del Turismo</Card.Header>
          <Card.Body>
          <Form
          noValidate
          id="formregistrazione"
          onSubmit={handleSubmit}
        >
            <Form.Row>
            <Form.Group controlId="struttura" >
                  <Form.Label>Struttura</Form.Label>
                  <Form.Control
                            as="select"
                            name="indice"
                            value={values.indice}
                            onChange={handleChange}
                            onBlur={handleBlur}>
                            { this.state.strutture ?
        this.state.strutture.map((struttura, index) => 
          <option key={index} value={index}>{struttura.nome}</option>)
        : null}
                            
                          </Form.Control>
                </Form.Group>
                
                </Form.Row>
                <Form.Group controlId="formBasicNome">
          <label>Tassa</label>
          <Form.Control
            name="indice"
            value={values.tassa}
            type="text"
            disabled
            placeholder={this.state.strutture.length>0 ? this.state.strutture[values.indice].tassa:null}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={
              touched.nome && errors.nome ? "error" : null
            }

          />
          </Form.Group>
            
                    
                </Form>
                </Card.Body>
                </Card>
                </div>
          )}


        </Formik>
        

        <div className="btnAlignDati">
                        <Button variant="dark" type="submit" className="btnDati" onClick={this.handleSubmit} >
                         Invia 
                        </Button >
                    </div>
        </div>
     
   
        )
    }
}