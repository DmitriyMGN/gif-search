export default class RandomGif {
    constructor({ itemSelector }){   
        this._element = document.querySelector(itemSelector);
        console.log(this._element)
    }

    setGif(res) {
        this._element.src = res.data.images.original.url;
    }
}
