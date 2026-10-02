/**
 * ============================================================================
 * LUXURY PAKISTANI WEDDING INVITATION — JAVASCRIPT CONTROLLER
 * Full-screen Interactive Experience
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. DOM ELEMENT REFERENCES
  // --------------------------------------------------------------------------
  const body = document.body;
  const envelopeScene = document.getElementById('envelopeScene');
  const envelope3d = document.getElementById('envelope3d');
  const btnOpenInvitation = document.getElementById('btnOpenInvitation');
  const envFlap = document.getElementById('envFlap');
  const waxSeal = document.getElementById('waxSeal');
  const envCardInsert = document.getElementById('envCardInsert');
  const envelopeExteriorContent = document.getElementById('envelopeExteriorContent');
  
  const mainInvitation = document.getElementById('mainInvitation');
  const navbar = document.getElementById('navbar');
  const btnCloseInvitation = document.getElementById('btnCloseInvitation');
  const btnFooterClose = document.getElementById('btnFooterClose');
  const mobileCloseCardBtn = document.getElementById('mobileCloseCardBtn');
  
  // Mobile Nav
  const mobileMenuTrigger = document.getElementById('mobileMenuTrigger');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

  // Audio elements
  const audioControl = document.getElementById('audioControl');
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  const bgAudio = document.getElementById('bgAudio');
  
  // Gallery Lightbox
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');

  // RSVP Form
  const rsvpForm = document.getElementById('rsvpForm');
  const rsvpSuccessCard = document.getElementById('rsvpSuccessCard');
  const btnResetRsvp = document.getElementById('btnResetRsvp');
  const rsvpNameInput = document.getElementById('rsvpName');
  const nameError = document.getElementById('nameError');
  const btnSubmitRsvp = document.getElementById('btnSubmitRsvp');

  // Navigation Links & Scroll Spy
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.screen-section');

  let isAnimating = false;
  let isMusicPlaying = false;
  let currentLightboxIndex = 0;

  // --------------------------------------------------------------------------
  // 2. GOLD PARTICLE CANVAS ENGINE
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Particle {
    constructor(x, y, isBurst = false) {
      this.x = x !== undefined ? x : Math.random() * width;
      this.y = y !== undefined ? y : Math.random() * height;
      this.size = Math.random() * 2.8 + 0.8;
      
      if (isBurst) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.008;
      } else {
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = -(Math.random() * 0.7 + 0.2); // Gentle upwards drift
        this.alpha = Math.random() * 0.7 + 0.2;
        this.decay = 0;
      }
      
      // Warm gold & ivory hues
      const colors = ['#f5e0a0', '#d4af37', '#e6ca65', '#ffffff', '#c5a059'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.shimmerSpeed = Math.random() * 0.05 + 0.02;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.decay > 0) {
        this.alpha -= this.decay;
      } else {
        // Shimmer opacity
        this.alpha += Math.sin(Date.now() * this.shimmerSpeed) * 0.01;
        if (this.alpha < 0.1) this.alpha = 0.1;
        if (this.alpha > 0.8) this.alpha = 0.8;

        // Wrap around screen
        if (this.y < 0) this.y = height;
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      
      // Star / Diamond shape for sparkle
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Populate initial particles
  const particleCount = Math.min(Math.floor((width * height) / 16000), 75);
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function triggerParticleBurst(x, y, count = 40) {
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(x, y, true));
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw();

      // Remove dead burst particles
      if (p.decay > 0 && p.alpha <= 0) {
        particles.splice(i, 1);
      }
    }

    requestAnimationFrame(animateParticles);
  }
  animateParticles();


  // --------------------------------------------------------------------------
  // 3. CINEMATIC MULTI-STEP OPENING ANIMATION SEQUENCE
  // --------------------------------------------------------------------------
  btnOpenInvitation.addEventListener('click', openInvitationCinematic);

  function openInvitationCinematic() {
    if (isAnimating) return;
    isAnimating = true;

    // Optional: Start music on user click if available
    tryStartAudio();

    // Step 1: Button and exterior text fade away smoothly
    btnOpenInvitation.style.pointerEvents = 'none';
    btnOpenInvitation.style.opacity = '0';
    btnOpenInvitation.style.transform = 'scale(0.9)';
    btnOpenInvitation.style.transition = 'all 0.5s ease';

    if (envelopeExteriorContent) {
      envelopeExteriorContent.style.opacity = '0';
      envelopeExteriorContent.style.transition = 'opacity 0.6s ease';
    }

    // Step 2: Golden wax seal begins glowing with warm light pulses
    setTimeout(() => {
      waxSeal.classList.add('is-glowing');
      
      const sealRect = waxSeal.getBoundingClientRect();
      triggerParticleBurst(sealRect.left + sealRect.width / 2, sealRect.top + sealRect.height / 2, 25);
    }, 400);

    // Step 3: Envelope flap unlatches and swings back in 3D
    setTimeout(() => {
      envelope3d.classList.add('is-opening');
    }, 900);

    // Step 4: Inner invitation rises slowly from envelope pocket
    setTimeout(() => {
      // Step 5: Card expands towards screen
      const cardRect = envCardInsert.getBoundingClientRect();
      triggerParticleBurst(cardRect.left + cardRect.width / 2, cardRect.top + 60, 45);
    }, 1600);

    // Step 6: Background transitions from opening scene into main invitation environment
    setTimeout(() => {
      envelopeScene.classList.add('is-hidden');
      mainInvitation.classList.add('is-active');
      body.classList.remove('is-closed');
      
      // Step 7, 8, 9: Staggered reveal of sections & scroll observer active
      triggerRevealAnimations();
      
      // Reset animation lock
      setTimeout(() => {
        isAnimating = false;
      }, 800);
    }, 2400);
  }


  // --------------------------------------------------------------------------
  // 4. REVERSIBLE 3D CLOSING ANIMATION SEQUENCE
  // --------------------------------------------------------------------------
  function closeInvitationCinematic() {
    if (isAnimating) return;
    isAnimating = true;

    // Close mobile drawer if open
    mobileDrawer.classList.remove('is-open');

    // Smoothly scroll to the very top first
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Step 1: Main invitation fades out smoothly
    setTimeout(() => {
      mainInvitation.classList.remove('is-active');
      envelopeScene.classList.remove('is-hidden');
      body.classList.add('is-closed');

      // Step 2: Card folds back into envelope
      setTimeout(() => {
        envelope3d.classList.remove('is-opening');
        waxSeal.classList.remove('is-glowing');

        // Step 3: Envelope flap folds back down, seal returns
        setTimeout(() => {
          if (envelopeExteriorContent) {
            envelopeExteriorContent.style.opacity = '1';
          }
          btnOpenInvitation.style.opacity = '1';
          btnOpenInvitation.style.transform = 'scale(1)';
          btnOpenInvitation.style.pointerEvents = 'auto';

          const sealRect = waxSeal.getBoundingClientRect();
          triggerParticleBurst(sealRect.left + sealRect.width / 2, sealRect.top + sealRect.height / 2, 20);

          isAnimating = false;
        }, 1100);

      }, 600);

    }, 300);
  }

  // Hook all Close Invitation buttons
  if (btnCloseInvitation) btnCloseInvitation.addEventListener('click', closeInvitationCinematic);
  if (btnFooterClose) btnFooterClose.addEventListener('click', closeInvitationCinematic);
  if (mobileCloseCardBtn) mobileCloseCardBtn.addEventListener('click', closeInvitationCinematic);


  // --------------------------------------------------------------------------
  // 5. NAVBAR SCROLL SPY & BEHAVIOR
  // --------------------------------------------------------------------------
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  mobileMenuTrigger.addEventListener('click', () => {
    mobileDrawer.classList.toggle('is-open');
  });

  mobileNavItems.forEach(item => {
    item.addEventListener('click', () => {
      mobileDrawer.classList.remove('is-open');
    });
  });


  // --------------------------------------------------------------------------
  // 6. SCROLL REVEAL (INTERSECTION OBSERVER)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  function triggerRevealAnimations() {
    revealElements.forEach(el => revealObserver.observe(el));
  }


  // --------------------------------------------------------------------------
  // 7. LIGHTBOX GALLERY SYSTEM
  // --------------------------------------------------------------------------
  const galleryData = [
    { src: 'assets/images/gallery-1.svg', caption: 'The Promise — A sacred journey destined together' },
    { src: 'assets/images/gallery-2.svg', caption: 'The Henna Night — Laughter and auspicious golden glow' },
    { src: 'assets/images/gallery-3.svg', caption: 'Twilight in Lahore — Historic marble arches and starlight' },
    { src: 'assets/images/gallery-4.svg', caption: 'The Sacred Nikah — Sealed with heartfelt prayers' },
    { src: 'assets/images/gallery-5.svg', caption: 'The Baraat Procession — Royal entry and timeless welcome' },
    { src: 'assets/images/gallery-6.svg', caption: 'The Walima Reception — Starlight banquet and family blessings' }
  ];

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      openLightbox(index);
    });
  });

  function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightboxContent();
    lightboxModal.classList.add('is-active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.addEventListener('keydown', handleLightboxKeyboard);
  }

  function closeLightbox() {
    lightboxModal.classList.remove('is-active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', handleLightboxKeyboard);
  }

  function updateLightboxContent() {
    const item = galleryData[currentLightboxIndex];
    lightboxImage.src = item.src;
    lightboxCaption.textContent = item.caption;
  }

  function nextLightbox() {
    currentLightboxIndex = (currentLightboxIndex + 1) % galleryData.length;
    updateLightboxContent();
  }

  function prevLightbox() {
    currentLightboxIndex = (currentLightboxIndex - 1 + galleryData.length) % galleryData.length;
    updateLightboxContent();
  }

  lightboxCloseBtn.addEventListener('click', closeLightbox);
  lightboxNextBtn.addEventListener('click', nextLightbox);
  lightboxPrevBtn.addEventListener('click', prevLightbox);

  // Close when clicking backdrop
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  function handleLightboxKeyboard(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
  }


  // --------------------------------------------------------------------------
  // 8. RSVP FORM HANDLING WITH ASYNC POST & VALIDATION
  // --------------------------------------------------------------------------
  rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = rsvpNameInput.value.trim();
    if (!name) {
      nameError.classList.add('is-visible');
      rsvpNameInput.focus();
      return;
    }
    nameError.classList.remove('is-visible');

    // Collect Form Data
    const formData = new FormData(rsvpForm);
    const selectedEvents = [];
    document.querySelectorAll('input[name="events"]:checked').forEach(cb => {
      selectedEvents.push(cb.value);
    });

    const payload = {
      name: name,
      attendance: formData.get('attendance'),
      guests: formData.get('guests'),
      events: selectedEvents,
      message: formData.get('message')
    };

    // UI Loading state
    btnSubmitRsvp.classList.add('is-loading');

    try {
      // POST to local Node.js Express server
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      setTimeout(() => {
        btnSubmitRsvp.classList.remove('is-loading');
        showRsvpSuccess(payload.name, payload.attendance);
      }, 600);

    } catch (err) {
      // Fallback in case user is testing statically without server
      console.warn('Network call error or static preview:', err);
      setTimeout(() => {
        btnSubmitRsvp.classList.remove('is-loading');
        showRsvpSuccess(payload.name, payload.attendance);
      }, 600);
    }
  });

  function showRsvpSuccess(name, attendance) {
    const successText = document.getElementById('successMessageText');
    if (attendance === 'attending') {
      successText.innerHTML = `Dearest <strong>${escapeHtml(name)}</strong>, your attendance has been recorded with immense delight. We look forward to receiving you!`;
    } else {
      successText.innerHTML = `Dearest <strong>${escapeHtml(name)}</strong>, your warm wishes and prayers have been received. You will be deeply missed in our celebration!`;
    }

    rsvpForm.style.display = 'none';
    rsvpSuccessCard.classList.add('is-active');

    // Confetti / gold burst
    const rect = rsvpSuccessCard.getBoundingClientRect();
    triggerParticleBurst(rect.left + rect.width / 2, rect.top + 80, 50);
  }

  btnResetRsvp.addEventListener('click', () => {
    rsvpForm.reset();
    rsvpForm.style.display = 'flex';
    rsvpSuccessCard.classList.remove('is-active');
  });

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[m]);
  }


  // --------------------------------------------------------------------------
  // 9. SOOTHING AMBIENT MUSIC ENGINE (AUDIO / WEB AUDIO SYNTHESIS FALLBACK)
  // --------------------------------------------------------------------------
  let audioCtx = null;
  let synthInterval = null;

  audioToggleBtn.addEventListener('click', toggleMusic);

  function toggleMusic() {
    if (isMusicPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  }

  function tryStartAudio() {
    // Attempt playback if user hasn't explicitly muted
    if (!isMusicPlaying && !bgAudio.paused) {
      startMusic();
    }
  }

  function startMusic() {
    isMusicPlaying = true;
    audioToggleBtn.classList.add('is-playing');

    // Attempt to play local mp3
    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        console.log('Ambient MP3 playing');
      }).catch(() => {
        // If file not found or browser restricted, engage soothing Web Audio ambient sitar/harp synth!
        startWebAudioAmbientSynth();
      });
    } else {
      startWebAudioAmbientSynth();
    }
  }

  function stopMusic() {
    isMusicPlaying = false;
    audioToggleBtn.classList.remove('is-playing');
    bgAudio.pause();
    stopWebAudioAmbientSynth();
  }

  /**
   * Built-in Web Audio API Synthesizer:
   * Generates a calming, royal acoustic harp & sitar chord progression in D Pentatonic
   * so ambient audio is guaranteed to function gracefully without external dependencies!
   */
  function startWebAudioAmbientSynth() {
    if (synthInterval) return;

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!audioCtx) audioCtx = new AudioContext();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      // D major / Bhupali pentatonic frequencies (D, E, F#, A, B)
      const scale = [293.66, 329.63, 369.99, 440.00, 493.88, 587.33, 659.25, 739.99];

      function playPluck(freq, delay = 0, duration = 2.5) {
        if (!audioCtx || !isMusicPlaying) return;
        setTimeout(() => {
          if (!isMusicPlaying) return;
          const now = audioCtx.currentTime;

          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          // Warm low-pass filter
          const filter = audioCtx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1200, now);
          filter.frequency.exponentialRampToValueAtTime(300, now + duration);

          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.08, now + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(audioCtx.destination);

          osc.start(now);
          osc.stop(now + duration);
        }, delay * 1000);
      }

      // Elegant arpeggiated acoustic phrase
      function playPhrase() {
        if (!isMusicPlaying) return;
        playPluck(scale[0], 0, 4.0);    // Root drone
        playPluck(scale[2], 0.3, 3.0);
        playPluck(scale[3], 0.6, 3.0);
        playPluck(scale[4], 1.2, 3.2);
        playPluck(scale[5], 1.8, 3.5);
        playPluck(scale[3], 2.4, 2.5);
      }

      playPhrase();
      synthInterval = setInterval(playPhrase, 4200);

    } catch (e) {
      console.warn('Web Audio Ambient Synthesizer:', e);
    }
  }

  function stopWebAudioAmbientSynth() {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
  }

});
