/* Mezzanine Floors Melbourne mockup: sticky CTA visibility and a mockup-only form guard. */
(function () {
  function ready(fn) { if (document.readyState !== 'loading') { fn(); } else { document.addEventListener('DOMContentLoaded', fn); } }

  ready(function () {
    // Desktop CTA rail: show once the visitor has scrolled past most of the hero.
    var rail = document.getElementById('dws-cta-rail');
    var hero = document.querySelector('.first-section') || document.querySelector('h1');
    if (rail && hero) {
      var ticking = false;
      var update = function () {
        ticking = false;
        var limit = hero.getBoundingClientRect().bottom + window.pageYOffset - window.innerHeight * 0.4;
        rail.classList.toggle('is-on', window.pageYOffset > Math.max(limit, 200));
      };
      window.addEventListener('scroll', function () { if (!ticking) { ticking = true; window.requestAnimationFrame(update); } }, { passive: true });
      window.addEventListener('resize', update);
      update();
    }
  });

  // Mockup only: stop the saved Gravity Form posting anywhere.
  function showNote(e) {
    if (e) { e.preventDefault(); e.stopImmediatePropagation(); }
    var note = document.getElementById('dws-mock-note');
    if (note) { note.hidden = false; }
  }
  document.addEventListener('submit', function (e) {
    if (e.target && e.target.id === 'gform_2') { showNote(e); }
  }, true);
  document.addEventListener('click', function (e) {
    var b = e.target && e.target.closest ? e.target.closest('#gform_submit_button_2, #gform_2 [type=submit]') : null;
    if (b) { showNote(e); }
  }, true);
  ready(function () {
    var f = document.getElementById('gform_2');
    if (f) { f.submit = function () { showNote(); }; }
  });
})();
