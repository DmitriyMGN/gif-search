export default class Api {
    constructor({ baseUrl, key, headers }){   
        this._baseUrl = baseUrl;
        this._apiKey = key;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      }

    getTrends() {
        return fetch(`${this._baseUrl}/trending?api_key=${this._apiKey}&limit=32`, {
          headers: this._headers
        })
        .then(this._checkResponse);
    }

    getSearch(search) {
      return fetch(`${this._baseUrl}/search?api_key=${this._apiKey}&q=${search}&limit=32`, {
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

    uploadGif(tags, file){
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("file", `${file}`);
      urlencoded.append("tags", `${tags}`);
      console.log(`${file}`)

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      fetch(`https://upload.giphy.com/v1/gifs?api_key=${this._apiKey}`, requestOptions)
        .then(res => this._checkResponse(res))


        
      // return fetch(`https://upload.giphy.com/v1/gifs?api_key=${this._apiKey}`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded",
      //   },
      //   body: JSON.stringify({
      //       "file": `${file}`,
      //       // "tags": `${tags}`
      //     })
      //   })
      //   .then(res => this._checkResponse(res))
        
    }

}
