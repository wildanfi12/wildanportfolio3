import {getContent} from '../../../lib/content';
import Portfolio from '../../portfolio';
import {notFound} from 'next/navigation';
export const dynamic='force-dynamic';
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const data=await getContent();if(!data.collections.some(p=>p.id===slug))notFound();return <Portfolio data={data} collectionId={slug}/>}
