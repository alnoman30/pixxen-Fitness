
// ============================================
// MOBILE MENU & NAVBAR
// ============================================
 // Desktop dropdown: + / − icon toggle
    document.addEventListener('DOMContentLoaded', function () {
        const desktopDropdown = document.querySelector('.desktop-dropdown');
        const dropdownIcon = document.querySelector('.desktop-dropdown-icon');

        if (desktopDropdown && dropdownIcon) {
            desktopDropdown.addEventListener('mouseenter', function () {
                dropdownIcon.textContent = '−';
            });
            desktopDropdown.addEventListener('mouseleave', function () {
                dropdownIcon.textContent = '+';
            });
        }
    });

    // ── Mobile 2-panel menu ──
    document.addEventListener('DOMContentLoaded', function () {
        const overlay       = document.getElementById('mobile-overlay');
        const wrapper       = document.getElementById('mobile-menu-wrapper');
        const mmMain        = document.getElementById('mm-main');
        const mmServices    = document.getElementById('mm-services');
        const toggleBtn     = document.getElementById('mobile-menu-toggle');
        const closeBtn      = document.getElementById('mm-close');
        const servicesTrig  = document.getElementById('mm-services-trigger');
        const backBtn       = document.getElementById('mm-back');
        const servicesClose = document.getElementById('mm-services-close');

        function openMenu() {
            wrapper.classList.add('active');
            overlay.classList.add('active');
            wrapper.classList.remove('services-open');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            wrapper.classList.remove('active', 'services-open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        function openServices() {
            wrapper.classList.add('services-open');
        }

        function closeServices() {
            wrapper.classList.remove('services-open');
        }

        // Open via hamburger
        toggleBtn && toggleBtn.addEventListener('click', openMenu);

        // Close buttons
        closeBtn && closeBtn.addEventListener('click', closeMenu);
        servicesClose && servicesClose.addEventListener('click', closeMenu);

        // Overlay click → close
        overlay && overlay.addEventListener('click', closeMenu);

        // SERVICES → slide to panel 2
        servicesTrig && servicesTrig.addEventListener('click', openServices);

        // BACK → slide back to panel 1
        backBtn && backBtn.addEventListener('click', closeServices);

        // Close nav links (non-services) also close menu
        document.querySelectorAll('.mm-nav-link:not(button)').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Service cards close menu
        document.querySelectorAll('.mm-service-card').forEach(card => {
            card.addEventListener('click', closeMenu);
        });

        // Resize: close on desktop
        window.addEventListener('resize', function () {
            if (window.innerWidth >= 1024) closeMenu();
        });
    });







    //full width and height menu -

    (function () {

  const overlay   = document.getElementById('pixxen-menu');
  const topPanel  = document.getElementById('menu-top');
  const botPanel  = document.getElementById('menu-bottom');
  const closeBtn  = document.getElementById('menu-close');
  const openBtn   = document.getElementById('desktop-sidebar');
  const cols      = document.querySelectorAll('.nav-col');
  const logoWrap  = document.getElementById('bottom-logo');


  const DESKTOP_MIN = 1024;
  function isDesktop() { return window.innerWidth >= DESKTOP_MIN; }

  // ─── Pre-set initial states ───────────────────────────────────
  gsap.set(topPanel, { y: '-100%' });
  gsap.set(botPanel, { y: '100%' });
  gsap.set(cols,     { y: 40, opacity: 0 });
  gsap.set(logoWrap, { y: 30, opacity: 0 });

  let isOpen      = false;
  let isAnimating = false;

  // ─── OPEN ─
  function openMenu() {
    if (!isDesktop() || isOpen || isAnimating) return;
    isAnimating = true;

    document.body.classList.add('menu-open');
    overlay.classList.add('is-open');

    const tl = gsap.timeline({
      onComplete: () => { isOpen = true; isAnimating = false; }
    });

    tl.to(topPanel, { y: '0%',  duration: 0.75, ease: 'power4.out' }, 0);
    tl.to(botPanel, { y: '0%',  duration: 0.75, ease: 'power4.out' }, 0);
    tl.to(cols,     { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' }, 0.45);
    tl.to(logoWrap, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, 0.5);
  }

  // ─── CLOSE ───
  function closeMenu() {
    if (!isOpen || isAnimating) return;
    isAnimating = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isOpen = false;
        isAnimating = false;
        overlay.classList.remove('is-open');
        document.body.classList.remove('menu-open');
        gsap.set(cols,     { y: 40, opacity: 0 });
        gsap.set(logoWrap, { y: 30, opacity: 0 });
      }
    });

    tl.to([...cols].reverse(), { y: -20, opacity: 0, duration: 0.3, stagger: 0.04, ease: 'power2.in' }, 0);
    tl.to(logoWrap, { y: 20, opacity: 0, duration: 0.25, ease: 'power2.in' }, 0);
    tl.to(topPanel, { y: '-100%', duration: 0.65, ease: 'power4.in' }, 0.2);
    tl.to(botPanel, { y: '100%',  duration: 0.65, ease: 'power4.in' }, 0.2);
  }

  // Resize: viewport 
  window.addEventListener('resize', () => {
    if (!isDesktop() && isOpen) {
     
      gsap.killTweensOf([topPanel, botPanel, cols, logoWrap]);
      gsap.set(topPanel, { y: '-100%' });
      gsap.set(botPanel, { y: '100%' });
      gsap.set(cols,     { y: 40, opacity: 0 });
      gsap.set(logoWrap, { y: 30, opacity: 0 });
      overlay.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      isOpen      = false;
      isAnimating = false;
    }
  });

  // ─── Events 
  openBtn.addEventListener('click',  openMenu);
  closeBtn.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  // Prevent background scroll when menu open
  const style = document.createElement('style');
  style.textContent = `body.menu-open { overflow: hidden; }`;
  document.head.appendChild(style);

}());







//smooth scroll

// Initialize Lenis
const lenis = new Lenis({
  duration: 1.4,     
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
  direction: 'vertical', 
  gestureDirection: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1.3, 
  infinite: false,
});


lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);






//load more for industries

// Industries Load More / Show Less
const allIndustriesGrid = document.querySelector('.all-served-industries');

if (allIndustriesGrid) {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const allItems = Array.from(allIndustriesGrid.querySelectorAll('.served-industries'));
    const btnTextUp = loadMoreBtn.querySelector('.t-up');
    const btnTextDown = loadMoreBtn.querySelector('.t-down');

    const getItemsPerPage = () => window.innerWidth >= 768 ? 12 : 8;

    let currentVisible = 0;
    let isExpanded = false;

    const updateButtonText = (text) => {
        btnTextUp.textContent = text;
        btnTextDown.textContent = text;
    };

    const showItems = () => {
        const perPage = getItemsPerPage();
        currentVisible = currentVisible + perPage;

        allItems.forEach((item, index) => {
            item.style.display = index < currentVisible ? '' : 'none';
        });

        if (currentVisible >= allItems.length) {
            currentVisible = allItems.length;
            isExpanded = true;
            updateButtonText('SHOW LESS');
        }
    };

    const hideItems = () => {
        const perPage = getItemsPerPage();
        currentVisible = perPage;
        isExpanded = false;

        allItems.forEach((item, index) => {
            item.style.display = index < currentVisible ? '' : 'none';
        });

        updateButtonText('LOAD MORE');
    };

    // Initially hide all items
    allItems.forEach(item => item.style.display = 'none');

    // Show first batch on load
    showItems();

    // Toggle on click
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            if (isExpanded) {
                hideItems();
            } else {
                showItems();
            }
        });
    }
}



// ==============Pixxen Fitness js start from here (Noman) ====================
window.addEventListener("load", () => {
  const leftBars = gsap.utils.toArray("#powerLeft path");
  const rightBars = gsap.utils.toArray("#powerRight path");
  const allBars = [...leftBars, ...rightBars];

  // ===== BASE STATE (NO COLOR SHIFTING FILTERS) =====
  gsap.set(allBars, {
    opacity: 0.25,
    scale: 0.95,
    transformOrigin: "bottom"
  });

  // ===== CLEAN FLICKER (NO BRIGHTNESS) =====
  function flicker(el) {
    gsap.to(el, {
      opacity: 1,
      duration: 0.05,
      yoyo: true,
      repeat: 1,
      ease: "none"
    });
  }

  // ===== RANDOM SPARKS =====
  function randomSpark(bars, times = 8, speed = 90) {
    for (let i = 0; i < times; i++) {
      setTimeout(() => {
        const el = bars[Math.floor(Math.random() * bars.length)];
        flicker(el);
      }, i * speed);
    }
  }

  const tl = gsap.timeline({ delay: 0.2 });

  // ===== RIGHT SIDE BUILD =====
  tl.to(rightBars, {
    opacity: 1,
    scale: 1,
    duration: 0.3,
    stagger: 0.05,
    ease: "power2.out",
    onStart: () => randomSpark(rightBars, 10, 70)
  })

  // ===== LEFT SIDE BUILD =====
  .to(leftBars, {
    opacity: 1,
    scale: 1,
    duration: 0.3,
    stagger: { each: 0.05, from: "end" },
    ease: "power2.out",
    onStart: () => randomSpark(leftBars, 10, 70)
  }, "-=0.15")

  // ===== FINAL ENERGY PULSE (NO FILTERS) =====
  .to(allBars, {
    opacity: 1,
    scale: 1.02,
    duration: 0.15,
    yoyo: true,
    repeat: 1,
    ease: "power1.inOut"
  })

  // ===== PRICE TAG (SMOOTH + PREMIUM REVEAL) =====
  .fromTo("#priceTag",
    {
      scale: 0.9,
      opacity: 0,
      filter: "blur(5px)",
      rotation: -2
    },
    {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      rotation: 0,
      duration: 1.1,
      ease: "power3.out"
    },
    "-=0.1"
  );

  // ===== CLEAN NEON GLOW (ONLY ONE LAYER, NO COLOR SHIFT) =====
  gsap.to("#powerLeft, #powerRight", {
    filter: "drop-shadow(0 0 10px #B2FF00)",
    duration: 1.4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // ===== PRICE TAG SOFT BREATH (NO OVERPOWERED SHADOW) =====
  gsap.to("#priceTag", {
    textShadow: "0 0 12px #B2FF00",
    scale: 1.02,
    duration: 2.2,
    yoyo: true,
    repeat: 1,
    ease: "sine.inOut",
    onComplete: () => {
      gsap.set("#priceTag", {
        scale: 1,
        textShadow: "0 0 8px #B2FF00"
      });
    }
  });
});

// fitness counter animation
document.addEventListener('DOMContentLoaded', () => {

    const counters = document.querySelectorAll('.fitness-counter');

    function formatNum(n, format) {
        return format === 'comma'
            ? n.toLocaleString()
            : n;
    }

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const el = entry.target;

            if (el.dataset.animated === 'true') return;

            el.dataset.animated = 'true';

            const target = parseInt(el.dataset.target);
            const suffix = el.dataset.suffix || '';
            const prefix = el.dataset.prefix || '';
            const format = el.dataset.format || '';

            const duration = 1800;
            const steps = 60;
            const increment = target / steps;
            const interval = duration / steps;

            let current = 0;

            const timer = setInterval(() => {

                current += increment;

                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }

                el.textContent =
                    prefix +
                    formatNum(Math.round(current), format) +
                    suffix;

            }, interval);

            observer.unobserve(el);

        });

    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });

});


// Service section js
const svcRows = document.querySelectorAll('.svc-row');

if (svcRows.length > 0) {
  // Assign bg images & preload
  svcRows.forEach(row => {
    row.querySelector('.svc-bg').style.backgroundImage = `url(${row.dataset.img})`;
    new Image().src = row.dataset.img;
  });

  // Entrance animation
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .to('.svc-row', { opacity: 1, y: 0, duration: 0.6, stagger: 0.09 }, '-=0.45');

  // Hover animations
  svcRows.forEach(row => {
    const bg = row.querySelector('.svc-bg');
    const overlay = row.querySelector('.svc-overlay');
    const shimmer = row.querySelector('.svc-shimmer');
    const name = row.querySelector('.svc-name');
    const descs = row.querySelectorAll('[class*="text-white/60"]');

    row.addEventListener('mouseenter', () => {
      gsap.killTweensOf([bg, overlay, shimmer, name, ...descs]);

      gsap.to(bg, { opacity: 1, scale: 1, duration: 0.65, ease: 'power2.out' });
      gsap.to(overlay, { opacity: 1, duration: 0.5, ease: 'power2.out' });

      gsap.fromTo(
        shimmer,
        { left: '-70%', opacity: 1 },
        { left: '120%', opacity: 1, duration: 0.75, ease: 'power1.inOut' }
      );

      gsap.to(name, { y: -4, duration: 0.4, ease: 'power2.out' });
      gsap.to(descs, { color: 'rgba(255,255,255,0.9)', duration: 0.35 });
    });

    row.addEventListener('mouseleave', () => {
      gsap.killTweensOf([bg, overlay, name, ...descs]);

      gsap.to(bg, { opacity: 0, scale: 1.08, duration: 0.55, ease: 'power2.inOut' });
      gsap.to(overlay, { opacity: 0, duration: 0.4, ease: 'power2.in' });
      gsap.to(name, { y: 0, duration: 0.35, ease: 'power2.out' });
      gsap.to(descs, { color: 'rgba(255,255,255,0.6)', duration: 0.35 });
    });
  });
}

// Section divider animation

document.querySelectorAll(".fitness-energy-divider").forEach(section => {

    const beam = section.querySelector(".fitness-energy-beam");
    const core = section.querySelector(".fitness-energy-core");

    const paths = [
        ...section.querySelectorAll("path")
    ];


function createSparks(){

    for(let i = 0; i < 80; i++){

        const spark = document.createElement("div");
        spark.className = "fitness-energy-spark";
        section.appendChild(spark);


        gsap.set(spark, {

            x: gsap.utils.random(
                0,
                section.offsetWidth
            ),

            y: gsap.utils.random(
                -20,
                160
            ),

            scale: gsap.utils.random(.8, 2),
            opacity: gsap.utils.random(.6, 1)

        });


        gsap.to(spark, {

            x: `+=${gsap.utils.random(-160,160)}`,
            y: `+=${gsap.utils.random(-140,140)}`,

            scale: 0,

            opacity:0,

            duration: gsap.utils.random(.7,1.8),

            delay: Math.random() * .8,

            ease:"power2.out",

            onComplete:()=>spark.remove()

        });

    }

}


    function activate(){

        // stop previous animation cleanly
        gsap.killTweensOf(paths);
        gsap.killTweensOf(beam);
        gsap.killTweensOf(core);


        // reset without glow
        gsap.set(paths, {

            fill:"#212121",
            opacity:.75

        });


        gsap.set([beam, core], {

            x:-250,
            opacity:.2

        });



        const tl = gsap.timeline();



        /*
            SLOW ENERGY SWEEP
        */

        tl.to([beam, core], {

            x: window.innerWidth + 400,
            opacity:1,
            duration:2,
            ease:"power2.inOut",

            onStart:createSparks

        });



        /*
            ENERGY TRAVELS THROUGH BARS
        */

        paths.forEach((path, i) => {


            tl.to(path, {

                fill:"#ffffff",
                opacity:1,
                duration:.14,
                ease:"power1.out"

            }, i * .075);


            tl.to(path, {

                opacity:.85,
                duration:.7,
                ease:"power2.out"

            }, i * .075 + .14);


        });



        /*
            FINAL ENERGY BLOOM (NO GLOW)
        */

        tl.to(paths, {

            opacity:1,

            stagger:{

                each:.035,
                from:"end"

            },

            duration:.45,
            ease:"power2.out"

        });



        /*
            KEEP POWER ACTIVE (NO GLOW)
        */

        gsap.to(paths, {

            opacity:.75,
            duration:2.8,
            repeat:-1,
            yoyo:true,
            ease:"sine.inOut"

        });



        gsap.to([beam, core], {

            opacity:.55,
            duration:3,
            repeat:-1,
            yoyo:true,
            ease:"sine.inOut"

        });

    }



    ScrollTrigger.create({

        trigger:section,
        start:"top 80%",

        onEnter:activate,
        onEnterBack:activate

    });


});

// Fitness magnet svg animate
document.querySelectorAll(".fitness-magnet-item").forEach((item) => {
  const icon = item.querySelector(".fitness-magnet-item-svg");
  let bounds;

  item.addEventListener("mouseenter", () => {
    bounds = item.getBoundingClientRect();
  });

  item.addEventListener("mousemove", (e) => {
    if (!bounds || !icon) return;

    const x = e.clientX - bounds.left - bounds.width / 2;
    const y = e.clientY - bounds.top - bounds.height / 2;

    gsap.to(icon, {
      x: x * 0.08,
      y: y * 0.08,
      duration: 1.2,
      ease: "power2.out"
    });
  });

  item.addEventListener("mouseleave", () => {
    gsap.to(icon, {
      x: 0,
      y: 0,
      duration: 1.4,
      ease: "elastic.out(1, 0.3)"
    });
  });
});







function initFAQ(section) {
  const faqItems = section.querySelectorAll('.faq-item');
  if (faqItems.length === 0) return;
 
  faqItems.forEach(item => {
    const trigger   = item.querySelector('.faq-trigger');
    const content   = item.querySelector('.faq-content');
    const border    = item.querySelector('.faq-border');
    const iconClose = item.querySelector('.icon-close');
    if (!trigger) return;
 
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
 
      faqItems.forEach(other => {
        if (other !== item && other.classList.contains('active')) {
          other.classList.remove('active');
          const oc = other.querySelector('.faq-content');
          const ob = other.querySelector('.faq-border');
          const oC = other.querySelector('.icon-close');
          if (oc) oc.style.maxHeight = '0';
          if (ob) ob.classList.add('hidden');
          if (oC) oC.style.transform = 'rotate(0deg)';
        }
      });
 
      if (isOpen) {
        item.classList.remove('active');
        if (content)   content.style.maxHeight = '0';
        if (border)    border.classList.add('hidden');
        if (iconClose) iconClose.style.transform = 'rotate(0deg)';
      } else {
        item.classList.add('active');
        if (content)   content.style.maxHeight = content.scrollHeight + 'px';
        if (border)    border.classList.remove('hidden');
        if (iconClose) iconClose.style.transform = 'rotate(45deg)';
      }
    });
  });
}
 
function initFAQGrid(section) {
  const wrap = section.querySelector('.faqGridWrap');
  if (!wrap) return;
 
  const items = Array.from(wrap.querySelectorAll('.faq-item'));
  if (items.length === 0) return;
 
  const leftCol  = document.createElement('div');
  const rightCol = document.createElement('div');
  leftCol.className  = 'flex flex-col w-full md:w-1/2';
  rightCol.className = 'flex flex-col w-full md:w-1/2';
 
  items.forEach((item, i) => {
    if (i % 2 === 0) leftCol.appendChild(item);
    else             rightCol.appendChild(item);
  });
 
  wrap.innerHTML = '';
  wrap.className = 'faqGridWrap flex flex-col md:flex-row md:gap-16 items-start';
  wrap.appendChild(leftCol);
  wrap.appendChild(rightCol);
}
 
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.home-comparison-faq').forEach(section => {
    initFAQGrid(section);
    initFAQ(section);
  });
});