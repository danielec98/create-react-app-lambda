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
import AutenticazioneConn from "../connessioni/AutenticazioneConn"
import '../css/login.css';
import { toast } from 'react-toastify';



export default class Login extends Component {
     state = {
        email:"",
        password:"",
    }

    handleLogin = async (event) => {
      event.preventDefault();
      let obj=this.state;
      let response = await AutenticazioneConn.login(obj);
      localStorage.setItem("utente", JSON.stringify(response.data));
      this.props.history.push('/home')
      window.location.reload();
    }

    handleChangeEmail = (event) => {
        this.setState({
            email:event.target.value
        });
    }

    handleChangePassword = (event) => {
        this.setState({
            password:event.target.value
        });
    }

    render(){
    return (
  <div className="LoginForm">
    <Card className="LoginCard">
  <Card.Header>Login</Card.Header>
  <Card.Body>
    <Form onSubmit={this.handleLogin}>
    <Form.Group className="fix" controlId="formBasicEmail">
    <label className="EmailLabel"> Email</label>
      <Form.Control required type="email" placeholder="Email" onChange={this.handleChangeEmail} onBlur={this.test}/>
      <Form.Text className="text-muted">
      </Form.Text>
    </Form.Group>
  
    <Form.Group className="fix" controlId="formBasicPassword">
    <label>Password</label>
      <Form.Control required type="password" placeholder="Password" onChange={this.handleChangePassword}/>
    </Form.Group>
    <div className="btnLogin">
    <Button variant="dark" type="submit">
      Accedi
    </Button> 
    </div>
  </Form>
  <div className="LoginLinks">
<br></br>
  Non hai ancora un account? <Link className="LogLink" to="/register">Registrati </Link> 
  </div>
  </Card.Body>
</Card>
  </div>
  
  
      
    );
    };
  
  };