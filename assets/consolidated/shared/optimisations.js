
(function(){
  var SHORT = {
    'why build a mezzanine floor?':'Why build a mezzanine',
    'why choose dynamic?':'Why choose Dynamic',
    'understanding your mezzanine floor requirements':'Your requirements',
    'what sets dynamic apart?':'What sets us apart',
    'featured projects':'Featured projects',
    'technical specifications':'Technical specs',
    'planning permit & building permit support':'Permit support',
    'mezzanine types':'Types',
    'mezzanine options':'Options',
    'faq':'FAQs',
    'is your warehouse suitable for a raised storage area?':'Warehouse suitability',
    'choose how to use the space':'Applications',
    'designed for storage and working space':'Design & structure',
    'explore other mezzanine floor solutions':'Other solutions',
    'mezzanine floor builders in melbourne':'Melbourne',
    'mezzanine floors we build in melbourne':'Applications',
    'clear-span, structural or rack-supported':'Structure',
    'is your warehouse suitable for a mezzanine floor?':'Warehouse suitability',
    'mezzanine permits and compliance in victoria':'Permits',
    'from site measure to installation':'Process',
    'melbourne mezzanine projects':'Projects',
    'why melbourne businesses choose dynamic':'Why Dynamic',
    'our mezzanine floor solutions':'Solutions'
  };
  var OFFSET = 150;

  function ready(fn){ if(document.readyState!=='loading'){fn();} else {document.addEventListener('DOMContentLoaded',fn);} }

  ready(function(){
    var scope = document.querySelector('main') || document.querySelector('.container-wrap') || document.body;
    var rail = document.getElementById('dws-toc');
    var railList = rail.querySelector('.dws-toc__list');
    var sheet = document.getElementById('dws-toc-sheet');
    var sheetList = sheet.querySelector('ul');
    var fab = document.getElementById('dws-toc-fab');
    var items = [];

    function slug(t){ return t.toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,60); }

    Array.prototype.forEach.call(scope.querySelectorAll('h2'), function(h){
      var text = (h.textContent||'').replace(/\s+/g,' ').trim();
      if(!text) return;
      var key = text.toLowerCase();
      var label = SHORT[key] || text;
      if(!h.id){ h.id = 'sec-' + slug(text); }
      h.classList.add('dws-toc-target');
      items.push({el:h, id:h.id, label:label, title:text});
    });

    if(items.length < 3){ rail.style.display='none'; fab.style.display='none'; return; }

    items.forEach(function(it){
      var li = document.createElement('li');
      li.innerHTML = '<a href="#'+it.id+'" title="'+it.title.replace(/"/g,'&quot;')+'"><span class="dws-toc__dot"></span><span class="dws-toc__label">'+it.label+'</span></a>';
      railList.appendChild(li);
      var li2 = document.createElement('li');
      li2.innerHTML = '<a href="#'+it.id+'">'+it.label+'</a>';
      sheetList.appendChild(li2);
      it.links = [li.querySelector('a'), li2.querySelector('a')];
    });

    function goTo(id){
      var t = document.getElementById(id);
      if(!t) return;
      var y = t.getBoundingClientRect().top + window.pageYOffset - OFFSET;
      window.scrollTo({top:y, behavior:'smooth'});
      if(history.replaceState){ history.replaceState(null,'','#'+id); }
    }

    [railList, sheetList].forEach(function(list){
      list.addEventListener('click', function(e){
        var a = e.target.closest ? e.target.closest('a') : null;
        if(!a || a.getAttribute('href').charAt(0) !== '#') return;
        e.preventDefault();
        e.stopPropagation();
        closeSheet();
        goTo(a.getAttribute('href').slice(1));
      }, true);
    });

    function openSheet(){ sheet.classList.add('is-open'); fab.setAttribute('aria-expanded','true'); }
    function closeSheet(){ sheet.classList.remove('is-open'); fab.setAttribute('aria-expanded','false'); }
    fab.addEventListener('click', openSheet);
    sheet.addEventListener('click', function(e){ if(e.target.hasAttribute('data-close')) closeSheet(); });
    document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeSheet(); });

    var ticking = false;
    function update(){
      ticking = false;
      var y = window.pageYOffset;
      var first = items[0].el.getBoundingClientRect().top + y;
      rail.classList.toggle('is-on', y > first - window.innerHeight*0.6);

      var current = null;
      for(var i=0;i<items.length;i++){
        if(items[i].el.getBoundingClientRect().top - OFFSET - 10 <= 0){ current = items[i]; }
      }
      if(!current && y < 10){ current = null; }
      if((window.innerHeight + y) >= document.body.offsetHeight - 4){ current = items[items.length-1]; }
      items.forEach(function(it){
        it.links.forEach(function(a){ a.classList.toggle('is-active', it === current); });
      });
      var active = rail.querySelector('a.is-active');
      if(active){
        var box = rail.querySelector('.dws-toc__inner');
        var at = active.offsetTop, ah = active.offsetHeight;
        if(at < box.scrollTop || at + ah > box.scrollTop + box.clientHeight){ box.scrollTop = at - box.clientHeight/2 + ah/2; }
      }
    }
    window.addEventListener('scroll', function(){ if(!ticking){ ticking = true; window.requestAnimationFrame(update); } }, {passive:true});
    window.addEventListener('resize', update);
    update();
  });


  /* Options: categories in the rail, their options as tabs above the panel. */
  ready(function(){
    var wrap = document.querySelector('.dws-options');
    if(!wrap) return;
    var cats = [].slice.call(wrap.querySelectorAll('.dws-options__cat'));
    var tabs = [].slice.call(wrap.querySelectorAll('.dws-options__tab'));
    var panels = [].slice.call(wrap.querySelectorAll('.dws-options__panel'));
    var sel = wrap.querySelector('.dws-options__select');
    if(!cats.length || !tabs.length || !panels.length) return;

    var lastOf = {};
    tabs.forEach(function(t){
      var c = t.getAttribute('data-cat');
      if(!lastOf[c]) lastOf[c] = t.getAttribute('data-opt');
    });

    function showPanel(id){
      panels.forEach(function(pn){
        var on = pn.id === id;
        pn.hidden = !on;
        pn.classList.toggle('is-hidden', !on);
      });
      tabs.forEach(function(t){
        var on = t.getAttribute('data-opt') === id;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      if(sel && sel.value !== id){ sel.value = id; }
      try { window.dispatchEvent(new Event('resize')); } catch(e){}
    }

    function showCat(cat, id){
      cats.forEach(function(c){
        var on = c.getAttribute('data-cat') === cat;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      tabs.forEach(function(t){ t.hidden = t.getAttribute('data-cat') !== cat; });
      showPanel(id || lastOf[cat]);
    }

    cats.forEach(function(c, i){
      c.addEventListener('click', function(){ showCat(c.getAttribute('data-cat')); });
      c.addEventListener('keydown', function(e){
        var n = e.key === 'ArrowDown' ? i+1 : e.key === 'ArrowUp' ? i-1 : -1;
        if(n < 0 || n >= cats.length) return;
        e.preventDefault(); cats[n].focus(); cats[n].click();
      });
    });
    tabs.forEach(function(t){
      t.addEventListener('click', function(){
        lastOf[t.getAttribute('data-cat')] = t.getAttribute('data-opt');
        showPanel(t.getAttribute('data-opt'));
      });
    });
    if(sel){
      sel.addEventListener('change', function(){
        var t = tabs.filter(function(x){ return x.getAttribute('data-opt') === sel.value; })[0];
        if(!t) return;
        lastOf[t.getAttribute('data-cat')] = sel.value;
        showCat(t.getAttribute('data-cat'), sel.value);
      });
    }
  });

  /* Featured projects: native scroll-snap carousel with prev/next controls. */
  ready(function(){
    var wrap = document.querySelector('.dws-projects');
    if(!wrap) return;
    var track = wrap.querySelector('.dws-projects__track');
    var items = track ? [].slice.call(track.querySelectorAll('.dws-project')) : [];
    var navs = [].slice.call(wrap.querySelectorAll('.dws-projects__nav'));
    var now = wrap.querySelector('.dws-projects__now');
    if(!track || items.length < 2) return;

    function index(){
      var mid = track.scrollLeft + track.clientWidth / 2;
      var best = 0, dist = Infinity;
      items.forEach(function(it, n){
        var c = it.offsetLeft + it.offsetWidth / 2;
        var d = Math.abs(c - mid);
        if(d < dist){ dist = d; best = n; }
      });
      return best;
    }
    function sync(){
      var n = index();
      if(now) now.textContent = n + 1;
      navs.forEach(function(b){
        var dir = parseInt(b.getAttribute('data-dir'), 10);
        b.disabled = (dir < 0 && n === 0) || (dir > 0 && n === items.length - 1);
      });
    }
    function go(dir){
      var n = Math.min(items.length - 1, Math.max(0, index() + dir));
      var target = items[n];
      track.scrollTo({
        left: target.offsetLeft - (track.clientWidth - target.offsetWidth) / 2,
        behavior: 'smooth'
      });
    }
    navs.forEach(function(b){
      b.addEventListener('click', function(){ go(parseInt(b.getAttribute('data-dir'), 10)); });
    });
    var t = false;
    track.addEventListener('scroll', function(){
      if(t) return; t = true;
      window.requestAnimationFrame(function(){ t = false; sync(); });
    }, {passive:true});
    window.addEventListener('resize', sync);
    sync();
  });
})();
