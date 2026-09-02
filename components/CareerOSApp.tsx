'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type Task = { id: string; title: string; done: boolean; archived?: boolean };
type Meeting = { id: string; title: string; when: string; archived?: boolean };
type Project = { id: string; title: string; status: 'Active' | 'Planning' | 'Waiting'; archived?: boolean };
type Win = { id: string; title: string; metric?: string; archived?: boolean };

type Store = { tasks: Task[]; meetings: Meeting[]; projects: Project[]; wins: Win[] };

const EMPTY: Store = { tasks: [], meetings: [], projects: [], wins: [] };
const KEY = 'careeros-v1';

const nav = [
  ['home', 'Home'],
  ['tasks', 'Tasks'],
  ['meetings', 'Meetings'],
  ['projects', 'Projects'],
  ['impact', 'Impact'],
  ['brand', 'Brand'],
  ['vault', 'Vault'],
  ['archive', 'Archive'],
  ['settings', 'Settings'],
] as const;

function uid() { return Math.random().toString(36).slice(2, 10); }

export default function CareerOSApp({ slug }: { slug: string[] }) {
  const section = slug[0] || 'home';
  const [store, setStore] = useState<Store>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setStore(JSON.parse(saved));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(store));
  }, [store, ready]);

  const update = <K extends keyof Store>(key: K, value: Store[K]) => setStore(s => ({ ...s, [key]: value }));

  const archive = (kind: keyof Store, id: string) => {
    update(kind, store[kind].map((item: any) => item.id === id ? { ...item, archived: true } : item) as any);
  };
  const remove = (kind: keyof Store, id: string) => {
    update(kind, store[kind].filter((item: any) => item.id !== id) as any);
  };

  const activeTasks = store.tasks.filter(x => !x.archived);
  const activeMeetings = store.meetings.filter(x => !x.archived);
  const activeProjects = store.projects.filter(x => !x.archived);
  const activeWins = store.wins.filter(x => !x.archived);
  const archived = useMemo(() => [
    ...store.tasks.filter(x => x.archived).map(x => ({ ...x, kind: 'Task' })),
    ...store.meetings.filter(x => x.archived).map(x => ({ ...x, kind: 'Meeting' })),
    ...store.projects.filter(x => x.archived).map(x => ({ ...x, kind: 'Project' })),
    ...store.wins.filter(x => x.archived).map(x => ({ ...x, kind: 'Win' })),
  ], [store]);

  return <div className="shell">
    <aside className="sidebar">
      <div className="brandmark"><span>Career</span><strong>OS</strong></div>
      <p className="tagline">Your career, remembered.</p>
      <nav>{nav.map(([href, label]) => <Link key={href} className={section === href ? 'active' : ''} href={href === 'home' ? '/' : `/${href}`}>{label}</Link>)}</nav>
      <button className="capture" onClick={() => {
        const title = prompt('What do you want to capture?');
        if (title) update('tasks', [{ id: uid(), title, done: false }, ...store.tasks]);
      }}>+ Capture</button>
    </aside>

    <main className="main">
      {section === 'home' && <Home tasks={activeTasks} meetings={activeMeetings} projects={activeProjects} wins={activeWins} setStore={setStore} store={store} />}
      {section === 'tasks' && <Tasks tasks={activeTasks} store={store} setStore={setStore} archive={archive} remove={remove} />}
      {section === 'meetings' && <Meetings meetings={activeMeetings} store={store} setStore={setStore} archive={archive} remove={remove} />}
      {section === 'projects' && <Projects projects={activeProjects} store={store} setStore={setStore} archive={archive} remove={remove} />}
      {section === 'impact' && <Impact wins={activeWins} store={store} setStore={setStore} archive={archive} remove={remove} />}
      {section === 'brand' && <Simple title="Brand HQ" body="Define your professional identity, positioning, voice, and reusable career narrative here." />}
      {section === 'vault' && <Simple title="Vault" body="A home for resumes, portfolios, job descriptions, links, references, and career resources." />}
      {section === 'archive' && <Archive items={archived} store={store} setStore={setStore} />}
      {section === 'settings' && <Settings setStore={setStore} />}
    </main>
  </div>;
}

function Header({ eyebrow, title, action }: { eyebrow: string; title: string; action?: React.ReactNode }) {
  return <header className="pageHeader"><div><p>{eyebrow}</p><h1>{title}</h1></div>{action}</header>;
}

function Empty({ text }: { text: string }) { return <div className="empty">{text}</div>; }

function Home({ tasks, meetings, projects, wins, setStore, store }: any) {
  return <>
    <Header eyebrow="COMMAND CENTER" title="Good work starts here." />
    <section className="stats horizontal">
      <div><span>OPEN TASKS</span><strong>{tasks.filter((t: Task) => !t.done).length}</strong></div>
      <div><span>UPCOMING MEETINGS</span><strong>{meetings.length}</strong></div>
      <div><span>ACTIVE PROJECTS</span><strong>{projects.length}</strong></div>
      <div><span>WINS CAPTURED</span><strong>{wins.length}</strong></div>
    </section>

    <div className="grid2">
      <section className="panel"><div className="panelHead"><div><p>FOCUS</p><h2>Up next</h2></div><Link href="/tasks">All tasks →</Link></div>
        {!tasks.length ? <Empty text="No tasks yet. Capture your first next step." /> : tasks.slice(0,4).map((t: Task) => <label className="taskRow" key={t.id}><input type="checkbox" checked={t.done} onChange={() => setStore((s: Store) => ({...s,tasks:s.tasks.map(x=>x.id===t.id?{...x,done:!x.done}:x)}))}/><span className={t.done?'done':''}>{t.title}</span></label>)}
      </section>
      <section className="panel"><div className="panelHead"><div><p>CALENDAR</p><h2>Meetings</h2></div><Link href="/meetings">All meetings →</Link></div>
        {!meetings.length ? <Empty text="No meetings scheduled." /> : meetings.slice(0,4).map((m: Meeting) => <div className="row" key={m.id}><strong>{m.title}</strong><span>{m.when}</span></div>)}
      </section>
    </div>

    <section className="panel"><div className="panelHead"><div><p>MOMENTUM</p><h2>Current work</h2></div><Link href="/projects">All projects →</Link></div>
      {!projects.length ? <Empty text="No projects yet. Add work when you're ready." /> : projects.map((p: Project)=><div className="row" key={p.id}><strong>{p.title}</strong><span>{p.status}</span></div>)}
    </section>
  </>;
}

function Tasks({ tasks, store, setStore, archive, remove }: any) {
  const add = () => { const title=prompt('Task'); if(title) setStore((s:Store)=>({...s,tasks:[{id:uid(),title,done:false},...s.tasks]})); };
  return <><Header eyebrow="WORK" title="Tasks" action={<button onClick={add}>+ Add task</button>} />
  <section className="panel">{!tasks.length?<Empty text="No active tasks."/>:tasks.map((t:Task)=><div className="row actions" key={t.id}><label className="taskRow"><input type="checkbox" checked={t.done} onChange={()=>setStore((s:Store)=>({...s,tasks:s.tasks.map(x=>x.id===t.id?{...x,done:!x.done}:x)}))}/><span className={t.done?'done':''}>{t.title}</span></label><div><button className="text" onClick={()=>archive('tasks',t.id)}>Archive</button><button className="text danger" onClick={()=>remove('tasks',t.id)}>Remove</button></div></div>)}</section></>;
}

function Meetings({ meetings, setStore, archive, remove }: any) {
  const add=()=>{const title=prompt('Meeting title'); if(!title)return; const when=prompt('When?','Tomorrow, 10:00 AM')||''; setStore((s:Store)=>({...s,meetings:[{id:uid(),title,when},...s.meetings]}));};
  return <><Header eyebrow="WORK" title="Meetings" action={<button onClick={add}>+ Add meeting</button>}/><section className="panel">{!meetings.length?<Empty text="No meetings yet."/>:meetings.map((m:Meeting)=><div className="row actions" key={m.id}><div><strong>{m.title}</strong><span>{m.when}</span></div><div><button className="text" onClick={()=>archive('meetings',m.id)}>Archive</button><button className="text danger" onClick={()=>remove('meetings',m.id)}>Remove</button></div></div>)}</section></>;
}

function Projects({ projects, setStore, archive, remove }: any) {
  const add=()=>{const title=prompt('Project name'); if(title)setStore((s:Store)=>({...s,projects:[{id:uid(),title,status:'Active'},...s.projects]}));};
  return <><Header eyebrow="WORK" title="Projects" action={<button onClick={add}>+ Add project</button>}/><section className="panel">{!projects.length?<Empty text="No projects yet."/>:projects.map((p:Project)=><div className="row actions" key={p.id}><div><strong>{p.title}</strong><span>{p.status}</span></div><div><button className="text" onClick={()=>archive('projects',p.id)}>Archive</button><button className="text danger" onClick={()=>remove('projects',p.id)}>Remove</button></div></div>)}</section></>;
}

function Impact({ wins, setStore, archive, remove }: any) {
  const add=()=>{const title=prompt('What did you achieve?'); if(!title)return; const metric=prompt('Metric / result (optional)')||''; setStore((s:Store)=>({...s,wins:[{id:uid(),title,metric},...s.wins]}));};
  return <><Header eyebrow="CAREER PROOF" title="Impact" action={<button onClick={add}>+ Capture win</button>}/><section className="stats horizontal"><div><span>WINS</span><strong>{wins.length}</strong></div><div><span>WITH METRICS</span><strong>{wins.filter((w:Win)=>w.metric).length}</strong></div><div><span>READY FOR REUSE</span><strong>{wins.length}</strong></div></section><section className="panel">{!wins.length?<Empty text="No wins captured yet."/>:wins.map((w:Win)=><div className="row actions" key={w.id}><div><strong>{w.title}</strong><span>{w.metric||'No metric added'}</span></div><div><button className="text" onClick={()=>archive('wins',w.id)}>Archive</button><button className="text danger" onClick={()=>remove('wins',w.id)}>Remove</button></div></div>)}</section></>;
}

function Archive({ items, store, setStore }: any) {
  const restore=(id:string)=>setStore((s:Store)=>({
    tasks:s.tasks.map(x=>x.id===id?{...x,archived:false}:x), meetings:s.meetings.map(x=>x.id===id?{...x,archived:false}:x), projects:s.projects.map(x=>x.id===id?{...x,archived:false}:x), wins:s.wins.map(x=>x.id===id?{...x,archived:false}:x)
  }));
  return <><Header eyebrow="SYSTEM" title="Archive"/><section className="panel">{!items.length?<Empty text="Archive is empty."/>:items.map((i:any)=><div className="row actions" key={i.id}><div><strong>{i.title}</strong><span>{i.kind}</span></div><button className="text" onClick={()=>restore(i.id)}>Restore</button></div>)}</section></>;
}

function Settings({ setStore }: any) { return <><Header eyebrow="SYSTEM" title="Settings"/><section className="panel"><h2>Local data</h2><p className="bodycopy">This first GitHub build starts clean and stores entries in this browser until Supabase is connected.</p><button className="dangerButton" onClick={()=>{if(confirm('Delete all local CareerOS data?')){localStorage.removeItem(KEY);setStore(EMPTY)}}}>Reset all data</button></section></>; }
function Simple({title,body}:{title:string;body:string}) { return <><Header eyebrow="CAREER OS" title={title}/><section className="panel"><p className="bodycopy">{body}</p><Empty text="This workspace is ready for the next build slice."/></section></>; }
