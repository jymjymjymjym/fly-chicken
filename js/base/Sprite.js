import { DataStore } from "./DataStore.js";

/* 
  精灵基类: 页面初始化精灵加载资源的位置和大小
*/
export class Sprite {
  constructor(props) {
    this.dataStore = DataStore.getInstance()
    this.img = null
    this.ctx = this.dataStore.ctx
    this.srcX = 0
    this.srcY = 0
    this.srcW = 0
    this.srcH = 0
    this.x = 0
    this.y = 0
    this.width = 0
    this.height = 0
    this.rotation = 0
    Object.assign(this, props)
  }

  draw(args) {
    
    Object.assign(this, args)
    this.ctx.save()
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.rotation);
    this.ctx.drawImage(
      this.img,
      this.srcX,
      this.srcY,
      this.srcW,
      this.srcH,
      0,
      0,
      this.width,
      this.height
    );
    this.ctx.restore()
    
  }

  static getImage(key){
    return DataStore.getInstance().res.get(key)
  }
}