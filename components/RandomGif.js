export default class RandomGif {
    constructor({ itemSelector }){   
        this._element = document.querySelector(itemSelector);
    }

    getGif() {

    }

    setGif(res) {
        this._element.src = res.data.images.original.url;
    }

    removeGif() {

    }
}
