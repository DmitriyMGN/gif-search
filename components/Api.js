export default class Api {
<<<<<<< HEAD
    constructor(url){   
        this._baseUrl = url;
        this._key = '?api_key=LgKQAIWNj0vz4nfwGHULAscH7a9nyP5R';
        this._headers = {'Content-Type': 'application/json'}
=======
    constructor({ baseUrl, key, headers }){   
        this._baseUrl = baseUrl;
        this._apiKey = key;
        this._headers = headers;
>>>>>>> 19af0cd2c0f25acc036b1d3c6d1ae71e511765cd
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
