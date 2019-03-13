import DataStore from "../base/DataStore.js";

export default class Pencil {
  constructor(URL) {
    let sprite = new PIXI.Sprite(resources[URL].texture);
    this.obj = sprite
    
    this.vy =Math.floor((Math.random() - 0.5) *10) /2
    this.obj.x = window.innerWidth
    sprite.alpha=.9
  }

  run() {
    this.obj.x -= DataStore.getInstance().get('speed')
    // this.c.slide(this.obj, this.obj.x, 128, 10, "smoothstep", true)

    this.obj.y += this.vy
    if(this.obj.y <= this.initY) {
      this.obj.y = this.initY
      this.vy *= -1
    }
    if(this.obj.y >= this.minY) {
      this.obj.y = this.minY
      this.vy *= -1
    }
  }
}