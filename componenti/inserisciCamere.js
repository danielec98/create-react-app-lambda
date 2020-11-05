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
    descrizione: yup.string().required("Inserisci la descrizione della camera (es: luoghi d'interesse vicini alla struttura)"),
    prezzo_req: yup
        .string()
        .required("Inserisci il prezzo")
        .matches(/^(?=.*[0-9])(?=.{1,})/, "Deve contenere numeri."),
});

export default class inserisciCamere extends Component{

  
  state = {
    file: [],
       riscaldamento:0,
       aria_condizionata:0,
       servizio:0,
       id_struttura:this.props.location.state.id_struttura
  };

  async componentDidMount(){ 
    try{
      let id = AutenticazioneConn.getCurrentUser().id
    console.log(this.state.id_struttura)
    
    }
    
    catch(e){}
    }

handleid = ()=>{
  console.log(this.struttura.id)
  console.log(this.state.id_struttura)
}
 
   handlerChange = async (event) => { //funzione che serve per gestire il bottone di input del file
    let files = event.target.files; 
    let checkFiles=false;  //variabile che serve per verificare la correttezza del formato delle immagini, verrà posta a true
                           //se non sono del tipo richiesto
     for await (let file of files){
         let filename=file.name.split(".").pop(); //funzione di JS che permette di dividere una stringa a partire da
                                                   //un carattere definito, pop() serve per eliminare una parte della stringa
         let filenamee = filename.toLowerCase()
          if(filenamee !== 'jpg' && filenamee !== 'jpeg'){ //se le immagini non sono del formato corretto
                                                                                 // setti la variabile files a vuota
             toast("si possono caricare solo immagini");
             checkFiles=true;
             files =[];
             break;
          }
     }
     this.setState({ file: files }); 
};

handleCheckAria=(event)=>{
  if(event.target.checked){
    this.setState({aria_condizionata:1})
}else{
   this.setState({aria_condizionata:0})
}
}

handleCheckRiscaldamenti=(event)=>{
  if(event.target.checked){
    this.setState({riscaldamento:1})
}else{
   this.setState({riscaldamento:0})
}
}

handleCheckServizio=(event)=>{
  if(event.target.checked){
    this.setState({servizio:1})
}else{
   this.setState({servizio:0})
}
}


 registraCamera = async (values) => { 
  try {
    let obj = {...values}
    obj.aria_condizionata=this.state.aria_condizionata
    obj.servizio=this.state.servizio
    obj.riscaldamento=this.state.riscaldamento
    obj.id_struttura=this.state.id_struttura
    console.log(obj)
    let response = await StrutturaConn.registraCamera(obj);
      let dati = new FormData();  //oggetto gestito da multer per salvare le immagini, array formato da coppia chiave valore
        dati.append("immagini", this.state.file[0])
        dati.append("id", response.data.id); // in FormData salviamo tutte le immagini, ciascuna con la chiave "immagini"
                                                     // memorizzando una sola volta l'id della struttura
       console.log(dati.get("id"))
      console.log(dati.get("immagini"))
      await toast(
        'Camera inserita correttamente'
      ); 
     let risposta = await StrutturaConn.aggiungiImmaginiCamera(dati); //oggetto per memorizzare le immagini
    
  } catch (e) {
      console.log(e);
    }
}



    render() {
      const strutture = this.state.strutture
    return(
            <Formik
            validationSchema={schema} //Si definisce il controllo degli errori sullo schema yup per essere verificato
                initialValues={{  //deve contenere gli stessi nomi dei campi "name" e "value"
                nome:"",
                prezzo:"",
                foto:"",
                numero_ospiti:1,
                servizio:0,
                riscaldamento:0,
                aria_condizionata:0,
                descrizione:"",
               
               
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
          <Card.Header>Inserisci Camera</Card.Header>
            <Card.Body>
            <Form
            noValidate
            id="formregistrazione"
          >
              <Form.Row>
                <Form.Group controlId="formBasicNome">
                <label>Nome</label>
                <Form.Control
                  name="nome"
                  value={values.nome}
                  type="text"
                  required
                  placeholder="Nome"
                  value={values.nome}
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

                  

                <Form.Group controlId="numero_ospiti" className="formSize1">
                  <Form.Label>Posti letto:</Form.Label>
                  <Form.Control                           
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
                <Form.Group controlId="formBasicPrezzo" className="formSize">
                  <label>Prezzo</label>
                  <Form.Control
                  name="prezzo"
                  type="text"
                  required
                  placeholder="€"
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
                  </Form.Row>
                  <Form.Group controlId="formBasicDescrizione">
                <label>Descrizione</label>
                <Form.Control
                  name="descrizione"
                  value={values.descrizione}
                  type="text"
                  required
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
                  
                  <div className="filtriStruttura">
                  <p align="center">Seleziona le caratteristiche della camera:</p>
                      <Form.Row>
                        <Form.Group >
                  <Form.Check onChange={this.handleCheckRiscaldamenti} className="filtersCheck" type="checkbox" id="riscaldamento" label="Riscaldamento" />
                  <Form.Check onChange={this.handleCheckAria} className="filtersCheck" type="checkbox" id="aria_condizionata" label="Aria condizionata" />
                  <Form.Check onChange={this.handleCheckServizio} className="filtersCheck" type="checkbox" id="servizio" label="Servizio in camera" />
                  </Form.Group>
                  </Form.Row>
                  </div>
                  <p align="center">Scegli una foto da caricare:</p>
                  <Form.Group id="file" className="imgfile">
                          <Form.File
                            required
                            name="file"
                            accept=".jpg,.png,.jpeg"
                            onChange={this.handlerChange}
                            id="validationFormik107"
                          />
                        </Form.Group>
                  <div className="btnAlignReg">
              <Button onClick={(event)=>{this.registraCamera(values);
                                          event.preventDefault();}} variant="dark" type="submit" >
                Inserisci Camera
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
