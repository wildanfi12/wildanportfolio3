import { env } from 'cloudflare:workers';
import { demo, type Content } from './demo';
export async function getContent(all=false):Promise<Content>{let data=demo;if(env.DB){const row=await env.DB.prepare('SELECT value, revision FROM content WHERE id = ?').bind('portfolio').first<{value:string;revision:number}>();if(row)data={...JSON.parse(row.value),revision:row.revision};}return {...data,projects:data.projects.filter(p=>all||p.published)};}
