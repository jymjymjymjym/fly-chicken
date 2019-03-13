// import { Diector } from "./js/Diector.js";
// import { BackGround } from "./js/runtime/BackGround.js";
import DataStore from "./base/DataStore.js";
// import { Land } from "./js/runtime/Land.js";
// import { Bird } from "./js/player/Bird.js";
// import { StartButton } from "./js/player/StartButton.js";
// import { Score } from "./js/player/Score.js";
import Wood from './runtime/wood.js'
import Ground from './runtime/ground.js'
import PencilUp from './runtime/penUp.js'
import PencilDown from './runtime/penDown.js'
import Bird from './runtime/bird.js'
import Start from './runtime/start.js'
/* 
  初始化全部精灵, 游戏开始的入口
*/

export class Main {
  constructor() {
    let option = {
      width: window.innerWidth,
      height: window.innerHeight,
      transparent: true,
    }
    window.app = new PIXI.Application(option);
    this.stage = app.stage;
    this.renderer = app.renderer;
    let playground = document.getElementById('px-render');
    this.dataStore = DataStore.getInstance().put('pencils', []).put('speed', 2).put('gameover', false)

    playground.appendChild(this.renderer.view);
    PIXI.loader.add(this.initResources()).load(this.setup.bind(this));
  }

  setup() {
    this.woodScript = new Wood(this.woodUrl)
    this.groundScript = new Ground(this.groundUrl)
    this.bird = new Bird(this.birdUrl)
    this.initDataStore()
    this.initEven()

    this.start = new Start(this.starUrl)
    this.stage.addChild(this.woodScript.obj);
    this.createPencil()
    this.stage.addChild(this.groundScript.obj);
    app.stage.addChild(this.bird.obj);

    // setTimeout(()=>{
    //   this.bird.obj.y = 0
    // }, 3000)
    //开始游戏循环
    this.gameLoop();
  }

  gameLoop = () => {
    this.timer = requestAnimationFrame(this.gameLoop);
    this.play();
    this.renderer.render(this.stage);
  }

  play() {
    this.woodScript.run()
    this.runPencils()
    this.groundScript.run()
    this.start.run()
    this.bird.run()

  }

  createPencil() {
    const minTop = window.innerHeight / 8
    const maxTop = window.innerHeight / 2
    const top = minTop + Math.random() * (maxTop - minTop)

    const pencilUp = new PencilUp(this.pencilUpUrl, top)
    const pencilDown = new PencilDown(this.pencilDownUrl, top)

    this.dataStore.get('pencils').push(pencilUp)
    this.dataStore.get('pencils').push(pencilDown)

    this.stage.addChild(pencilUp.obj);
    this.stage.addChild(pencilDown.obj);

    this.stage.addChild(this.groundScript.obj);

    // this.dataStore.get('score').score++
  }

  runPencils() {
    const pencils = this.dataStore.get('pencils')
    if (pencils[0].obj.x + pencils[0].obj.width <= 0 && pencils.length === 6) {
      pencils.shift()
      pencils.shift()
    }
    if (pencils[0].obj.x <= (window.innerWidth - pencils[0].obj.width) / 1.5 && pencils.length === 2) {
      this.createPencil()
    }

    if (pencils[0].obj.x <= (window.innerWidth - pencils[0].obj.width) / 3 && pencils.length === 4) {
      this.createPencil()
    }
    pencils.forEach(pencil => {
      pencil.run()
    });
  }

  initResources() {
    return [
      this.woodUrl = "/res/wood.jpg",
      this.groundUrl = "/res/ground.png",
      this.pencilDownUrl = "/res/pie_down.png",
      this.pencilUpUrl = "/res/pie_up.png",
      this.birdUrl = "/res/birds.png",
      this.starUrl = "/res/start.png"
    ]
  }

  initDataStore() {
    this.dataStore
      .put('stage', this.stage)
      .put('bird', this.bird)
      .put('ground', this.groundScript)

  }

  initEven() {
    window.ontouchstart = (e) => {
      if (DataStore.getInstance().get('gameover')) {
        cancelAnimationFrame(this.timer)
        this.stage.removeChildren()
        DataStore.getInstance().put('pencils', []).put('speed', 2).put('gameover', false)
        // this.bird.init()
        this.setup()
      } else {
        this.start.particleStream.play()
        this.bird.up()
      }

      if (e.touches[0].clientY > 320) {
        this.dataStore.put('speed', 3)
      }
    }

    window.ontouchend = () => {
      
      this.dataStore.put('speed', 2)
      this.start.particleStream.stop()
      this.bird.down()
    }
  }
}