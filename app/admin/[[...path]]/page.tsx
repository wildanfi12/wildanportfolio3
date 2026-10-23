import {getChatGPTUser,chatGPTSignInPath} from '../../chatgpt-auth';
import {authorized} from '../../api/content/route';
import {getContent} from '../../../lib/content';
import Studio from '../studio';
export const dynamic='force-dynamic';
export default async function Page(){const user=await getChatGPTUser();if(!await authorized())return <main className="admin"><a href="/">← Back to portfolio</a><p className="eyebrow">CREATOR STUDIO</p><h1>A space to<br/>make it yours.</h1><div className="admin-note"><h3>Owner access required</h3><p>The studio uses ChatGPT sign-in and a server-side owner allowlist. No default password is installed.</p>{user?<><p>Ask your site administrator to set ADMIN_USER_ID to your verified Site identity:</p><code>{user.userId}</code><p>Signing in alone does not grant editing permission.</p></>:<a className="button orange" href={chatGPTSignInPath('/admin')} target="_top">Sign in with ChatGPT ↗</a>}</div></main>;return <Studio initial={await getContent(true)}/>}
