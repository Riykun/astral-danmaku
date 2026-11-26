import type { EngineSystem, EngineFrame } from './types';
const STEP=1/60, MAX_FRAME=0.05, MAX_STEPS=3;
/** Fixed-step sim clock with capped catch-up to prevent spiral-of-death stalls. */
export class GameClock {
 private accumulator=0; private elapsed=0; private previous=0; private running=false; private systems:EngineSystem[]=[];
 addSystem(system:EngineSystem):()=>void {this.systems.push(system);return()=>{this.systems=this.systems.filter(s=>s!==system);};}
 start(nowMs=performance.now()):void {this.previous=nowMs;this.accumulator=0;this.running=true;}
 stop():void {this.running=false;}
 tick(nowMs:number):number {if(!this.running)return 0;const delta=Math.min(MAX_FRAME,Math.max(0,(nowMs-this.previous)/1000));this.previous=nowMs;this.accumulator+=delta;let steps=0;while(this.accumulator>=STEP&&steps<MAX_STEPS){this.elapsed+=STEP;const frame:EngineFrame={deltaSeconds:STEP,elapsedSeconds:this.elapsed};for(const system of this.systems)system(frame);this.accumulator-=STEP;steps++;}if(steps===MAX_STEPS&&this.accumulator>STEP*MAX_STEPS)this.accumulator=0;return delta;}
 get elapsedSeconds():number{return this.elapsed;} get isRunning():boolean{return this.running;}
}