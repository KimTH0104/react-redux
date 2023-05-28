
export default class SessionContainer {

  static _instance = null;

  static get instance() {
    if (this._instance === null) {
      this._instance = new SessionContainer();
      return this._instance;
    } else {
      return this._instance;
    }
  }

  enableShowIntro = true;

  setEnableShowIntro = (value) => {
    this.enableShowIntro = value;
  }
}
