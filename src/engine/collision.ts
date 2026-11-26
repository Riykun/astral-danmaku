import type { Vec2 } from './types';
export function circleHit(a:Vec2,ar:number,b:Vec2,br:number):boolean{const dx=a.x-b.x,dy=a.y-b.y,sum=ar+br;return dx*dx+dy*dy<=sum*sum;}
export function clamp(value:number,low:number,high:number):number{if(low>high)throw new RangeError('clamp bounds must be ordered');return value<low?low: value>high?high:value;}