import axios from 'axios';


     class RicercaConn {
        search = (obj) => {
            let _obj={...obj}
            delete _obj.strutture
            delete _obj.focused
            delete _obj.focusedInput
            _obj.check_in=_obj.check_in.format("YYYY-MM-DD");
            _obj.check_out=_obj.check_out.format("YYYY-MM-DD");

            return axios.post("http://localhost:3006/" + 'strutture/search', _obj);
            }

        searchCamere = (obj) => {
            let _obj={...obj}
            delete _obj.camere
            delete _obj.focused
            delete _obj.focusedInput
            _obj.check_in=_obj.check_in.format("YYYY-MM-DD");
            _obj.check_out=_obj.check_out.format("YYYY-MM-DD");
            return axios.post("http://localhost:3006/" + 'strutture/searchCamere', _obj);
        }
    
}

export default new RicercaConn();
