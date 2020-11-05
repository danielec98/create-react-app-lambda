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

export default class modificaStruttura extends Component{

    componentDidMount(){
        this.state.tipologia == 1 ? 
        this.setState({disabled:true})
        : this.setState({disabled:false})

        console.log(this.state)
    }
  
    
  state = {
    file: "",
      wifi:this.props.location.state.wifi,
      piscina:this.props.location.state.piscina,
      parcheggio:this.props.location.state.parcheggio,
      nome:this.props.location.state.nome,
      descrizione:this.props.location.state.descrizione,
      citta:this.props.location.state.citta,
      cap:this.props.location.state.cap,
      indirizzo:this.props.location.state.indirizzo,
      id_struttura:this.props.location.state.id_struttura,
      tassa:this.props.location.state.tassa,
      prezzo:this.props.location.state.prezzo,
      tipologia:this.props.location.state.tipologia,
      numero_ospiti:this.props.location.state.numero_ospiti,
      disabled:false,
  };


  handlebb=(event)=>{
    this.setState({
      bb:event.target.value,
    })
    console.log(this.state.bb)
  }

  handleCheckPiscina=(event)=>{
    if(event.target.checked){
      this.setState({piscina:1})
  }else{
     this.setState({piscina:0})
  }
  }
  
  handleCheckWifi=(event)=>{
    if(event.target.checked){
      this.setState({wifi:1})
  }else{
     this.setState({wifi:0})
  }
  }
  
  handleCheckParcheggio=(event)=>{
    if(event.target.checked){
      this.setState({parcheggio:1})
  }else{
     this.setState({parcheggio:0})
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





registraStruttura = async (values) => { //funzione di submitting
  try {
    let obj = {...values}
    obj.id_struttura = this.state.id_struttura
    obj.wifi=this.state.wifi
    obj.piscina=this.state.piscina
    obj.parcheggio=this.state.parcheggio
    delete obj.tipologia
      let response = await StrutturaConn.modificaStruttura(obj); //variabile nella quale salviamo la risposta del server quando
                                                                 // richiamiamo axios nel file StrutturaConn
      console.log(obj)
      console.log(this.state)
      
      let dati = new FormData();  //oggetto gestito da multer per salvare le immagini, array formato da coppia chiave valore
      dati.append("id", obj.id_struttura)
      for (let i = 0; i < this.state.file.length; i++) { 
        dati.append("immagini", this.state.file[i])
      }
       // in FormData salviamo tutte le immagini, ciascuna con la chiave "immagini"
                                                     // memorizzando una sola volta l'id della struttura
      console.log(dati.get("id"))
      console.log(dati.get("immagini"))
      
      let cancella = await StrutturaConn.cancella(dati);
      let risposta = await StrutturaConn.modificaFoto(dati); //oggetto per memorizzare le immagini
      await toast(
        `Modifica effettuata`
      )
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
                nome:this.state.nome,
                citta:this.state.citta,
                descrizione:this.state.descrizione,
                cap:this.state.cap,
                indirizzo:this.state.indirizzo,
                prezzo:this.state.prezzo,
                numero_ospiti:this.state.numero_ospiti,
                wifi:this.state.wifi,
                parcheggio:this.state.parcheggio,
                piscina:this.state.piscina,
                tassa:this.state.tassa,
                tipologia:this.state.tipologia
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
          <Card.Header>Modifica Struttura</Card.Header>
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
                  <Form.Group controlId="tipo" className="capSize">
                  <Form.Label>Tipo:</Form.Label>
                  <Form.Control   
                            disabled="true"                        
                            as="select"
                            name="tipologia"
                            value={values.tipologia}
                            onChange={handleChange}
                            onMouseUp={this.handlebb}
                            onBlur={handleBlur}
                            isInvalid={
                              touched.tipologia && errors.tipologia
                                ? "error"
                                : null
                            }
                          >
                            {this.state.tipologia == 1 ? 
                            <option>B&B</option>: <option>Casa Vacanza</option>}
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
                            as="select"
                            disabled={this.state.disabled}
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
                        {this.state.tipologia == 1 ? <option></option> :
                            <optgroup>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option> </optgroup>
                        }    
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
                  disabled={this.state.disabled}
                  name="prezzo"
                  type="text"
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
                  {this.state.wifi == 1 ?
                  <Form.Check onChange={this.handleCheckWifi} defaultChecked={true} className="filtersCheck" type="checkbox" id="wifi" label="Wi-Fi" />
                  :
                  <Form.Check onChange={this.handleCheckWifi} defaultChecked={false} className="filtersCheck" type="checkbox" id="wifi" label="Wi-Fi" />
                }
                {this.state.parcheggio == 1 ?
                  <Form.Check onChange={this.handleCheckParcheggio} defaultChecked={true} className="filtersCheck" type="checkbox" id="parcheggio" label="Parcheggio" />
                  :
                  <Form.Check onChange={this.handleCheckParcheggio} defaultChecked={false} className="filtersCheck" type="checkbox" id="parcheggio" label="Parcheggio" />
                }
                {this.state.piscina == 1 ?
                  <Form.Check onChange={this.handleCheckPiscina} defaultChecked={true} className="filtersCheck" type="checkbox" id="piscina" label="Piscina" />
                  :
                  <Form.Check onChange={this.handleCheckPiscina} defaultChecked={false} className="filtersCheck" type="checkbox" id="piscina" label="Piscina" />
                }
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
