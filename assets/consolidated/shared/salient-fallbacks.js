/* Local mockup fallbacks. Production uses Salient's native Slider and Toggles scripts. */
(function(){
  function ready(callback){
    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', callback);
    else callback();
  }
  ready(function(){
    document.querySelectorAll('.dws-native-hero-slider').forEach(function(slider){
      var slides = [].slice.call(slider.querySelectorAll('.swiper-wrapper > .swiper-slide:not(.swiper-slide-duplicate)[data-dws-slide-index]'));
      var dots = [].slice.call(slider.querySelectorAll('.dws-hero-dots button'));
      slider.querySelectorAll('.swiper-slide.dws-active').forEach(function(slide){ slide.classList.remove('dws-active'); });
      var current = 0;
      var timer;
      function show(index){
        current = (index + slides.length) % slides.length;
        slides.forEach(function(slide, i){ slide.classList.toggle('dws-active', i === current); });
        dots.forEach(function(dot, i){
          if(i === current) dot.setAttribute('aria-current', 'true');
          else dot.removeAttribute('aria-current');
        });
      }
      function play(){
        clearInterval(timer);
        if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches && !document.hidden){
          timer = setInterval(function(){ show(current + 1); }, Number(slider.dataset.autorotate) || 6000);
        }
      }
      slider.querySelector('.dws-hero-prev')?.addEventListener('click', function(){ show(current - 1); play(); });
      slider.querySelector('.dws-hero-next')?.addEventListener('click', function(){ show(current + 1); play(); });
      dots.forEach(function(dot){ dot.addEventListener('click', function(){ show(Number(dot.dataset.slide)); play(); }); });
      slider.addEventListener('mouseenter', function(){ clearInterval(timer); });
      slider.addEventListener('mouseleave', play);
      document.addEventListener('visibilitychange', play);
      show(0);
      play();
    });

    document.querySelectorAll('.dws-native-faq .toggle-title a').forEach(function(link){
      var initialToggle = link.closest('.toggle');
      var initialAnswer = initialToggle && initialToggle.querySelector(':scope > div');
      if(initialAnswer){
        initialAnswer.style.display = 'block';
        initialAnswer.style.maxHeight = initialToggle.classList.contains('open') ? initialAnswer.scrollHeight + 'px' : '0px';
      }
      link.addEventListener('click', function(event){
        event.preventDefault();
        event.stopImmediatePropagation();
        var toggle = link.closest('.toggle');
        var group = toggle.closest('.toggles');
        var wasOpen = toggle.classList.contains('open');
        group.querySelectorAll('.toggle').forEach(function(item){
          item.classList.remove('open');
          item.querySelector('.toggle-title a')?.setAttribute('aria-expanded', 'false');
          var icon = item.querySelector('.toggle-title i');
          icon?.classList.remove('fa-minus-circle');
          icon?.classList.add('fa-plus-circle');
          var answer = item.querySelector(':scope > div');
          if(answer){
            answer.style.display = 'block';
            answer.style.maxHeight = '0px';
          }
        });
        if(!wasOpen){
          toggle.classList.add('open');
          link.setAttribute('aria-expanded', 'true');
          var icon = toggle.querySelector('.toggle-title i');
          icon?.classList.remove('fa-plus-circle');
          icon?.classList.add('fa-minus-circle');
          var answer = toggle.querySelector(':scope > div');
          if(answer){
            answer.style.display = 'block';
            answer.style.maxHeight = answer.scrollHeight + 'px';
          }
        }
      }, true);
    });
    /* Superfish dropdown reveal: the saved theme CSS already shows a submenu
       via ".sfHover", but that class is normally added by the Superfish
       plugin script, which isn't part of a saved page. Reproduce it with
       hover + keyboard focus so the consolidated nav dropdown works. */
    document.querySelectorAll('#header-outer nav li.menu-item-has-children').forEach(function(li){
      li.addEventListener('mouseenter', function(){ li.classList.add('sfHover'); });
      li.addEventListener('mouseleave', function(){ li.classList.remove('sfHover'); });
      li.addEventListener('focusin', function(){ li.classList.add('sfHover'); });
      li.addEventListener('focusout', function(e){
        if(!li.contains(e.relatedTarget)) li.classList.remove('sfHover');
      });
    });
  });
})();
