import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Component} from 'react';
import '../css/prenotazione.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import axios from "axios"
import AutenticazioneConn from '../connessioni/AutenticazioneConn'
import prenotazioneConn from "../connessioni/prenotazioneConn";

export default class Prenotazione extends Component {
    
    state={
        posti_letto:this.props.location.state.posti_letto,
        check_in:this.props.location.state.check_in,
        check_out:this.props.location.state.check_out,
        pagamento:true,
        tassa:this.props.location.state.tassa,
        paganti:this.props.location.state.posti_letto,
        tassa_totale:(this.props.location.state.tassa * this.props.location.state.posti_letto),
        id_struttura: this.props.location.state.id_struttura,
        id_camera: this.props.location.state.id_camera,
        id_cliente: AutenticazioneConn.getCurrentUser().id,
        prezzo:this.props.location.state.prezzo,
        confermata:0,
        disablebutton:false,
        prenoteffettuata:true

    }


    componentDidMount(){
        
       
        console.log(this.state)
    }
    handleOsp=(event)=>{
        if(event.target.checked){
             this.setState({paganti: this.state.paganti - 1 })
             this.setState({tassa_totale:this.state.tassa * (this.state.paganti - 1)})
        }
        else{
            this.setState({paganti: this.state.paganti + 1})
            this.setState({tassa_totale:this.state.tassa * (this.state.paganti + 1)})
        }           
    }

    handleForm = () => {
        var form = [];
        for (var i = 0; i < this.state.posti_letto; i++) {
            let n = i+1;
        form.push(
            <Form.Check type="checkbox" id ={"ospiti"+ n}label={"Ospite "+ n + " esente da tasse di soggiorno"}onChange={this.handleOsp}/>
      )
        }
        return form;
      }

    handleCheck=(event)=>{
        if(event.target.checked)
        this.setState({
            pagamento:false
        })
       else{
           this.setState({
               pagamento: true
           })
           
       }
       console.log(this.state.pagamento)

    }

    handleClick=async(event)=>{
        this.setState({
            disablebutton:true,
            prenoteffettuata:false
        })
        event.preventDefault();
        let obj = this.state
       if(this.state.id_camera !== null){
        let response = await prenotazioneConn.prenotaCamera(obj);
        }
        else {
            let response = await prenotazioneConn.prenotaStruttura(obj);

        }
        
    }
           
      
         
    

render(){
    return(
        <div>
                <div hidden={this.state.disablebutton} className="InserisciStruttura">
               <ToastContainer />
            <Card className="inserisciStrutturaCard">
            <Card.Header>Prenotazione</Card.Header>
                <Card.Body>
                    
                    <Form >
                    <Form.Row >
                    <Form.Group className="fix" controlId="formBasicNome">
                    <label className="NomeLabel"> Nome</label>
                    <Form.Control required type="nome" disabled placeholder="Nome" value={AutenticazioneConn.getCurrentUser().nome}></Form.Control>
                    <Form.Text className="text-muted"/>
                    </Form.Group>

                    <Form.Group className="fix" controlId="formBasicCognome">
                    <label className="CognomeLabel"> Cognome</label>
                    <Form.Control required type="cognome" value={AutenticazioneConn.getCurrentUser().cognome} disabled placeholder="Cognome" />
                    <Form.Text className="text-muted"/>
                    </Form.Group>

                    <Form.Group className="formData" controlId="formBasicData">
                  <label>Data di nascita</label>
                  <Form.Control
                  disabled
                  value={AutenticazioneConn.getCurrentUser().data_di_nascita}
                  required type="date"
                  placeholder=""/>
                  </Form.Group>
                  </Form.Row>

                  <Form.Row>
                  <Form.Group className="formData" controlId="formBasicData">
                  <label>Check-in</label>
                  <Form.Control
                  disabled
                  value={this.state.check_in}
                  required type="date"
                  placeholder=""/>
                  </Form.Group>

                  <Form.Group className="formData" controlId="formBasicData">
                  <label>Check-out</label>
                  <Form.Control
                  disabled
                  value={this.state.check_out}
                  required type="date"
                  placeholder=""/>
                  </Form.Group>
                  </Form.Row>

                    <Form.Group className="fix" controlId="formBasicOspiti">
                    <label className="OspitiLabel">Ospiti</label>
                    <Form.Control required type="ospiti" placeholder="" disabled value={this.state.posti_letto}/>
                    <Form.Text className="text-muted"/>
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicCheckbox">
                    {this.handleForm()}<br></br>
                    <p>N.B.
                        Sono esenti da tasse di soggiorno tutti coloro che sono:
                        i residenti nel comune
                        i bambini di età inferiore a 12 anni
                        gli studenti universitari fuori sede
                        i disabili e gli accompagnatori
                        i militari e le forze di polizia
                        autisti di autobus, treni e accompagnatori turistici
                        i malati in strutture sanitarie e i familiari accompagnatori
                        i residenti negli ostelli della gioventù.
                    </p>

                    <Form.Check type="checkbox"  label="Paga in struttura" onChange={this.handleCheck}/>
                    </Form.Group>

                    <p className="FontP">
                         PREZZO: {this.state.prezzo}    <br></br>
                         TOTALE TASSA :  { this.state.tassa * this.state.paganti }    <br></br>
                         TOTALE DA PAGARE:  {this.state.prezzo + (this.state.tassa * this.state.paganti)} <br></br>
                    </p>
                    <div className="btn">
                    
                    <a disabled={this.state.disablebutton} onClick = {async () => {this.state.pagamento==true ?
                                this.props.history.push({
                                 pathname: "/pagamento",
                                 state:{
                                     check_in:this.state.check_in,
                                     check_out:this.state.check_out,
                                     id_camera:this.state.id_camera,
                                     id_cliente: this.state.id_cliente,
                                     id_struttura: this.state.id_struttura,
                                     prezzo_totale: this.state.prezzo + (this.state.tassa * this.state.paganti)
                                 }
                                }
                                 )
                                : toast('Prenotazione effettuata')
                                //this.props.history.push({
                                    //pathname: "/home"})
                                }}>
                    <Button  onClick={this.handleClick} disabled={this.state.disablebutton} variant="dark" type="submit" >
                         Prenota
                    </Button>
                    </a>
                    
                    </div>

                    </Form>
                </Card.Body>
             </Card>
        </div>
        <h1 hidden = {this.state.prenoteffettuata} align="center" >Prenotazione Effettuata!</h1> <br></br><br></br>
        <div hidden = {this.state.prenoteffettuata} className="btnAlignReg">
        <Button  href="/home" variant="dark" >
                         Torna alla home
                    </Button>
                    <Button  href="/" variant="dark">
                         Visualizza prenotazioni
                    </Button>
                    </div>
        </div>
       
    )

}
}