export default class Api {
    constructor({ baseUrl, headers }){   
        this._baseUrl = baseUrl;
        this._headers = headers;
        
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
    }

    getRandomGif(){
        return fetch(`${this._baseUrl}/random`, {
            headers: this._headers
            })
            .then(res => this._getResponseData(res))
    }

}
