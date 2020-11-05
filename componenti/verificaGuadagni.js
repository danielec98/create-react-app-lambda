import React from 'react';
import {Component} from 'react';
import Button from 'react-bootstrap/Button';
import { Nav } from 'react-bootstrap';
import { render } from '@testing-library/react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Form'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import '../css/login.css';
import { toast } from 'react-toastify';
import AutenticazioneConn from "../connessioni/AutenticazioneConn"
import prenotazioneConn from "../connessioni/prenotazioneConn"

export default class verificaGuadagni extends Component {
     state = {
       guadagni:"",
       prezzo: "",
       tasse:""
    }
    async componentDidMount(){ 
       
          let id =AutenticazioneConn.getCurrentUser().id
          console.log(id)
        const response = await prenotazioneConn.getGuadagni(id);
        this.setState({guadagni: response.data});
        console.log(response.data)
        let guadagni=response.data[0].guadagni;
        let tassa=response.data[0].tassa;
        this.setState({prezzo:guadagni,tasse:tassa})
   
        }
        
    
    render(){
    return (
  <div className="LoginForm">
    <Card className="LoginCard">
  <Card.Header>Verifica Guadagni</Card.Header>
  <Card.Body>
  <p className="FontP">
                       
                         TOTALE GUADAGNI :  {this.state.prezzo + this.state.tasse }    €   <br></br>
              
                    </p>
  </Card.Body>
</Card>
  </div>
  
  
      
    );
    };
  
  };