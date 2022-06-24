export default class Api {
    constructor({ baseUrl, key, headers }){   
        this._baseUrl = baseUrl;
        this._apiKey = key;
        this._headers = headers;
        console.log(this._apiKey)
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
    }

    getRandomGif(){
        return fetch(`${this._baseUrl}/random?api_key=${this._apiKey}`, {
            headers: this._headers
            })
            .then(res => this._getResponseData(res))
    }

}
