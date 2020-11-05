import React from 'react';
import Image from 'react-bootstrap/Image';
import '../css/style.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { DateRangePicker } from "react-dates";
import moment from 'moment';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import '../css/Effettua_ricerca.css';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import StructuresService from "../services/strutture.service";
import {Config} from "../config/config";
import Row from "react-bootstrap/Row";
import {AiOutlineArrowRight} from 'react-icons/ai';
import {MdEuroSymbol} from "react-icons/md";
import Jumbotron from 'react-bootstrap/Jumbotron';

var orientation= 'vertical';
export default class homex extends React.Component {
  constructor(props){
    super(props);
    this.setOrientation();
  }

  handleResize = e => {
    this.setState( {
        mediaSize: window.screen.width
    }, () =>  this.setOrientation());
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  state = {
    mediaSize: window.screen.width,
    check_in: moment(),
    check_out: moment(),
    focused: false,
    citta: "",
    posti_letto: 2,
    tipologia: 1,
    prezzo: 120,
    prezzo_totale: undefined,
    strutture: [],
    rooms: [],
    struttura: [],
    wifi: false,
    parcheggio: false,
    ascensore_disabili: false,
    bagno_disabili: false,
    animali: false,
    area_fumatori: false,
    ricercaEffettuata: false,
    orientation : 'horizontal'
  };

  handleChangeCitta = (event) => {
    this.setState({ citta: event.target.value });
  };

  handleChangeTipo = (event) => {
    this.setState({ tipologia: event.target.value });
  };

  handleChangePrezzo = (event) => {
    this.setState({ prezzo: event.target.value });
  };

  handleChangeOspiti = (event) => {
    this.setState({ posti_letto: event.target.value });
  };

  handleSubmit = async (event) => {
    try{
      event.preventDefault();
      if(this.state.check_in !== null && this.state.check_out !== null){
        let response = await StructuresService.ricerca(this.state);
        this.setState({ strutture: response.data, ricercaEffettuata: true });
      }
    }
    catch(e){
    }

  };

  resetSearch = () => { this.setState({ strutture: [], ricercaEffettuata: false });}

  handleOnChange = (e) => this.setState({ value: e.target.value });

  handleChangeServizi = (e) => {

    this.resetSearch()
    const wifi = document.getElementById("wifi");
    const parcheggio = document.getElementById("parcheggio");
    const ascensore = document.getElementById("ascensore");
    const BagnoDisabili = document.getElementById("BagnoDisabili");
    const AccettatiAnimali = document.getElementById("AccettatiAnimali");
    const AreaFumatori = document.getElementById("AreaFumatori");

    this.setState({ wifi: wifi.checked });
    this.setState({ parcheggio: parcheggio.checked });
    this.setState({ ascensore_disabili: ascensore.checked });
    if (this.state.tipologia == 1){
      this.setState({ bagno_disabili: BagnoDisabili.checked });
      this.setState({ animali: AccettatiAnimali.checked });
      this.setState({ area_fumatori: AreaFumatori.checked });
    }
  };


  errorDate=  ()=>{
    const errore= document.getElementById("errored")
    const button = document.getElementById("cerca");
    if(this.state.check_in && this.state.check_out){
      if(this.state.check_out.diff(this.state.check_in, "days") + 1 > 28){
        errore.removeAttribute("hidden");
        button.setAttribute("disabled", "true");
      }else{
        errore.setAttribute("hidden","true");
        button.removeAttribute("disabled");
      }
    }else{
      errore.setAttribute("hidden", "true");
       button.removeAttribute("disabled");
    }
  }
  setOrientation = ()=>{this.orientation= window.matchMedia("(max-width: 1030px)").matches ? 'vertical' : 'horizontal';}
  render() {
    return (
      <div className="container">
        <div className="wrapper">
          <div id="Cerca">
            <Card id="cercastrutturacard">
              <Card.Body>
                <Form id="effettuaricerca" onSubmit={this.handleSubmit}>
                  <Form.Row>
                    <Col xs="6" sm="6" md="6" lg="2">
                      <Form.Group controlId="formGridCity">
                        <Form.Label id="ricerca">Città:</Form.Label>
                        <Form.Control
                          required
                          onChange={this.handleChangeCitta}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg="1">
                      <Form.Group controlId="formGridState">
                        <Form.Label id="ricerca">Ospiti</Form.Label>
                        <Form.Control
                          as="select"
                          defaultValue="2"
                          onChange={this.handleChangeOspiti}
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col xs="12" sm="6" md="6" lg="2">
                      <Form.Group id="tipoalloggiocerca">
                        <Form.Label id="ricerca">Tipo di alloggio:</Form.Label>
                        <Form.Control
                          as="select"
                          defaultValue="Bed & Breakfast"
                          onChange={this.handleChangeTipo}
                        >
                          <option value="1">Bed & Breakfast</option>
                          <option value="2">Casa Vacanza</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col xs="12" sm="6" md="6" lg="3">
                      <Form.Label id="ricerca">
                        Check-in <AiOutlineArrowRight /> Check-out:
                      </Form.Label>
                      <br />
                      <p id="errored" hidden style={{ color: "red" }}>
                        range non valido , superiore a 28 giorni
                      </p>
                      <DateRangePicker
                        startDate={this.state.check_in}
                        startDateId="your_unique_start_date_id"
                        endDate={this.state.check_out}
                        endDateId="your_unique_end_date_id"
                        onDatesChange={async ({ startDate, endDate }) => {
                          this.resetSearch()
                          await this.setState({
                            check_in: startDate,
                            check_out: endDate,
                          });
                          if (this.state.check_out !== null) {
                            this.errorDate();
                          }
                        }}
                        focusedInput={this.state.focusedInput}
                        onFocusChange={(focusedInput) =>
                          this.setState({ focusedInput })
                        }
                        required
                      />
                    </Col>
                    <Col xs="12" sm="6" md="6" lg="2">
                      <Form.Group
                        id="fasciaprezzocerca"
                        controlId="formBasicRange"
                        onChange={this.handleChangePrezzo}
                      >
                        <Form.Label id="ricerca">Fascia di prezzo:</Form.Label>
                        <br />
                        <input
                          type="range"
                          min={0}
                          max={255}
                          value={this.state.prezzo}
                          className="slider"
                          onChange={this.handleOnChange}
                        />
                        <div id="prezzo" className="value">
                          {this.state.prezzo + "€"}
                        </div>
                      </Form.Group>
                    </Col>

                    <Col xs="12" sm="12" md="12" lg="1">
                      <Button
                        variant="primary small-button"
                        id="cerca"
                        type="submit"
                        disabled
                        style={{padding: "0"}}
                      >
                        Cerca
                      </Button>
                    </Col>
                  </Form.Row>
                    <Form.Group
                        id="serviziCamera"
                      onChange={this.handleChangeServizi}
                      className="ricerca"
                    >
                      <Row>
                        <Col xs="12" sm="12" md="4" lg="4">
                          <Form.Check
                            id="wifi"
                            label="Wi-Fi"
                            className="ricerca"
                          />
                        </Col>
                        <Col xs="12" sm="12" md="4" lg="4">
                          <Form.Check
                            id="parcheggio"
                            label="Parcheggio"
                            className="ricerca"
                          />
                        </Col>
                        <Col xs="12" sm="12" md="4" lg="4">
                          <Form.Check
                            id="ascensore"
                            label="Ascensore"
                            className="ricerca"
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    {this.state.tipologia == 1 ? (
                      <Form.Group
                        id="serviziCamera"
                        onChange={this.handleChangeServizi}
                        className="ricerca"
                      >
                        <Row>
                          <Col xs="12" sm="12" md="4" lg="4">
                            <Form.Check
                              id="BagnoDisabili"
                              label="Bagno Disabili"
                              className="ricerca"
                            />
                          </Col>
                          <Col xs="12" sm="12" md="4" lg="4">
                            <Form.Check
                              id="AccettatiAnimali"
                              label="Animali ammessi"
                              className="ricerca"
                            />
                          </Col>
                          <Col xs="12" sm="12" md="4" lg="4">
                            <Form.Check
                              id="AreaFumatori"
                              label="Area fumatori"
                              className="ricerca"
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                    ) : null}
                </Form>
              </Card.Body>
            </Card>
            {this.state.strutture.length > 0 ? (
              <div id="risultati-ricerca">
                {this.state.strutture.map((struttura, index) => (
                  <Row className="lista-strutture-ricerca" key={"row-" + index}>
                    <Col className="immagine" xs="12" sm="4" md="4" lg="5">
                      <Image
                        variant="top"
                        className="card-img"
                        src={
                          struttura.path
                            ? Config.IMAGE_URL + struttura.path
                            : Config.IMAGE_URL + struttura.s_paths[0].path
                        }
                        fluid
                      />
                    </Col>
                    <Col className="descrizione" xs="12" sm="5" md="5" lg="5">
                          <a onClick={() => {
                              const data = {
                                check_in: this.state.check_in.format(
                                  "YYYY-MM-DD"
                                ),
                                check_out: this.state.check_out.format(
                                  "YYYY-MM-DD"
                                ),
                                struttura: struttura,
                                permanenza_giorni:
                                  this.state.check_out.diff(
                                    this.state.check_in,
                                    "days"
                                  ) + 1,
                              };
                              this.props.history.push({
                                pathname: "/visualizzaStruttura",
                                state: {
                                  check_in: data.check_in,
                                  check_out: data.check_out,
                                  struttura: data.struttura,
                                  permanenza_giorni: data.permanenza_giorni,
                                },
                              });
                            }} >
                            <strong id="nome-struttura" fontSize={20} style={{wordWrap: 'break-word', fontSize: '23px'}}>
                              {struttura.s_nome} ({struttura.nome})
                            </strong>
                          </a>
                    </Col>

                    <Col xs="6" sm="3" md="3" lg="2">
                      {this.state.check_out && this.state.check_in ? (
                        <div id="prezzo-struttura">
                          <MdEuroSymbol id="prezzob" fontSize={40} />
                          <span className="prezzo">
                            {
                              (this.state.prezzo_totale =
                                struttura.prezzo *
                                (this.state.check_out.diff(this.state.check_in, "days") + 1))
                            }
                          </span>
                        </div>
                      ) : null}
                    </Col>
                  </Row>
                ))}
              </div>
            ) : this.state.ricercaEffettuata ? (
              <Jumbotron>
                <h1>Ci dispiace!</h1>
                <p>
                  Non abbiamo trovato nessuna struttura che soddisfi la tua
                  richiesta.
                </p>
              </Jumbotron>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}
