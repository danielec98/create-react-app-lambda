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

/*const schema = yup.object().shape({
    nome: yup.string().required("Per favore, inserisci il nome della struttura."),
    citta: yup.string().required("Inserire una città valida"),
    indirizzo: yup.string().required("Inserisci il tuo indirizzo"),
    tassa: yup.string().required("Inserisci la tassa di soggiorno").matches(/^[0-9]\d*(\.\d+)?$/, "La tassa inserita non può essere negativa"),
    cap: yup.string().required("Inserisci il tuo CAP").matches(/^[0-9]{5,5}$/,"Il CAP deve contenere 5 interi."),
    telefono: yup.string().matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, "Deve contenere 10 interi."),
    descrizione: yup.string().required("Inserisci la descrizione della struttura (es: luoghi d'interesse vicini alla struttura)"),
    prezzo_req: yup
        .string()
        .required("Inserisci il prezzo")
        .matches(/^(?=.*[0-9])(?=.{1,})/, "Deve contenere numeri."),
});*/

export default class modificaCamera extends Component{

  
  state = {
    file: "",
    riscaldamento:this.props.location.state.riscaldamento,
    aria_condizionata:this.props.location.state.aria_condizionata,
    servizio:this.props.location.state.servizio_in_camera,
    nome:this.props.location.state.nome,
    descrizione:this.props.location.state.descrizione,
    id_camera:this.props.location.state.id_camera,
    prezzo:this.props.location.state.prezzo,
    numero_ospiti:this.props.location.state.numero_ospiti,
  };

  async componentDidMount(){ 
    try{
      let id = AutenticazioneConn.getCurrentUser().id
    console.log(this.state)
    
    }
    
    catch(e){}
    }


 
   handlerChange = async (event) => { //funzione che serve per gestire il bottone di input del file
    let files = event.target.files; 
    let checkFiles=false;  //variabile che serve per verificare la correttezza del formato delle immagini, verrà posta a true
                           //se non sono del tipo richiesto
     for await (let file of files){
         let filename=file.name.split(".").pop(); //funzione di JS che permette di dividere una stringa a partire da
                                                   //un carattere definito, pop() serve per eliminare una parte della stringa
         let filenamee = filename.toLowerCase()
          if(filenamee !== 'png' && filenamee !== 'jpg' && filenamee !== 'jpeg'){ //se le immagini non sono del formato corretto
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


 modificaCamera = async (values) => { 
  try {
    let obj = {...values}
    obj.aria_condizionata=this.state.aria_condizionata
    obj.servizio=this.state.servizio
    obj.riscaldamento=this.state.riscaldamento
    obj.id_camera=this.state.id_camera
    console.log(obj)
    let response = await StrutturaConn.modificaCamera(obj);
    let dati = new FormData();  //oggetto gestito da multer per salvare le immagini, array formato da coppia chiave valore
    dati.append("immagini", this.state.file[0])
    dati.append("id", this.state.id_camera); // in FormData salviamo tutte le immagini, ciascuna con la chiave "immagini"
                                                 // memorizzando una sola volta l'id della struttura
   console.log(dati.get("id"))
  console.log(dati.get("immagini"))
  await toast(
    `Modifica effettuata`
  );
 let risposta = await StrutturaConn.aggiungiImmaginiCamera(dati);
     
    } catch (e) {
      console.log(e);
    }
}



    render() {
    return(
            <Formik
           // validationSchema={schema} //Si definisce il controllo degli errori sullo schema yup per essere verificato
            //onSubmit={async (values) => {
              // this.modificaCamera(values)}}
                initialValues={{  //deve contenere gli stessi nomi dei campi "name" e "value"
                riscaldamento:this.state.riscaldamento,
                aria_condizionata:this.state.aria_condizionata,
                servizio:this.state.servizio_in_camera,
                nome:this.state.nome,
                descrizione:this.state.descrizione,
                prezzo:this.state.prezzo,
                numero_ospiti:this.state.numero_ospiti,  
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
          <Card.Header>Modifica Camera</Card.Header>
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
                {this.state.riscaldamento == 1 ?
                  <Form.Check onChange={this.handleCheckRiscaldamenti} defaultChecked={true} className="filtersCheck" type="checkbox" id="riscaldamento" label="Riscaldamento" />
                  : <Form.Check onChange={this.handleCheckRiscaldamenti} defaultChecked={false} className="filtersCheck" type="checkbox" id="riscaldamento" label="Riscaldamento" />
                } 
                {this.state.aria_condizionata == 1 ?
                    <Form.Check onChange={this.handleCheckAria} defaultChecked={true} className="filtersCheck" type="checkbox" id="aria_condizionata" label="Aria condizionata" />
                   : <Form.Check onChange={this.handleCheckAria} defaultChecked={false} className="filtersCheck" type="checkbox" id="aria_condizionata" label="Aria condizionata" />
                }
                {this.state.servizio == 1 ?
                <Form.Check onChange={this.handleCheckServizio} defaultChecked={true} className="filtersCheck" type="checkbox" id="servizio" label="Servizio in camera" />
               : <Form.Check onChange={this.handleCheckServizio} defaultChecked={false} className="filtersCheck" type="checkbox" id="servizio" label="Servizio in camera" />
    }
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
              <Button onClick={(event)=>{this.modificaCamera(values);
                                          event.preventDefault();}} variant="dark" type="submit" >
Conferma
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
