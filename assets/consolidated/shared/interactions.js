// Saved-page fallbacks are scoped to our controls so Salient retains its own widgets.
(function(){
 function init(){
  document.querySelectorAll('.dws-faq-button').forEach(function(button){
   button.addEventListener('click',function(){
    var group=button.closest('.dws-faq-toggles'),open=button.getAttribute('aria-expanded')!=='true';
    group.querySelectorAll('.dws-faq-button').forEach(function(b){var on=b===button&&open;b.setAttribute('aria-expanded',String(on));document.getElementById(b.getAttribute('aria-controls')).hidden=!on;b.closest('.toggle').classList.toggle('open',on);});
   });
  });
  var sheet=document.getElementById('dws-toc-sheet'),fab=document.getElementById('dws-toc-fab');
  if(!sheet||!fab)return;
  new MutationObserver(function(){var open=sheet.classList.contains('is-open');if(open){sheet.querySelector('button').focus();document.body.style.overflow='hidden';}else{document.body.style.overflow='';fab.focus();}}).observe(sheet,{attributes:true,attributeFilter:['class']});
  sheet.addEventListener('keydown',function(e){if(e.key!=='Tab')return;var focus=[].slice.call(sheet.querySelectorAll('a,button')).filter(function(el){return el.getClientRects().length;});var first=focus[0],last=focus[focus.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}});
  window.matchMedia('(min-width:1200px)').addEventListener('change',function(e){if(e.matches){sheet.classList.remove('is-open');fab.setAttribute('aria-expanded','false');}});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
