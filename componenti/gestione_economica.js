
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
import AutenticazioneConn from '../connessioni/AutenticazioneConn';
import StrutturaConn from '../connessioni/StrutturaConn';

/*const schema = yup.object({
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
    partita_iva: yup.string().required("Inserisci la tua partita IVA").matches(/^[0-9]{11}$/, "La partita IVA deve essere di 11 cifre."),
  });*/

export default class gestioneEconomica extends Component{
    state={
        datiQuestura:"",
        datiUfficio:"",
        Click:true,
        strutture:[],
        
    }

    async componentDidMount(){
      const id=AutenticazioneConn.getCurrentUser().id
      const response=await StrutturaConn.getStrutture(id);
      this.setState({
        strutture:response.data
      })
      console.log(this.state.strutture)
    }
    handleClick=()=>{
    this.setState({datiQuestura:true})
    this.setState({Click:false})

    }
    handleSubmit = async (values) => {
        let obj = {...values}
        try {
            
           await toast(
             `Le generalità di ` + values.nome + ` ` + values.cognome + ` sono state inviate`
           );
         } catch (e) {
           toast(e);
         }
    }


    render(){
    
        return (

            
            <div className="main">
                {this.state.Click == true ?
                <div className="Hidden">
            <h1 align="center">{'Gestione Economica e Legale'} </h1>
        <div className="funzioniGestore">
            <Button className="btnGestore" variant="dark" onClick={this.handleClick}>
                Invio dati Questura
            </Button>
            <Link to='/areaPersonaleGestore/gestioneEconomica/datiUfficio' >
            <Button  className="btnGestore" variant="dark" >
                Rendiconto trimestre 
            </Button>
            </Link>
            <Link to='/areaPersonaleGestore/gestioneEconomica/verificaGuadagni' >
            <Button  className="btnGestore" variant="dark" >
                Verifica Guadagni
            </Button>
            </Link>
           
        </div>
        </div>
       : null}
    
        {this.state.datiQuestura==true ?
        <Formik
            
            onSubmit={async (values) => {
               this.handleSubmit(values)}}
                initialValues={{  //deve contenere gli stessi nomi dei campi "name" e "value"
                nome:"",
                cognome:"",
                data_di_nascita:"",
                check_in:"",
                check_out:"",
                
           }}>
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
      <Card className="QuesturaCard">
        <Card.Header>Invio dati Questura</Card.Header>
          <Card.Body>
          <Form
          noValidate
          id="formregistrazione"
          onSubmit={handleSubmit}
        >
            <Form.Group controlId="tipo" >
                  <Form.Label>Struttura</Form.Label>
                  <Form.Control                           
                            as="select"
                            name="tipo"
                            value={values.nome_s}
                            onChange={handleChange}
                            onBlur={handleBlur}>
                            { this.state.strutture ?
        this.state.strutture.map((struttura, index) => 
                             <option key={index}>{struttura.nome}</option>)
        : null}
                            
                          </Form.Control>
                </Form.Group>
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
                <Form.Group className="formData" controlId="formBasicData">
                  <label>Check-in</label>
                  <Form.Control
                  name="check_in"
                  type="date"
                  placeholder="check_in"
                  value={values.check_in}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={
                    touched.check_in && errors.check_in ? "error" : null
                  }
                /> 
                <Form.Control.Feedback
                 className="FeedBack"
                 type="invalid"
                >
                    {errors.check_in}
                </Form.Control.Feedback>
                </Form.Group>
                  
                <Form.Group className="formData" controlId="formBasicData">
                  <label>Check-out</label>
                  <Form.Control
                  name="check_out"
                  type="date"
                  placeholder="check_out"
                  value={values.check_out}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={
                    touched.check_out && errors.check_out ? "error" : null
                  }
                /> 
                <Form.Control.Feedback
                 className="FeedBack"
                 type="invalid"
                >
                    {errors.check_out}
                </Form.Control.Feedback>
                </Form.Group>
                </Form.Row>
                <p align="center">Foto documento:</p>
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
                        <Button variant="dark" type="submit" >
                         Invia 
                        </Button >
                    </div>
                </Form>
                </Card.Body>
                </Card>
                </div>
          )}
        </Formik>
        : null}
        </div>
        )
    }
}