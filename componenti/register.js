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
    email: yup.string().email("Formato email non valido").required("Inserisci la tua email."),
    citta: yup.string().required("Inserisci una città."),
    indirizzo: yup.string().required("Inserisci un indirizzo."),
    telefono: yup.string().required("Inserisci il tuo numero di telefono.").matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, "Deve contenere 10 cifre."),
    cap: yup.string().required("Inserisci il CAP").matches(/^[0-9]{5,5}$/,"Il CAP deve contenere 5 cifre."),
    password: yup.string().required("Inserisci una password.").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\.\-\_!@#\$%\^&\*])(?=.{8,})/, "Deve contenere 8 caratteri, una maiuscola, una minuscola, un numero e un carattere speciale."),
    tipo: yup.string().required("Scegli il tipo di registrazione."),
    partita_iva: yup.string().when('tipo', {
                              is:'true',
                              then: yup.string().required("Inserisci la tua partita IVA")
                              .matches(/^[0-9]{11}$/, "La partita IVA deve essere di 11 cifre."),
    })
  });

export default class Register extends Component {
    constructor (props) {
        super(props)
        
    }

    state = {
      tipo:false
    }

    handleSubmit = async (values) => {
     let obj = {...values}
     console.log(obj)
      if(obj.tipo=="false"){
        obj.partita_iva=0
      }
      try {
         let response = await AutenticazioneConn.register(obj);
        await toast(
          `Ciao ` + values.nome + ` ` + values.cognome + `, registrazione avvenuta con successo`
        );
      } catch (e) {
        toast(e);
      }
    };

    handleSelect = (event) => {
      event.preventDefault();
      this.setState({tipo:event.target.value})
      console.log(this.state.tipo)
    }

    render() {
        return(
            <Formik
            validationSchema={schema} //Si definisce il controllo degli errori sullo schema yup per essere verificato
            onSubmit={async (values) => {
               this.handleSubmit(values)}}
                initialValues={{  //deve contenere gli stessi nomi dei campi "name" e "value"
                nome:"",
                cognome:"",
                citta:"",
                cap:"",
                indirizzo:"",
                telefono:"",
                email:"",
                password:"",
                data_di_nascita:"",
                tipo:false,
                partita_iva:"",
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
          <Card.Header>Registrazione</Card.Header>
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

                  <Form.Group className="fix" controlId="formBasicEmail">
                  <label>Email</label>
                  <Form.Control
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={
                    touched.email && errors.email ? "error" : null
                  }
                />
                  <Form.Control.Feedback
                 className="FeedBack"
                 type="invalid"
                >
                    {errors.email}
                </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="fix" controlId="formBasicPassword">
                  <label>Password</label>
                  <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={
                    touched.password && errors.password ? "error" : null
                  }
                />
                <Form.Control.Feedback
                 className="FeedBack"
                 type="invalid"
                >
                    {errors.password}
                </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="tipo" className="Tipo">
                  <Form.Label>Registrazione come:</Form.Label>
                  <Form.Control                           
                            as="select"
                            name="tipo"
                            value={values.tipo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onMouseUp={this.handleSelect}
                            isInvalid={
                              touched.tipo && errors.tipo
                                ? "error"
                                : null
                            }
                          >
                            <option value="false">Cliente</option>
                            <option value="true">Gestore</option>
                          </Form.Control>
                          <Form.Control.Feedback
                 className="FeedBack"
                 type="invalid"
                >
                    {errors.tipo}
                </Form.Control.Feedback>
                </Form.Group>

                {this.state.tipo == "true" ?
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
                </Form.Group>


                : null }
                
            <div className="btnAlignReg">
              <Button variant="dark" type="submit">
                Registrati
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