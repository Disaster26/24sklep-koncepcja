(function(){
var d=document,top=d.getElementById('top'),ham=d.getElementById('ham');
ham.addEventListener('click',function(){akt();var o=top.classList.toggle('otw');ham.setAttribute('aria-expanded',o)});
d.querySelectorAll('.menu a').forEach(function(a){a.addEventListener('click',function(){top.classList.remove('otw');ham.setAttribute('aria-expanded',false)})});
// aktywna pozycja menu
var linki=[].slice.call(d.querySelectorAll('.menu a'));
var sek=linki.map(function(a){return d.querySelector(a.getAttribute('href'))}).filter(Boolean);
function akt(){var y=scrollY+120,cur=linki[0];sek.forEach(function(s,i){if(s.offsetTop<=y)cur=linki[i]});
 if(scrollY<200)cur=linki[0];linki.forEach(function(a){a.classList.toggle('akt',a===cur)})}
addEventListener('scroll',akt,{passive:true});
// karuzele: strzalki + przeciaganie mysza
d.querySelectorAll('.strzalki button').forEach(function(b){b.addEventListener('click',function(){var t=d.getElementById(b.dataset.tor),k=t.firstElementChild;
 t.scrollBy({left:(k.getBoundingClientRect().width+16)*+b.dataset.k,behavior:'smooth'})})});
d.querySelectorAll('.tor').forEach(function(t){var x0,s0,ruch=false,wcis=false;
 t.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;wcis=true;ruch=false;x0=e.clientX;s0=t.scrollLeft});
 addEventListener('pointermove',function(e){if(!wcis)return;var dx=e.clientX-x0;if(Math.abs(dx)>5){ruch=true;t.classList.add('ciag')}if(ruch)t.scrollLeft=s0-dx});
 addEventListener('pointerup',function(){if(!wcis)return;wcis=false;t.classList.remove('ciag');if(ruch){var k=t.firstElementChild.getBoundingClientRect().width+16;t.scrollTo({left:Math.round(t.scrollLeft/k)*k,behavior:'smooth'})}});
 t.addEventListener('click',function(e){if(ruch){e.preventDefault();e.stopPropagation();ruch=false}},true)});
// koszyk pokazowy
var ile=0,ileEl=d.getElementById('ile');
d.querySelectorAll('.dokosz').forEach(function(b){b.addEventListener('click',function(){ile++;ileEl.textContent=ile;b.classList.add('ok');b.textContent='W koszyku';setTimeout(function(){b.classList.remove('ok');b.textContent='Do koszyka'},1800)})});
// lightbox
var lb=d.getElementById('lb'),lbi=lb.querySelector('img'),lbp=lb.querySelector('p'),zd=[].slice.call(d.querySelectorAll('.real img')),i=0;
function pokaz(n){i=(n+zd.length)%zd.length;lbi.src=zd[i].dataset.duze;lbi.alt=zd[i].alt;lbp.textContent=zd[i].alt;lb.classList.add('wid')}
zd.forEach(function(z,n){z.addEventListener('click',function(){pokaz(n)})});
lb.querySelector('.zam').onclick=function(){lb.classList.remove('wid')};
lb.querySelector('.pop').onclick=function(){pokaz(i-1)};lb.querySelector('.nas').onclick=function(){pokaz(i+1)};
lb.addEventListener('click',function(e){if(e.target===lb)lb.classList.remove('wid')});
d.addEventListener('keydown',function(e){if(!lb.classList.contains('wid'))return;if(e.key==='Escape')lb.classList.remove('wid');if(e.key==='ArrowLeft')pokaz(i-1);if(e.key==='ArrowRight')pokaz(i+1)});
var sx;lb.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
lb.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>50)pokaz(i+(dx<0?1:-1))});
// pasek mobilny po przewinieciu za hero
var mob=d.getElementById('mob'),hero=d.getElementById('hero');
if('IntersectionObserver' in window){new IntersectionObserver(function(e){mob.classList.toggle('widac',!e[0].isIntersecting)},{threshold:0}).observe(d.querySelector('.szukaj'))}
// mapa przy przewinieciu
var m=d.getElementById('mapa');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){var f=d.createElement('iframe');f.src=m.dataset.src;f.title='Mapa dojazdu: Niepodległości 24, Świdnik';f.loading='lazy';f.referrerPolicy='no-referrer-when-downgrade';m.appendChild(f);io.disconnect()}},{rootMargin:'300px'});io.observe(m)}
d.getElementById('rok').textContent=new Date().getFullYear();
window.wyslij=function(e){e.preventDefault();d.getElementById('ok').style.display='block';return false};
})();
