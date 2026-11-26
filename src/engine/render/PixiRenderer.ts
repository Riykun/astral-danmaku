import { Application, Container, Graphics } from 'pixi.js';
/** Live Pixi overlay renderer for player/boss light effects. Main gameplay remains Canvas during migration. */
export class PixiRenderer {
 readonly app=new Application(); readonly world=new Container(); private ready=false; private glow=new Graphics();
 async mount(host:HTMLElement):Promise<void>{
  if(this.ready)return;
  await this.app.init({backgroundAlpha:0,antialias:true,autoDensity:true,resolution:Math.min(window.devicePixelRatio||1,2),resizeTo:host,clearColor:0});
  const canvas=this.app.canvas as HTMLCanvasElement;
  canvas.className='astral-pixi-overlay';
  canvas.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1';
  host.appendChild(canvas);this.app.stage.addChild(this.world);this.world.addChild(this.glow);this.ready=true;
 }
 updateFocus(px:number,py:number,bx:number,by:number,active:boolean):void{
  if(!this.ready)return;
  this.glow.clear();
  if(!active)return;
  this.glow.circle(px,py,20).fill({color:0x7ceeff,alpha:.09});
  this.glow.circle(px,py,12).fill({color:0x9af5ff,alpha:.12});
  this.glow.circle(bx,by,52).fill({color:0xb7a0ff,alpha:.055});
  this.glow.circle(bx,by,42).stroke({color:0xd5c5ff,alpha:.1,width:1});
 }
 destroy():void{if(!this.ready)return;this.app.destroy(true,{children:true});this.ready=false;}
}
