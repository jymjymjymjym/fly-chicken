import DataStore from '../base/DataStore.js'
import Boom from './boom.js';

export default class Bird {
  constructor(URL) {
    let base = TextureCache[URL];
    //第一个纹理9, 9+34+18, 9+34+18+34+18
    let texture0 = new Texture(base);
    texture0.frame = new Rectangle(9, 9, 34, 34);
    //第二个纹理
    let texture1 = new Texture(base);
    texture1.frame = new Rectangle(9 + 34 + 18, 10, 34, 34);
    //第三个纹理
    let texture2 = new Texture(base);
    texture2.frame = new Rectangle(9 + 34 + 18 + 34 + 18, 10, 34, 34);

    let textures = [texture0, texture1, texture2];
    //创建动画精灵
    let pixie = new PIXI.extras.AnimatedSprite(textures);
    //设置动画精灵的速度
    pixie.animationSpeed = 0.1;
    this.b = new Bump(PIXI);
    //把动画精灵添加到舞台
    //播放动画精灵
    this.pencils = DataStore.getInstance().get('pencils')

    pixie.play();
    pixie.x = window.innerWidth / 15
    pixie.y = window.innerHeight / 2 - 17
    pixie.vy = 0
    pixie.g = 0.1
    this.obj = pixie
  }

  run() {

    this.boom && this.boom.run()
    if(DataStore.getInstance().get('gameover')){
      return
    }
    this.checkHitPen()
    this.obj.vy += this.obj.g 
    this.obj.y += this.obj.vy
    this.checkHitBorder()
  }

  checkHitPen() {
    this.pencils.some(pencil=>{
      if (this.b.hit(this.obj, pencil.obj)) {
        this.boom = new Boom('/res/start.png')
        this.obj.visible = false
        DataStore.getInstance().put('speed', 0)
        DataStore.getInstance().put('gameover', true)
      }
    })
  }

  checkHitBorder(){
    
    if (this.b.contain(this.obj, { x: 0, y: 0, width: 675, height: 320 })) {
      this.obj.vy = 0
    }
  }

  up() {
    this.obj.animationSpeed = 1;
    this.obj.g = -0.2
  }

  down(){
    this.obj.animationSpeed = 0.1;
    this.obj.g = 0.1
  }

  init() {
    this.obj.visible = true
    
    this.obj.x = window.innerWidth / 15
    this.obj.y = window.innerHeight / 2 - 17
  }
}