#!/usr/bin/env python3
"""Bygger jobkortene på /aabne-stillinger/ ud fra jobs.json.
Kør:  python3 tools/build_jobs.py
Kun opslag med status 'aktiv' vises. Siden er ren HTML (ingen script), så den kan læses af Google."""
import json,re,html,urllib.parse as up
P='aabne-stillinger/index.html'
E=lambda s:html.escape(s,quote=False)
CHK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="mt-0.5 h-4 w-4 shrink-0"><circle cx="12" cy="12" r="9"></circle><path d="m8.5 12.5 2.2 2.2 4.8-5.4"></path></svg>'
ARW='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="h-4 w-4"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg>'
def card(j):
    meta=f'<span>Lokation: {E(j["location"])}</span>'
    if j.get('deadline'):meta+=f'<span class="text-[#233137] dark:text-foreground">•</span><span>Deadline: {E(j["deadline"])}</span>'
    secs=''
    for s in j['sections']:
        if s.get('items'):
            body='<ul class="mt-3 space-y-2 text-sm font-semibold text-[#233137] dark:text-foreground">'+''.join(f'<li class="flex gap-2.5">{CHK}<span>{E(i)}</span></li>' for i in s['items'])+'</ul>'
        else:
            body=''.join(f'<p class="mt-3">{E(p)}</p>' for p in s.get('paras',[]))
        secs+=f'<section><h3 class="font-black text-[#233137] dark:text-foreground">{E(s["heading"])}</h3>{body}</section>'
    subj=j['title']+' - konsulentprofil'
    mail='mailto:kontakt@osgroup.dk?subject='+up.quote(subj,safe='')+'&amp;body='+up.quote('Hej OS Group\n\nJeg vedhæfter mit CV til denne mail.\n\nMed venlig hilsen\n',safe='')
    return ('<article class="group/job flex h-full flex-col rounded-[1.35rem] border border-border bg-card p-3 shadow-lg shadow-slate-950/5 sm:p-5"><div class="flex flex-1 flex-col rounded-[1.1rem] bg-secondary p-3.5 sm:p-5"><p class="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Aktuel stilling</p>'
    f'<h2 class="mt-2 text-2xl font-black tracking-tight text-[#233137] lg:text-[1.65rem] dark:text-foreground">{E(j["title"])}</h2>'
    f'<div class="mt-2 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground sm:text-sm">{meta}</div>'
    f'<section class="mt-4 max-h-24 overflow-hidden text-sm leading-6 text-muted-foreground group-has-[[open]]/job:max-h-none group-has-[[open]]/job:overflow-visible sm:text-base sm:leading-7"><p class="mt-1.5">{E(j["intro"])}</p></section>'
    '<div class="pointer-events-none -mt-10 h-10 bg-gradient-to-t from-secondary to-transparent group-has-[[open]]/job:hidden"></div>'
    f'<details class="group mt-3"><summary class="inline-flex cursor-pointer list-none items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-black text-[#233137] transition hover:-translate-y-0.5 hover:shadow-md dark:text-foreground [&amp;::-webkit-details-marker]:hidden"><span class="group-open:hidden">Læs mere</span><span class="hidden group-open:inline">Vis mindre</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="h-4 w-4 transition group-open:rotate-90"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg></summary><div class="mt-5 space-y-5 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">{secs}</div></details></div>'
    f'<div class="mt-3 grid grid-cols-2 gap-2"><a href="{mail}" class="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-[#233137] px-3 py-2.5 text-center text-xs font-bold text-white transition hover:-translate-y-0.5 hover:shadow-md sm:text-sm dark:bg-primary dark:text-primary-foreground">Send din profil{ARW}</a><a href="/#kontakt" class="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2.5 text-center text-xs font-bold transition hover:-translate-y-0.5 hover:shadow-md sm:text-sm">Kontakt os først</a></div></article>')
def main():
    jobs=[j for j in json.load(open('jobs.json')) if j.get('status','aktiv')=='aktiv']
    h=open(P).read()
    start='<div class="grid gap-4 lg:grid-cols-2">'
    a=h.index(start)+len(start)
    b=h.index('</div><article class="flex flex-col gap-4 rounded-[1.35rem] border border-border',a)
    new=''.join(card(j) for j in jobs)
    if not jobs:new=''
    open(P,'w').write(h[:a]+new+h[b:])
    print(len(jobs),'opslag bygget')
main()
