import DataStore from '../base/DataStore.js'

export default class Boom {
  constructor(URL) {
    const dataStore = DataStore.getInstance()
    this.bird = dataStore.get('bird')
    let su = new SpriteUtilities(PIXI);
    this.d = this.d = new Dust(PIXI);
    let frames = su.filmstrip(URL, 32, 32);

    this.d.create(
      this.bird.obj.centerX,  this.bird.obj.centerY, //x 和 y 坐标
      () => su.sprite(frames), //粒子精灵
      window.app.stage, //父容器
      52, //粒子数
      .1, //重力
      false, //随机间隔
      0, 6.28, //最小角度，最大角度
      13, 23, //最小尺寸，最大尺寸
      1, 3 //最小速度，最大速度
    )
  }

  run() {
    this.d.update();
  }
}