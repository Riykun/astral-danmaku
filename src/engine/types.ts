export type Vec2 = { x: number; y: number };
export interface Bullet { x:number; y:number; vx:number; vy:number; radius:number; color:number; active:boolean; }
export interface PlayerState { position:Vec2; hitRadius:number; invulnerableSeconds:number; }
export interface EngineFrame { deltaSeconds:number; elapsedSeconds:number; }
export type EngineSystem = (frame:EngineFrame)=>void;