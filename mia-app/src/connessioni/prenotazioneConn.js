import axios from 'axios';


     class prenotazioneConn {
        pagamento = (obj) => {
            return axios.post("http://localhost:3006/" + "prenotazione/pagamento", obj);
            }
        prenotaCamera = (obj) => {
            return axios.post("http://localhost:3006/" + "strutture/prenotaCamera", obj);
            }
        prenotaStruttura = (obj) => {
            return axios.post("http://localhost:3006/" + "prenotazione/prenotaStruttura", obj);
            }    
        getid = (obj) => {
            return axios.post('http://localhost:3006/prenotazione/getId', obj); }
       
        conferma = (obj) => {
            return axios.post('http://localhost:3006/prenotazione/conferma', obj); }
        
        getGuadagni = (id) => {
            return axios.post('http://localhost:3006/prenotazione/getGuadagni',{id,})
    
        }
        getPrenotazioniStrutture = (id) => {
            return axios.post('http://localhost:3006/prenotazione/getPrenotazioniStrutture', {id,});
        }
        getPrenotazioniCamere = (id) => {
            return axios.post('http://localhost:3006/prenotazione/getPrenotazioniCamere', {id,});
        }
        getPrenotazioniUtenteStrutture = (id) => {
            return axios.post('http://localhost:3006/prenotazione/getPrenotazioniUtenteStrutture', {id,});
        }
        getPrenotazioniUtenteCamere = (id) => {
            return axios.post('http://localhost:3006/prenotazione/getPrenotazioniUtenteCamere', {id,});
        }
    }   

export default new prenotazioneConn();
