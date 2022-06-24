export default class GenerateGif {
  constructor({templateSelector, gifsListSelector, gifsItemSelector }){   
      this._templateSelector = templateSelector;
      this._gifsListSelector = gifsListSelector;
      this._gifsItemSelector =  gifsItemSelector;
  }

  _getTemplate() {
    const gif = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.gif')
      .cloneNode(true);

    return gif;
  }

  generate(url) {
    this._gif = this._getTemplate()
    return this._gif.src = url;
  }
}
