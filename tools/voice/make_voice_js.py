"""Builds voice/voice.js from tools/voice/voice_list.json. Only sentences whose clip exists in voice/clips/ go into the MAP.
Run from the repo root:  python3 tools/voice/make_voice_js.py"""
import json,os
L=json.load(open('tools/voice/voice_list.json'))
m={i['t']:i['f'][:-4] for i in L if os.path.exists('voice/clips/'+i['f'])}
miss=[i['t'] for i in L if i['t'] not in m]
js=open('tools/voice/voice_template.js').read().replace('__MAP__',json.dumps(m,ensure_ascii=False,separators=(',',':')))
open('voice/voice.js','w').write(js)
print(len(m),'sentences with clips;',len(miss),'in the list without a clip',miss[:5])
