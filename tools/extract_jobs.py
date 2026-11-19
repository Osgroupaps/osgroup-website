# Engangs-udtræk: læser de eksisterende jobkort fra siden og gemmer dem i jobs.json
import re,json
from bs4 import BeautifulSoup
h=open('aabne-stillinger/index.html').read()
s=BeautifulSoup(h,'html.parser')
jobs=[]
for a in s.find_all('article'):
    if not a.find('details'):continue
    title=a.find('h2').get_text(strip=True)
    spans=[x.get_text(strip=True) for x in a.find('h2').find_next_sibling('div').find_all('span') if x.get_text(strip=True)!='•']
    loc=spans[0].replace('Lokation:','').strip();dl=spans[1].replace('Deadline:','').strip() if len(spans)>1 else ''
    intro=a.find('section').get_text(' ',strip=True)
    secs=[]
    for sec in a.find('details').find_all('section'):
        hd=sec.find('h3').get_text(strip=True)
        items=[li.get_text(' ',strip=True) for li in sec.find_all('li')]
        paras=[p.get_text(' ',strip=True) for p in sec.find_all('p')]
        secs.append({'heading':hd,'items':items,'paras':paras})
    mail=a.find('a',href=re.compile('^mailto'))['href'].replace('&amp;','&')
    jobs.append({'id':re.sub(r'[^a-z0-9]+','-',title.lower()).strip('-'),'title':title,'location':loc,'deadline':dl,'intro':intro,'sections':secs,'status':'aktiv'})
json.dump(jobs,open('jobs.json','w'),ensure_ascii=False,indent=1)
print(len(jobs),[j['title'] for j in jobs]);print([ (s['heading'],len(s['items']),len(s['paras'])) for s in jobs[0]['sections']])
