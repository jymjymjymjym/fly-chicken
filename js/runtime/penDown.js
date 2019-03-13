import Pencil from './pencil.js'

export default class PencilDown extends Pencil {
  constructor(URL, top) {
    super(URL)
    
    
    this.initY = this.obj.y = top-450
    this.minY = this.initY + 100
    // this.c.slide(this.obj, this.obj.x, 10, 70, "smoothstep", true);
  }
}