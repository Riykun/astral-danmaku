import type { Bullet } from './types';
/** Reuses bullet objects to avoid allocation spikes during dense patterns. */
export class BulletPool {
 private readonly items:Bullet[]; private cursor=0; private activeCount=0;
 constructor(capacity=1200){const n=Math.max(1,Math.floor(capacity));this.items=Array.from({length:n},()=>({x:0,y:0,vx:0,vy:0,radius:2,color:0xffffff,active:false}));}
 spawn(x:number,y:number,vx:number,vy:number,radius=2,color=0xffffff):Bullet|null{for(let n=0;n<this.items.length;n++){const i=(this.cursor+n)%this.items.length,b=this.items[i]!;if(b.active)continue;Object.assign(b,{x,y,vx,vy,radius,color,active:true});this.cursor=(i+1)%this.items.length;this.activeCount++;return b;}return null;}
 release(b:Bullet):void{if(!b.active)return;b.active=false;this.activeCount=Math.max(0,this.activeCount-1);}
 clear():void{for(const b of this.items)b.active=false;this.activeCount=0;this.cursor=0;}
 forEachActive(fn:(b:Bullet)=>void):void{for(const b of this.items)if(b.active)fn(b);}
 get count():number{return this.activeCount;}get capacity():number{return this.items.length;}
}