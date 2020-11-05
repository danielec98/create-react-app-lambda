
import axios from 'axios';

class StrutturaConn {
    registraStruttura = (obj) => {
        return axios.post('http://localhost:3006/strutture/strutture', obj)
    }
    modificaStruttura = (obj) => {
        return axios.post('http://localhost:3006/strutture/modificaStruttura', obj)
    }
    registraCamera = (obj) => {
        return axios.post('http://localhost:3006/strutture/registraCamera', obj)
    }
    modificaCamera = (obj) => {
        return axios.post('http://localhost:3006/strutture/modificaCamera', obj)
    }

    aggiungiFoto = (dati) => {
        return axios.post('http://localhost:3006/strutture/immagini', dati)
    }

    aggiungiImmaginiCamera = (dati) => {
        return axios.post('http://localhost:3006/strutture/immaginiCamera', dati)
    }

    getStrutture = (id) => {
        return axios.post('http://localhost:3006/strutture/getStrutture',{id,})

    }
    getCamere = (id) => {
        return axios.post('http://localhost:3006/strutture/getCamere',{id,})

    }
    getNome = () => {
        return axios.get('http://localhost:3006/strutture/getNome')

    }
    deleteStruttura = (id_struttura) => {
        return axios.post('http://localhost:3006/strutture/deleteStruttura',{id_struttura})

    }
    cancellaCamera = (id_camera) => {
        return axios.post('http://localhost:3006/strutture/cancellaCamera',{id_camera})

    }
    getTassa = (id_gestore) => {
        return axios.post('http://localhost:3006/strutture/getTassa',{id_gestore,})

    }
    prendiImmagini = (id)=>{
        return axios.post('http://localhost:3006/strutture/fetchImage', {id,})
    }
    modificaFoto = (dati) => {
        return axios.post('http://localhost:3006/strutture/modificaFoto', dati)
    }
    cancella = (obj) => {
        return axios.post('http://localhost:3006/strutture/cancella', obj)
    }

}

export default new StrutturaConn();