import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={metadataBase:new URL('https://living-portfolio-khusu.decent-peony-4152.chatgpt.site'),title:'The Living Portfolio — Ideas into experiences',description:'An independent creative playground. Moving images, visual identities, and interactive experiments.',openGraph:{title:'The Living Portfolio',images:['/cover.png']},icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}

