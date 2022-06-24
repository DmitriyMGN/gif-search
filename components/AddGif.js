export default class AddGif {
  constructor({containerId, renderer}){   
      this._renderer = renderer;
      this._containerElement = document.querySelector(containerId);
  }

  add(gif) {
    this._containerElement.append(gif)
  }

  renderItems(data) {
    data.forEach((item) => {
      this._renderer(item);
    });
  }


}