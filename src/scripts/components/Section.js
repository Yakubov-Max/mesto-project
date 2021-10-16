import Card from "./Card.js";

export default class Section {
  constructor({ renderer }, containerselector) {
    this._renderer = renderer;
    this._containerselector = containerselector;
  }

  setItem(element) {
    this._containerselector.prepend(element);
  }

  clear() {
    this._containerselector.innnerHTML = "";
  }

  renderItems(items) {
    this.clear();
    items.forEach((item) => {
      this._renderer(item, this._profileId);
    });
  }

  setProfileId(profileId) {
    this.profileId = profileId
  }
}

