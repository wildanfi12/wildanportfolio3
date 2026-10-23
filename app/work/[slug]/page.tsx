import {getContent} from '../../../lib/content';
import Portfolio from '../../portfolio';
import {notFound} from 'next/navigation';
export const dynamic='force-dynamic';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=(await getContent()).projects.find(p=>p.id===slug);return p?{title:p.title+' — The Living Portfolio',description:p.description,alternates:{canonical:'/work/'+p.id},openGraph:{title:p.title,description:p.description,url:'/work/'+p.id,images:[p.cover||(p.id==='after-hours'||p.id==='soft-frequency'||p.id==='off-script'||p.id==='form-and-feeling'||p.id==='parallel-worlds'||p.id==='in-the-cut'?'/social/'+p.id+'.png':'/cover.png')]}}:{};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const data=await getContent();if(!data.projects.some(p=>p.id===slug))notFound();return <Portfolio data={data} projectId={slug}/>}

