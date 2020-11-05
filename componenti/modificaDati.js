import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import { Formik } from "formik";
import Card from "react-bootstrap/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Component} from 'react';
import AutenticazioneConn from "../connessioni/AutenticazioneConn"
import '../css/register.css';
import AreaPersonaleConn from "../connessioni/AreaPersonaleConn";
import StrutturaConn from "../connessioni/StrutturaConn";
import Prenotazione from "./prenotazione";


const validate_birthday = yup.string().required("Inserisci una data.")
  .max(new Date(), "non può essere inserita una data maggiore di quella odierna")
  .test({
    name: "DOB",
    message: "Devi aver compiuto almeno 18 anni!",
    test: (value) => {
      let now = Date.now();
      let date = Date.parse(value);
      return new Date(now - date).getUTCFullYear() - 1970 >= 18;
    },
  });



const schema = yup.object({
    nome:yup.string().required("Inserisci un nome."),
    cognome: yup.string().required("Inserisci un cognome."),
    data_di_nascita: validate_birthday,
    citta: yup.string().required("Inserisci una città."),
    indirizzo: yup.string().required("Inserisci un indirizzo."),
    telefono: yup.string().required("Inserisci il tuo numero di telefono.").matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, "Deve contenere 10 cifre."),
    cap: yup.string().required("Inserisci il CAP").matches(/^[0-9]{5,5}$/,"Il CAP deve contenere 5 cifre."),
    tipo:yup.boolean(),
    partita_iva: yup.string().when('tipo', {
                                    is:true ,
                                    then: yup.string().required("Inserisci la tua partita IVA")
                              .matches(/^[0-9]{11}$/, "La partita IVA deve essere di 11 cifre."),  
    })
  });

export default class ModificaDati extends Component {
  constructor(props){
    super(props)
    

  }

    state = {
      tipo:false,
      utente:[]
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

    handleSubmit = async (obj) => {
      try {
         let response = await AreaPersonaleConn.modificaDati(obj);
        await toast(
          `Ciao ` + obj.nome + ` ` + obj.cognome + `, modifica avvenuta con successo`
        );
      } catch (e) {
        toast(e);
      }
    };

  

    render() {
        return(
            <Formik
            validationSchema={schema}
            enableReinitialize
             //Si definisce il controllo degli errori sullo schema yup per essere verificato
            onSubmit={async (values) => {
               this.handleSubmit(values)}}
                initialValues={{ 
                nome:this.state.utente.nome,
                cognome:this.state.utente.cognome,
                citta:this.state.utente.citta,
                cap:this.state.utente.cap,
                indirizzo:this.state.utente.indirizzo,
                telefono:this.state.utente.telefono,
                data_di_nascita:this.state.utente.data_di_nascita,
                partita_iva:this.state.utente.partita_iva,
                id: this.state.utente.id,
                tipo: this.state.utente.tipo,

           }}
            >

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
        <Card className="RegisterCard">
          <Card.Header>Modifica dati</Card.Header>
            <Card.Body>
            <Form
            noValidate
            id="formregistrazione"
            onSubmit={handleSubmit}
          >
              <Form.Row >
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
                  <Form.Group controlId="formBasicCognome">
                  <label>Cognome</label>
                  <Form.Control
                  name="cognome"
                  type="text"
                  placeholder="Cognome"
                  value={values.cognome}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={
                    touched.cognome && errors.cognome ? "error" : null
                  }
                />
                 <Form.Control.Feedback
                 className="FeedBack"
                 type="invalid"
                >
                    {errors.cognome}
                </Form.Control.Feedback>
                  </Form.Group>
                  </Form.Row>

                  <Form.Row>
                  <Form.Group controlId="formBasicTelefono">
                  <label>Telefono</label>
                  <Form.Control
                  name="telefono"
                  type="text"
                  placeholder="Telefono"
                  value={values.telefono}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={
                    touched.telefono && errors.telefono ? "error" : null
                  }
                />
                <Form.Control.Feedback
                 className="FeedBack"
                 type="invalid"
                >
                    {errors.telefono}
                </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="formData" controlId="formBasicData">
                  <label>Data di nascita</label>
                  <Form.Control
                  name="data_di_nascita"
                  type="date"
                  placeholder="Data di nascita"
                  value={values.data_di_nascita}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={
                    touched.data_di_nascita && errors.data_di_nascita ? "error" : null
                  }
                /> 
                <Form.Control.Feedback
                 className="FeedBack"
                 type="invalid"
                >
                    {errors.data_di_nascita}
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

                  <Form.Group controlId="formBasicCitta">
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
                  </Form.Row>

                  <Form.Group className="fix" controlId="formBasicIndirizzo">
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

                  
                  
                {this.state.utente.tipo === true ?
                <Form.Group controlId="formBasicPartitaIVA">
                <label>Partita IVA</label>
                <Form.Control className="FormPartitaIVA"
                name="partita_iva"
                type="text"
                placeholder="Partita IVA"
                value={values.partita_iva}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={
                  touched.partita_iva && errors.partita_iva ? "error" : null
                }
              />
              <Form.Control.Feedback
                 className="FeedBack"
                 type="invalid"
                >
                    {errors.partita_iva}
                </Form.Control.Feedback>
                </Form.Group> : null }
                
            <div className="btnAlignReg">
              <Button variant="dark" type="submit">
                Conferma
              </Button>
            </div>            
                </Form>
                </Card.Body>
                </Card>
                </div>
          )}
</Formik>
        );
    };
};