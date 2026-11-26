import { Application, Container, Graphics } from 'pixi.js';
/** Renderer foundation. Intentionally not yet connected to the live Canvas game. */
export class PixiRenderer {
 readonly app=new Application(); readonly world=new Container(); private ready=false;
 async mount(host:HTMLElement):Promise<void>{if(this.ready)return;await this.app.init({background:'#090c1d',antialias:true,autoDensity:true,resolution:Math.min(window.devicePixelRatio||1,2),resizeTo:host});host.appendChild(this.app.canvas);this.app.stage.addChild(this.world);this.ready=true;}
 circle(x:number,y:number,r:number,color:number,alpha=1):Graphics{const g=new Graphics().circle(x,y,r).fill({color,alpha});this.world.addChild(g);return g;}
 clearWorld():void{this.world.removeChildren();}
 destroy():void{if(!this.ready)return;this.app.destroy(true,{children:true});this.ready=false;}
}