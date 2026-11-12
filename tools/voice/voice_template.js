/* Nano's recorded voice (shared by the hub and every stop).
   English phrases are spoken by pre-made clips in voice/clips/ instead of the phone's own voice.
   The clips are computer-generated speech: Microsoft Azure AI Speech, voice "Ava Multilingual", American English, slower rate.
   How it works: a phrase is split into sentences; if every sentence has a clip they play one after another.
   If any sentence has no clip, or a clip will not play (offline, blocked), the caller uses the phone voice instead.
   Spanish and the letter sounds do not come through here.
   This file is built by tools/voice/make_voice_js.py. Do not edit the MAP by hand. */
(function(){
var MAP=__MAP__;
var base=(function(){try{var s=document.currentScript.src;return s.slice(0,s.lastIndexOf('/')+1)+'clips/';}catch(e){return 'voice/clips/';}})();
var GAP=110;            /* ms of quiet between two sentences */
var WAIT=2500;          /* ms to wait for a clip to start before giving up on it */
var el=null,tok=0,curRes=null,idleRes=null,idleP=Promise.resolve(),warm=[],unlocked=false;
function audio(){if(!el){el=new Audio();el.preload='auto';}return el;}
function split(t){var m=String(t).match(/[^.!?…]+(?:[.!?…]+|$)/g)||[],out=[];for(var i=0;i<m.length;i++){var s=m[i].trim();if(s)out.push(s);}return out;}
function files(text){var parts=split(text);if(!parts.length)return null;var out=[];
  for(var i=0;i<parts.length;i++){var f=Object.prototype.hasOwnProperty.call(MAP,parts[i])?MAP[parts[i]]:null;if(!f)return null;out.push(f);}
  return {parts:parts,files:out};}
function off(){try{var o=JSON.parse(localStorage.getItem('nanoHub.v1')||'null');return !!(o&&o.clipVoice===false);}catch(e){return false;}}
function has(text){return !off()&&!!files(text);}
function endIdle(){var r=idleRes;idleRes=null;if(r)r();}
/* stop(): cut off whatever is playing; the say() that started it resolves with '' so its caller carries on */
function stop(){tok++;try{if(el){el.onended=el.onerror=el.onplaying=null;el.pause();}}catch(e){}var r=curRes;curRes=null;if(r)r('');endIdle();}
/* say(text,{onstart}) -> Promise<string>. '' = finished, or stopped by stop(). Otherwise the text still to be said by the phone voice. */
function say(text,opt){
  var f=off()?null:files(text);
  if(!f)return Promise.resolve(String(text||''));
  stop();
  var my=tok,a=audio(),i=0,started=false;
  idleP=new Promise(function(r){idleRes=r;});
  warm=f.files.slice(1,4).map(function(n){try{var p=new Audio();p.preload='auto';p.src=base+n+'.mp3';return p;}catch(e){return null;}});
  return new Promise(function(res0){
    var settledAll=false;function res(v){if(settledAll)return;settledAll=true;if(curRes===res)curRes=null;res0(v);}
    curRes=res;
    function done(rest){a.onended=a.onerror=a.onplaying=null;if(my===tok)endIdle();res(rest);}
    function rest(){return f.parts.slice(i).join(' ');}
    function next(){
      if(my!==tok)return res('');
      if(i>=f.files.length)return done('');
      var settled=false,timer=setTimeout(function(){fail();},WAIT);
      function fail(){if(settled)return;settled=true;clearTimeout(timer);if(my!==tok)return res('');try{a.pause();}catch(e){}done(rest());}
      a.onplaying=function(){clearTimeout(timer);if(!started){started=true;try{opt&&opt.onstart&&opt.onstart();}catch(e){}}};
      a.onerror=fail;
      a.onended=function(){if(settled)return;settled=true;clearTimeout(timer);if(my!==tok)return res('');i++;setTimeout(next,GAP);};
      try{a.src=base+f.files[i]+'.mp3';var p=a.play();if(p&&p.catch)p.catch(function(){if(my===tok)fail();else res('');});}catch(e){fail();}
    }
    next();
  });
}
/* resolves when nothing recorded is playing; lets the phone voice queue up behind a clip */
function idle(){return idleP;}
/* phones only let a page start sound after a touch: wake the player on the first one */
function unlock(){if(unlocked)return;unlocked=true;try{var a=audio();if(a.paused&&!a.src){a.src='data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';var p=a.play();if(p&&p.catch)p.catch(function(){});}}catch(e){}}
try{document.addEventListener('pointerdown',unlock,{capture:true,once:true});document.addEventListener('touchend',unlock,{capture:true,once:true});}catch(e){}
window.NanoVoice={has:has,say:say,stop:stop,idle:idle,count:Object.keys(MAP).length};
})();
