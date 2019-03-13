import { Main } from "./js/main.js";

//设置别名
window.TextureCache = PIXI.utils.TextureCache;
window.Texture = PIXI.Texture;
window.Rectangle = PIXI.Rectangle;
window.AnimatedSprite = PIXI.extras.AnimatedSprite;
window.resources = PIXI.loader.resources;

new Main()