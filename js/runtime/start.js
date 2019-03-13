import DataStore from '../base/DataStore.js'

export default class Star {
  constructor(URL) {
    const dataStore = DataStore.getInstance()
    this.bird = dataStore.get('bird')
    this.run = this.run.bind(this)
    let su = new SpriteUtilities(PIXI);
    let d = this.d = new Dust(PIXI);
    let frames = su.filmstrip(URL, 32, 32);
    this.particleStream = d.emitter(
      100,
      () => d.create(
        this.bird.obj.x, this.bird.obj.y+20,  //y 起始坐标
        () => su.sprite(frames),
        window.app.stage,
        3,  //粒子数
        0.1,  //重力
        false,  //随机间隔
        2, 4, //最小/最大角度
        13, 26, //最小/最大尺寸
        1, 5  //最小/最大速度
      )
    );
  }

  run() {
    this.d.update();
  }
}