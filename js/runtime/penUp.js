import Pencil from './pencil.js'

export default class PencilUp extends Pencil {
  constructor(URL, top) {
    super(URL)


    this.initY = this.obj.y = top + window.innerHeight / 5
    this.minY = this.initY + 100
    // console.log( this.c.slide(this.obj, this.obj.x, 128, 10, "smoothstep", true))
  }
}