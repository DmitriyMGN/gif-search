export default class Api {
    constructor({ baseUrl, key, headers }){   
        this._baseUrl = baseUrl;
        this._apiKey = key;
        this._headers = headers;
        console.log(this._apiKey)
    }

    _checkResponse(res) {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      }

    getTrends() {
        return fetch(`${this._baseUrl}/trending${this._key}`, {
          headers: this._headers
        })
        .then(this._checkResponse);
    }

    getRandomGif(){
        return fetch(`${this._baseUrl}/random?api_key=${this._apiKey}`, {
            headers: this._headers
            })
            .then(res => this._checkResponse(res))
    }

}
