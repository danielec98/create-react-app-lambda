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
import { ToastContainer, toast } from "react-toastify";
import AreaPersonaleConn from '../connessioni/AreaPersonaleConn';
import AutenticazioneConn from '../connessioni/AutenticazioneConn';
import crypto from 'crypto';



export default class ModificaPassword extends Component {
  constructor(props){
    super(props)
    
  }   

  async componentDidMount(){
    let id=AutenticazioneConn.getCurrentUser().id;
    let risposta = await AreaPersonaleConn.fetchUtente(id);
    this.setState({password:risposta.data.password})
  }
  
  
  state = {
        old_password:"",
        new_password:"",
        id: AutenticazioneConn.getCurrentUser().id,
        password:"",
    }


    checkPassword=()=>{
      const errore = document.getElementById("err");
      const conferma = document.getElementById("confirm")
      let encPass = crypto.createHash("sha512").update(this.state.old_password).digest('hex');
      if(encPass !== this.state.password) {
        errore.removeAttribute("hidden");
        conferma.setAttribute("hidden", "true")
        }else{
          errore.setAttribute("hidden","true");
          conferma.removeAttribute("hidden")
        }
      }


    handleChangeOldPassword = (event) => {
        this.setState({
            old_password:event.target.value


        });
        console.log(this.state)
    }

    handleChangeNewPassword = (event) => {
        this.setState({
            new_password:event.target.value
        });
    }

    handleSubmit=async (event)=>{
      event.preventDefault();
     this.checkPassword();
      let obj=this.state;
      let response = await AreaPersonaleConn.modificaPassword(obj);
      toast('Password modificata');
      
      
    }


    render(){
    return (
  <div className="LoginForm">
    <Card className="LoginCard">
  <Card.Header>Modifica Password</Card.Header>
  <Card.Body>
    <Form onSubmit={this.handleSubmit}>
    <Form.Group className="fix" controlId="formBasicOldPassword">
    <label> Password attuale</label>
      <Form.Control required type="password" placeholder="Password Attuale" onChange={this.handleChangeOldPassword}/>
      <Form.Text className="text-muted">
      </Form.Text>
    </Form.Group>
  
    <Form.Group className="fix" controlId="formBasicNewPassword">
    <label>Nuova Password</label>
      <Form.Control required type="password" placeholder="Nuova Password" onChange={this.handleChangeNewPassword}/>
    </Form.Group>
    <div className="btnAlign">
    <Button variant="dark" type="submit">
      Conferma
    </Button> 
    <br></br><br></br>
    <p id="err" hidden style={{ color: "red" }}>La password inserita non è corretta</p>
    <p id="confirm" hidden style={{ color: "black" }}>La password è stata modificata correttamente</p>
    </div>
  </Form>
  </Card.Body>
</Card>
  </div>
  
  
      
    );
    };
  
  };