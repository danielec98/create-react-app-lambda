import axios from 'axios';


     class AutenticazioneConn {
    register = (obj) => {
    return axios.post("http://localhost:3006/" + "utenti/registrazione", obj);
    }

    login = (obj) => {
      return axios.post("http://localhost:3006/" + "utenti/login", obj);
      }

    logout(){
      localStorage.clear();
    }

    getCurrentUser() {
      return JSON.parse(localStorage.getItem('utente'));;
    }
}

export default new AutenticazioneConn();
