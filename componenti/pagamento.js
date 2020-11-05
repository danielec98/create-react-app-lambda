import React from 'react';
import {Component} from 'react';
import Button from 'react-bootstrap/Button';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Form from "react-bootstrap/Form";
import "../css/prenotazione.css"
import { ToastContainer, toast } from "react-toastify";
import prenotazioneConn from "../connessioni/prenotazioneConn"
import axios from "axios"

export default class pagamento extends Component{
    state={
        mese:"01",
        anno: "21",
        intestatario:"",
        numero_carta:"",
        cvv:"",
        id_prenotazione:1,
        id_cliente:this.props.location.state.id_cliente,
        check_in:this.props.location.state.check_in,
        check_out:this.props.location.state.check_out,
        id_struttura:this.props.location.state.id_struttura,
        id_camera:this.props.location.state.id_camera,
        prezzo:this.props.location.state.prezzo_totale
    }

    handleChangeMese=(event)=>{
        this.setState({
            mese:event.target.value
        })
        
        
    }
    handleChangenome=(event)=>{
        this.setState({
            intestatario:event.target.value

        })
    }
    handleChangenumero=(event)=>{
        this.setState({
            numero_carta:event.target.value

        })
    }
    handleChangecvv=(event)=>{
        this.setState({
            cvv:event.target.value

        })
    }
    handleChangeAnno=(event)=>{
        this.setState({
            anno:event.target.value,
            

        })
    }
    
    handleSubmit=async (event)=>{
      event.preventDefault()
      let obj = this.state;
      let _obj=this.state;
         try{
          let resp = await prenotazioneConn.getid(_obj);
          obj.id_prenotazione=resp.data[0].id
          console.log(resp.data)
          console.log(this.state)
      let response = await prenotazioneConn.pagamento(obj)
      this.props.history.push('/areaPersonaleUtente/gestionePrenotazioniUtente')
      }
      catch(e){}
    }
    


    render(){
      const id_prenotazione=this.state.id_prenotazione
        return(
            <div className="Pagamentodiv">
            <Card className="PagamentoCard">
          <Card.Header>Pagamento</Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>

            <Form.Group controlId="formBasicNome">
            <label> Intestatario</label>
              <Form.Control required type="intestatario" name="intestatario" placeholder="Intestatario"onChange={this.handleChangenome}/>
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicNumero">
            <label> Numero carta</label>
              <Form.Control required type="numero_carta" name="numero_carta" placeholder="Numero carta"onChange={this.handleChangenumero}/>
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>

            <Form.Row>

            <Form.Group controlId="formBasicCVV">
            <label>CVV</label>
              <Form.Control required type="CVV" name="CVV" placeholder="CVV"onChange={this.handleChangecvv}/>
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formGridState">
                        <Form.Label id="ricerca">Mese Scadenza</Form.Label>
                        <Form.Control
                        name ="mese"
                          as="select"
                          defaultValue="01"
                          onChange={this.handleChangeMese}
                        >
                          <option value="01">01</option>
                          <option value="02">02</option>
                          <option value="03">03</option>
                          <option value="04">04</option>
                          <option value="05">05</option>
                          <option value="06">06</option>
                          <option value="07">07</option>
                          <option value="08">08</option>
                          <option value="09">09</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="formGridState">
                        <Form.Label id="ricerca">Anno Scadenza</Form.Label>
                        <Form.Control
                          as="select"
                          defaultValue="21"
                          name="anno"
                          onChange={this.handleChangeAnno}
                        >
                          <option value="21">21</option>
                          <option value="22">22</option>
                          <option value="23">23</option>
                          <option value="24">24</option>
                          <option value="25">25</option>
                          <option value="26">26</option>
                          <option value="27">27</option>
                          <option value="28">28</option>
                          <option value="29">29</option>
                          <option value="30">30</option>
                          <option value="31">31</option>
                          <option value="32">32</option>
                        </Form.Control>
                      </Form.Group>

                    


            </Form.Row>
            <div className="btn">
              
            <Button variant="dark" type="submit" >
                         Paga
                    </Button>
                    </div>
            </Form>
            </Card.Body>
            </Card>
            </div>
        )
    

    }
}