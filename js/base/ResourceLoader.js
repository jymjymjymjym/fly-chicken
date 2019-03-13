import { Resources } from "./Resources.js";

/* 
  资源加载器: 确保在图片资源加载后再进行渲染
*/
export class ResourceLoader {
  constructor() {
    this.map = new Map(Resources)
    for (let [key, value] of this.map) {
      const img = new Image()
      img.src = value
      this.map.set(key, img)
    }
  }

  onLoaded(callback) {
    let loadedCount = 0

    for (let value of this.map.values()) {
      value.onload = () => {
        loadedCount++
        if (loadedCount >= this.map.size) {
          callback(this.map)
        }
      }
    }

  }

  static create() {
    return new ResourceLoader()
  }
}