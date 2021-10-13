import Card from "./Card.js";

export default class Section {
  constructor({ data, renderer }, containerselector) {
    this._renderer = renderer;
    this._renderedItems = data;
    this._containerselector = containerselector;
  }

  setItem(element) {
    this._containerselector.append(element);
  }

  clear() {
    this._containerselector.innnerHTML = "";
  }

  renderItems() {
    this.clear();
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
