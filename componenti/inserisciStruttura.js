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
import '../css/inserisciStruttura.css';

const schema = yup.object().shape({
    nome: yup.string().required("Per favore, inserisci il nome della struttura."),
    citta: yup.string().required("Inserire una città valida"),
    indirizzo: yup.string().required("Inserisci il tuo indirizzo"),
    tassa: yup.string().required("Inserisci la tassa di soggiorno").matches(/^[0-9]\d*(\.\d+)?$/, "La tassa inserita non può essere negativa"),
    cap: yup.string().required("Inserisci il tuo CAP").matches(/^[0-9]{5,5}$/,"Il CAP deve contenere 5 interi."),
    descrizione: yup.string().required("Inserisci la descrizione della struttura (es: luoghi d'interesse vicini alla struttura)"),
  });

export default class inserisciStruttura extends Component{

  
  state = {
    file: [],
       wifi:0,
       parcheggio:0,
       piscina:0,
       disabled:true,
       tipo:"true"
  };


  handlebb=async (event)=>{
    await this.setState({tipo:event.target.value})
    this.state.tipo == "true" ? this.setState({disabled:true}) : this.setState({disabled:false})
    console.log(this.state.tipo)
  }

  handleCheckPiscina=(event)=>{
    if(event.target.checked){
      this.setState({aria_condizionata:1})
  }else{
     this.setState({aria_condizionata:0})
  }
  }
  
  handleCheckWifi=(event)=>{
    if(event.target.checked){
      this.setState({riscaldamento:1})
  }else{
     this.setState({riscaldamento:0})
  }
  }
  
  handleCheckParcheggio=(event)=>{
    if(event.target.checked){
      this.setState({servizio:1})
  }else{
     this.setState({servizio:0})
  }
  }

  handlerChange = async (event) => { //funzione che serve per gestire il bottone di input del file
    let files = event.target.files; 
    let checkFiles=false;  //variabile che serve per verificare la correttezza del formato delle immagini, verrà posta a true
                           //se non sono del tipo richiesto
     for await (let file of files){
         let filename =file.name.split(".").pop(); //funzione di JS che permette di dividere una stringa a partire da
                                                   //un carattere definito, pop() serve per eliminare una parte della stringa
         let filenamee = filename.toLowerCase()
          if( filenamee !== 'jpg' && filenamee !== 'jpeg'){ //se le immagini non sono del formato corretto
                                                                                 // setti la variabile files a vuota
             toast("si possono caricare solo immagini");
             checkFiles=true;
             files =[];
             break;
          }
     }
     this.setState({ file: files });
     console.log(this.state.file)
};

registraStruttura = async (obj) => { //funzione di submitting
  try {
    obj.wifi=this.state.wifi
    obj.piscina=this.state.piscina
    obj.parcheggio=this.state.parcheggio
      let response = await StrutturaConn.registraStruttura(obj); //variabile nella quale salviamo la risposta del server quando
                                                                 // richiamiamo axios nel file StrutturaConn
      console.log(response)
      let dati = new FormData();  //oggetto gestito da multer per salvare le immagini, array formato da coppia chiave valore
      dati.append("id", response.data.id)
      for (let i = 0; i < this.state.file.length; i++) { 
        dati.append("immagini", this.state.file[i])
      }
       // in FormData salviamo tutte le immagini, ciascuna con la chiave "immagini"
                                                     // memorizzando una sola volta l'id della struttura
      console.log(dati.get("id"))
      console.log(dati.get("immagini"))
      
      
      let risposta = await StrutturaConn.aggiungiFoto(dati); //oggetto per memorizzare le immagini
      await toast(
          'Struttura inserita correttamente'
        );
    } catch (e) {
      console.log(e);
    }
}



    render() {
    return(
            <Formik
           validationSchema={schema} //Si definisce il controllo degli errori sullo schema yup per essere verificato
            onSubmit={async (values) => {
               this.registraStruttura(values)}}
                initialValues={{  //deve contenere gli stessi nomi dei campi "name" e "value"
                nome:"",
                citta:"",
                descrizione:"",
                cap:"",
                indirizzo:"",
                tipologia:"true",
                prezzo:null,
                numero_ospiti:null,
                wifi:false,
                parcheggio:false,
                piscina:false,
                id_gestore: AutenticazioneConn.getCurrentUser().id,
                tassa:"",
           }}
           >
               {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
            isSubmitting,
          }) => (
              <div className="main">
                <div className="InserisciStruttura">
                  <ToastContainer />
        <Card className="inserisciStrutturaCard">
          <Card.Header>Inserisci Struttura</Card.Header>
            <Card.Body>
            <Form
            noValidate
            id="formregistrazione"
            onSubmit={handleSubmit}
          >
              <Form.Row>
                <Form.Group controlId="formBasicNome">
                <label>Nome</label>
                <Form.Control
                  name="nome"
                  value={values.nome}
                  type="text"
                  placeholder="Nome"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={
                    touched.nome && errors.nome ? "error" : null
                  }

                />
                <Form.Control.Feedback
                 className="FeedBack"
                 type="invalid"
                >
                    {errors.nome}
                </Form.Control.Feedback>
                  </Form.Group>
                <Form.Group controlId="tipo" className="capSize">
                  <Form.Label>Tipo:</Form.Label>
                  <Form.Control                           
                            as="select"
                            name="tipologia"
                            value={values.tipologia}
                            onChange={handleChange}
                            onClick={this.handlebb}
                            onBlur={handleBlur}
                            isInvalid={
                              touched.tipologia && errors.tipologia
                                ? "error"
                                : null
                            }
                          >
                            <option value="true">Bed and Breakfast</option>
                            <option value="false">Casa Vacanza</option>

                            
                           
                          </Form.Control>
                          <Form.Control.Feedback
                 className="FeedBack"
                 type="invalid"
                >
                    {errors.tipologia}
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="numero_ospiti" className="formSize1">
                  <Form.Label>Numero ospiti:</Form.Label>
                  <Form.Control            
                            disabled={this.state.disabled}               
                            as="select"
                            name="numero_ospiti"
                            value={values.numero_ospiti}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={
                              touched.numero_ospiti && errors.numero_ospiti
                                ? "error"
                                : null
                            }
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                          </Form.Control>
                          <Form.Control.Feedback
                 className="FeedBack"
                 type="invalid"
                >
                    {errors.numero_ospiti}
                </Form.Control.Feedback>
                </Form.Group>
                  </Form.Row>
                  <Form.Row>
                  <Form.Group className="formDescrizione" controlId="formBasicDescrizione">
                  <label>Descrizione</label>
                  <Form.Control
                  name="descrizione"
                  type="text"
                  placeholder="Descrizione"
                  value={values.descrizione}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={
                    touched.descrizione && errors.descrizione ? "error" : null
                  }
                /> 
                <Form.Control.Feedback
                 className="FeedBack"
                 type="invalid"
                >
                    {errors.descrizione}
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicPrezzo" className="formSize">
                  <label>Prezzo</label>
                  <Form.Control 
                  name="prezzo"
                  type="text"
                  placeholder="€"
                  disabled={this.state.disabled}
                  value={values.prezzo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={
                    touched.prezzo && errors.prezzo ? "error" : null
                  }
                />
                 <Form.Control.Feedback
                 className="FeedBack"
                 type="invalid"
                >
                    {errors.prezzo}
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicTassa" className="formSize">
                  <label>Tassa</label>
                  <Form.Control
                  name="tassa"
                  type="text"
                  placeholder="€"
                  value={values.tassa}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={
                    touched.tassa && errors.tassa ? "error" : null
                  }
                />
                 <Form.Control.Feedback
                 className="FeedBack"
                 type="invalid"
                >
                    {errors.tassa}
                </Form.Control.Feedback>
                </Form.Group>
                  </Form.Row>
                  <Form.Row>
                  <Form.Group className="capSize" controlId="formBasicCAP">
                  <label>CAP</label>
                  <Form.Control
                  name="cap"
                  type="text"
                  placeholder="CAP"
                  value={values.cap}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={
                    touched.cap && errors.cap ? "error" : null
                  }
                />
                <Form.Control.Feedback
                 className="FeedBack"
                 type="invalid"
                >
                    {errors.cap}
                </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="capSize" controlId="formBasicCitta">
                  <label>Città</label>
                  <Form.Control
                  name="citta"
                  type="text"
                  placeholder="Città"
                  value={values.citta}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={
                    touched.citta && errors.citta ? "error" : null
                  }
                />
                <Form.Control.Feedback
                 className="FeedBack"
                 type="invalid"
                >
                    {errors.citta}
                </Form.Control.Feedback>
                  </Form.Group>
                  

                  <Form.Group controlId="formBasicIndirizzo">
                  <label>Indirizzo</label>
                  <Form.Control
                  name="indirizzo"
                  type="text"
                  placeholder="Indirizzo"
                  value={values.indirizzo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={
                    touched.indirizzo && errors.indirizzo ? "error" : null
                  }
                />
                <Form.Control.Feedback
                 className="FeedBack"
                 type="invalid"
                >
                    {errors.indirizzo}
                </Form.Control.Feedback>
                  </Form.Group>
                  </Form.Row>
                  <div className="filtriStruttura">
                  <p align="center">Seleziona le caratteristiche della struttura:</p>
                      <Form.Row>
                        <Form.Group>
                  <Form.Check onChange={this.handleCheckWifi} className="filtersCheck" type="checkbox" id="wifi" label="Wi-Fi" />
                  <Form.Check onChange={this.handleCheckParcheggio} className="filtersCheck" type="checkbox" id="parcheggio" label="Parcheggio" />
                  <Form.Check onChange={this.handleCheckPiscina} className="filtersCheck" type="checkbox" id="piscina" label="Piscina" />
                  </Form.Group>
                  </Form.Row>
                  </div>
                  <p align="center">Scegli le foto da caricare:</p>
                  <Form.Group id="file" className="imgfile">
                          <Form.File
                            required
                            name="file"
                            multiple="multiple"
                            accept=".jpg,.png,.jpeg"
                            onChange={this.handlerChange}
                            id="validationFormik107"
                          />
                        </Form.Group>
                  <div className="btnAlignReg">
              <Button variant="dark" type="submit">
                Inserisci Struttura
              </Button>
            </div>    
                </Form>
                </Card.Body>
                </Card>
                </div>
              </div>
              )}
           </Formik>
    );
    };
};
