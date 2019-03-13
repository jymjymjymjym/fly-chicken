import DataStore from "../base/DataStore.js";

export default class Ground {
  constructor(groundUrl) {
    let groundScript = new PIXI.extras.TilingSprite(
      resources[groundUrl].texture, 1600, 179
    );
    groundScript.scale.y = .5;
    groundScript.scale.x = .5;
    groundScript.y = window.innerHeight - 90;
    
    this.dataStore = DataStore.getInstance()
    this.obj = groundScript
  }

  run() {
    this.obj.tilePosition.x -= this.dataStore.get('speed') * 2;
  }
}