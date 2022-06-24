export default class Api {
    constructor(){   
        this._baseUrl = 'https://api.giphy.com/v1/gifs';
        this._key = '?api_key=LgKQAIWNj0vz4nfwGHULAscH7a9nyP5R';
        this._headers = {'Content-Type': 'application/json'}
    }

    _checkResponse(res) {
        if (res.ok) {
          console.log('!!!!!')
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

    // _getResponseData(res) {
    //     if (!res.ok) {
    //         return Promise.reject(`Ошибка: ${res.status}`); 
    //     }
    //     return res.json();
    // }

    // getRandomGif(){
    //     return fetch(`${this._baseUrl}/random${}`, {
    //         headers: this._headers
    //         })
    //         .then(res => this._getResponseData(res))
    // }

}
