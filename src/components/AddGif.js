export default class AddGif {
  constructor(containerSelector, renderer){   
      this._containerElement = document.querySelector(containerSelector);
      this._renderer = renderer;
  }

  add(gif) {
    this._containerElement.append(gif)
  }

  renderItems(data) {
    data.forEach((item) => {
      this._renderer(item);
    });
  }

  replaceGif(newGif) {
    this._containerElement.replaceChild(newGif, this._containerElement.firstChild)
  }
}