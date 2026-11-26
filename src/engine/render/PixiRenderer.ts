import { Application, Container, Graphics } from 'pixi.js';
/** Pixi-powered live celestial effects overlay. Gameplay logic and core sprites remain in Canvas during the renderer migration. */
export class PixiRenderer {
 readonly app=new Application();
 readonly world=new Container();
 private ready=false;
 private glow=new Graphics();
 private rings=new Graphics();
 async mount(host:HTMLElement):Promise<void>{
  if(this.ready)return;
  await this.app.init({backgroundAlpha:0,antialias:true,autoDensity:true,resolution:Math.min(window.devicePixelRatio||1,2),resizeTo:host});
  const canvas=this.app.canvas as HTMLCanvasElement;
  canvas.className='astral-pixi-overlay';
  canvas.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1';
  host.appendChild(canvas);
  this.app.stage.addChild(this.world);
  this.world.addChild(this.glow,this.rings);
  this.ready=true;
 }
 updateFocus(px:number,py:number,bx:number,by:number,active:boolean,timeMs=0):void{
  if(!this.ready)return;
  this.glow.clear();this.rings.clear();
  if(!active)return;
  const pulse=.5+.5*Math.sin(timeMs*.004);
  this.glow.circle(px,py,24+pulse*3).fill({color:0x7ceeff,alpha:.045+pulse*.025});
  this.glow.circle(px,py,16).fill({color:0x9af5ff,alpha:.08});
  this.glow.circle(bx,by,64+pulse*6).fill({color:0xb7a0ff,alpha:.025+pulse*.015});
  this.glow.circle(bx,by,48).fill({color:0xd5c5ff,alpha:.04});
  this.rings.circle(px,py,10+pulse*3).stroke({color:0xb4f3ff,alpha:.24,width:1});
  this.rings.circle(bx,by,58+pulse*5).stroke({color:0xc8b8ff,alpha:.12,width:1});
  this.rings.circle(bx,by,72-pulse*4).stroke({color:0xa7dfff,alpha:.055,width:1});
 }
 destroy():void{if(!this.ready)return;this.app.destroy(true,{children:true});this.ready=false;}
}