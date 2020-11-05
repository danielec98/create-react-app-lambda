import React from 'react';
import {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import RicercaConn from "../connessioni/RicercaConn";
import moment from 'moment';
import '../css/Ricerca.css';
import Image from 'react-bootstrap/Image';
import { format } from 'date-fns';




export default class home extends Component {
     state={
       strutture: [],
       camere:[],
       struttura:[],
       numero_ospiti : 1,
       citta:"",
       tipologia:1,
       check_in: moment(),
       check_out: moment(),
       ricerca_strutture:false,
       wifi:0,
       parcheggio:0,
       focused: false,
       piscina:0,
       riscaldamenti:0,
       aria_condizionata:0,
       servizio:0,
       ricerca_camere:false,
     };

     
  handleChangeFiltri=(event)=>{
    event.preventDefault();
    if(event.target.value==="B&B"){
    this.setState({tipologia:1})}
    else {this.setState({tipologia:0})
  }
  this.setState({
    strutture:[],ricerca_strutture:false,camere:[],ricerca_camere:false
  })

}

  handleChangeCitta=(event)=>{
    this.setState({
      citta:event.target.value
    });
  }
  handleSelect=(event)=>{
    console.log(this.state.numero_ospiti)
    this.setState({
      numero_ospiti: event.target.value,
    });
  }
  handleSubmit=async (event)=>{
    event.preventDefault();
    if (this.state.tipologia == 0) {
    try{
      let obj=this.state;
      console.log(obj)
    let response = await RicercaConn.search(obj) 
    console.log(response.data)
    this.setState({ricerca_strutture:true, strutture:response.data})}
    

  
  catch(e) {}}
  else { 
    try{
    let obj = this.state;
    let response2 = await RicercaConn.searchCamere(obj)
    this.setState({ricerca_camere:true, camere:response2.data, })}
    catch(e){}
  }
  }

  

    handleCheckWifi=(event)=>{
      if(event.target.checked){
        this.setState({wifi:1})
    }else{
       this.setState({wifi:0})
   }
    }

    handleCheckPiscina=(event)=>{
      if(event.target.checked){
        this.setState({piscina:1})
    }else{
       this.setState({piscina:0})
   }
    }

    handleCheckParcheggio=(event)=>{
      if(event.target.checked){
        this.setState({parcheggio:1})
    }else{
       this.setState({parcheggio:0})
   }
    }

    handleCheckAriaCondizionata=(event)=>{
      if(event.target.checked){
        this.setState({aria_condizionata:1})
    }else{
       this.setState({aria_condizionata:0})
   }
    }

    handleCheckRiscaldamenti=(event)=>{
      if(event.target.checked){
        this.setState({riscaldamenti:1})
    }else{
       this.setState({riscaldamenti:0})
   }
    }

    handleCheckServizio=(event)=>{
      if(event.target.checked){
        this.setState({servizio:1})
    }else{
       this.setState({servizio:0})
   }
    }

    controlloGiorni=()=>{
      const errore = document.getElementById("err");
        if(this.state.check_out.diff(this.state.check_in, "days") + 1 > 28){
          errore.removeAttribute("hidden");
        }else{
          errore.setAttribute("hidden","true");
        }
      }
      

    render(){
     
    return (
  <div className="homeform">
    <Form onSubmit={this.handleSubmit}>
    <Card className="homeCard">
  <Card.Body>
    <Form.Row>
      <Col xs={5}>
    <Form.Group className="fix" >
    <label> Città:</label>
      <Form.Control required type="text" placeholder="Città" onChange={this.handleChangeCitta}/>
      <Form.Text className="text-muted">
      </Form.Text>
    </Form.Group>
    </Col>

    <Col xs={3}>
    <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Tipo Struttura</Form.Label>
    <Form.Control as="select" defaultValue="B&B" onChange={this.handleChangeFiltri}>
      <option value="B&B">B&B</option>
      <option value="Casa Vacanza">Casa Vacanza</option>
    </Form.Control>
  </Form.Group>
  </Col>

  <Col>
  <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>N. Ospiti</Form.Label>
    <Form.Control as="select" onChange={this.handleSelect}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>

    </Form.Control>
  </Form.Group>
  </Col>

  <DateRangePicker
                        startDate={this.state.check_in}
                        startDateId="your_unique_start_date_id"
                        endDate={this.state.check_out}
                        endDateId="your_unique_end_date_id"
                        onDatesChange={async ({ startDate, endDate }) => {
                          await this.setState({
                            check_in: startDate,
                            check_out: endDate,
                          });
                          if (this.state.check_out !== null) {
                            this.controlloGiorni()
                            }
                        
                      }}
                        focusedInput={this.state.focusedInput}
                        onFocusChange={(focusedInput) =>
                          this.setState({ focusedInput })
                        }
                        required
 >
 </DateRangePicker>
 

    </Form.Row>

    
    
    
    <Form.Group controlId="formBasicCheckbox">
      <Form.Row>
    <Form.Check onChange={this.handleCheckWifi} type="checkbox" id="wifi" label="Wifi"  />
    <Form.Check onChange={this.handleCheckParcheggio} type="checkbox" id="parcheggio" label="Parcheggio" />
    <Form.Check onChange={this.handleCheckPiscina} type="checkbox" id="piscina" label="Piscina" />
    </Form.Row>
    </Form.Group>
                     

    {this.state.tipologia == true ? 
    <Form.Group controlId="formBasicCheckbox" onChange={this.handleCheck}>
      <Form.Row>
    <Form.Check onChange={this.handleCheckServizio} type="checkbox" id="servizio" label="Servizio in camera" />
    <Form.Check onChange={this.handleCheckRiscaldamenti} type="checkbox" id="riscaldamenti" label="Riscaldamenti" />
    <Form.Check onChange={this.handleCheckAriaCondizionata} type="checkbox" id="aria_condizionata" label="Aria Condizionata" />
    </Form.Row>
    </Form.Group>
    : null}
      
      <p align="center" id="err" hidden style={{ color: "red" }}>
                        Non puoi prenotare per più di 28 giorni!
                      </p>
    <div className="btnAlign">
    <Button variant="dark" type="submit" id="submit">
      Ricerca
    </Button> 
    </div>
 
  </Card.Body>
</Card>


{this.state.ricerca_strutture==true ?
<div>
{this.state.strutture.length>0 ?
this.state.strutture.map((struttura,index)=>
  <div className="ricercadiv"> 
  <a onClick={() => {                        
                               const data = {
                                 check_in: this.state.check_in.format(
                                   "YYYY-MM-DD"
                                 ),
                                 check_out: this.state.check_out.format(
                                   "YYYY-MM-DD"
                                 ),
                                 permanenza_giorni:
                                 this.state.check_out.diff(
                                   this.state.check_in,
                                   "days"
                                 ) + 1,
                                 struttura: struttura,
                               };
                               this.props.history.push({
                                 pathname: "/visualizzaStruttura",
                                 state: {    
                                   strutture: this.state.strutture,
                                   check_in: data.check_in,
                                   check_out: data.check_out,
                                   struttura: data.struttura,
                                   permanenza_giorni: data.permanenza_giorni,
                                   id_struttura:data.struttura.id
                                 },
                               });
                             }} > 
          <Card className="RisultatiCard" key={index}>
          <Card.Header>{struttura.nome}</Card.Header>
        <Card.Body >
          <Row className="risultatiRow">
            <Col className="imgCol">
            
          <Image
          rounded 
          width="300"
          height="200"
          src={struttura.path
          ? "http://localhost:3006/immagini/" + struttura.path
          : null
      }
          />
          </Col>
          <Col className="risultatiCol">
          <p className="Descrizione">{struttura.descrizione}</p>
          <h1 align="right">{struttura.prezzo + "€"}</h1>
          </Col>
          </Row>
        </Card.Body>   
        </Card>   </a>
        </div>) : 
          <div className="ricercadiv"> 
        
          
          <h1 align="center">Siamo spiacenti! <br></br>
            Nessun risultato trovato.</h1>
          
         
        
        </div>}
        </div> 
        :null}
        
{this.state.ricerca_camere==true ?
<div>
        { this.state.camere.length>0 ?
        this.state.camere.map((camera, index) => 
        <div className="ricercadiv"> 
        <a onClick={() => {                        
                               const data = {
                                 check_in: this.state.check_in.format(
                                   "YYYY-MM-DD"
                                 ),
                                 check_out: this.state.check_out.format(
                                   "YYYY-MM-DD"
                                 ),
                                 permanenza_giorni:
                                 this.state.check_out.diff(
                                   this.state.check_in,
                                   "days"
                                 ) + 1,
                                 camera:camera,
                               };
                               this.props.history.push({
                                 pathname: "/visualizzaStruttura",
                                 state: {    
                                   check_in: data.check_in,
                                   check_out: data.check_out,
                                   camera: data.camera,
                                   permanenza_giorni: data.permanenza_giorni,
                                   id_struttura:data.camera.id
                                 },
                               });
                             }}>
        <Card className="RisultatiCard" key={index}>
        <Card.Header>{camera.nome_s + ' - ' + camera.nome}</Card.Header>
      <Card.Body >
        <Row className="risultatiRow">
          <Col className="imgCol">
          
        <Image
        rounded 
        width="300"
        height="200"
        src={"http://localhost:3006/immagini/" + camera.foto}
        />
        </Col>
        <Col className="risultatiCol">
        <p className="Descrizione">{camera.descrizione}</p>
        <h1 align="right">{camera.prezzo + "€"}</h1>
        </Col>
        </Row>
      </Card.Body>   
      </Card> </a>
      </div>)
      :  <div className="ricercadiv"> 
        
          
      <h1 align="center">Siamo spiacenti! <br></br>
        Nessun risultato trovato.</h1>
      
     
    
    </div>}
    </div>
      : null}
    </Form>
  </div>
  
  
      
    );
    };
  
  };