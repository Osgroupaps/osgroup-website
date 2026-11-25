#!/usr/bin/env python3
"""Henter aktuelle jobopslag fra udbudsplatformen (udbud.osgroup.dk) og opdaterer jobs.json.
Opslag med "source": "udbud:<id>" styres helt af platformen: nye kommer til, og dem hvis udbud
er slettet, udløbet eller ikke længere aktivt, fjernes. Håndskrevne opslag (uden source) røres ikke.
Kør:  python3 tools/sync_jobs.py && python3 tools/build_jobs.py"""
import json, sys, urllib.request
URL = 'https://shuzrwhgosgldjohoxew.supabase.co/functions/v1/udbud-jobs'
try:
    with urllib.request.urlopen(urllib.request.Request(URL, headers={'User-Agent': 'osgroup-site-sync'}), timeout=60) as r:
        data = json.load(r)
    remote = data['jobs']
    assert isinstance(remote, list)
except Exception as e:
    # Ved fejl ændres intet, så hjemmesiden aldrig tømmes ved en midlertidig fejl
    print('Kunne ikke hente opslag fra udbudsplatformen:', e); sys.exit(0)
jobs = json.load(open('jobs.json'))
manual = [j for j in jobs if not str(j.get('source', '')).startswith('udbud:')]
ids = {j['id'] for j in manual}
synced = [j for j in remote if j['id'] not in ids]
new = synced + manual
if json.dumps(new, sort_keys=True) == json.dumps(jobs, sort_keys=True):
    print('Ingen ændringer'); sys.exit(0)
json.dump(new, open('jobs.json', 'w'), ensure_ascii=False, indent=1)
print(f'{len(synced)} opslag fra udbudsplatformen, {len(manual)} håndskrevne')
