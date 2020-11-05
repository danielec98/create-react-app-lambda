import axios from 'axios';


     class AreaPersonaleConn {
    fetchUtente=(id)=>{
            return axios.post("http://localhost:3006/"+ "areaPersonale/fetchUtenti", {id,});
    }
    modificaDati = (obj) => {
    return axios.post("http://localhost:3006/" + "areaPersonale/modificaDati", obj);
    }
    modificaPassword = (obj)=>{
        return axios.post("http://localhost:3006/"+ "areaPersonale/modificaPassword", obj);
    }
    getGuadagni=()=>{
        return axios.get("http://localhost:3006/"+ "areaPersonale/getGuadagni");
    }

}

export default new AreaPersonaleConn();
