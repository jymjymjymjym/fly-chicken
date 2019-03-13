import DataStore from "../base/DataStore.js";

export default class Wood {
  constructor(woodUrl) {
    let woodScript = new PIXI.extras.TilingSprite(
      resources[woodUrl].texture, 1600, 640
    );
    woodScript.scale.x = .6;
    woodScript.scale.y = .6;

    this.dataStore = DataStore.getInstance()
    this.obj = woodScript
  }

  run() {
    this.obj.tilePosition.x -= this.dataStore.get('speed');
  }
}