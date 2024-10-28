// Initialize GSAP Plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', function() {
    // Remove the loader
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }

    // Scroll animations for sections
    document.querySelectorAll('.section').forEach(section => {
        const elements = section.querySelectorAll('h2, h3, p, .vintage-border, .service-card, .testimonial-card');
        elements.forEach(el => el.classList.add('scroll-animate'));

        // ScrollTrigger for section
        ScrollTrigger.create({
            trigger: section,
            start: "top 80%",
            onEnter: () => {
                elements.forEach((el, i) => {
                    setTimeout(() => el.classList.add('active'), i * 100); // Stagger animations
                });
            },
            onLeaveBack: () => {
                elements.forEach(el => el.classList.remove('active'));
            }
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 70
                    },
                    ease: "power3.inOut"
                });
            }
        });
    });

    // Service Cards Animation
    gsap.utils.toArray('.service-card').forEach(card => {
        ScrollTrigger.create({
            trigger: card,
            start: "top 80%",
            onEnter: () => {
                gsap.to(card, {
                    opacity: 1,
                    y: 0,
                    rotation: 0,
                    duration: 0.8,
                    ease: "back.out(1.7)"
                });
            }
        });
    });

    // Testimonial Cards Stagger Animation
    gsap.from('.testimonial-card', {
        scrollTrigger: {
            trigger: '.testimonial-card',
            start: "top bottom",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 100,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
    });

    // Gallery Images Animation
    gsap.utils.toArray('.gallery-image').forEach(image => {
        gsap.from(image, {
            scrollTrigger: {
                trigger: image,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            scale: 0.8,
            duration: 1,
            ease: "power2.out"
        });
    });

    // Parallax Effect for Background Elements
    gsap.utils.toArray('.parallax-bg').forEach(bg => {
        gsap.to(bg, {
            scrollTrigger: {
                trigger: bg,
                scrub: true
            },
            y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
            ease: "none"
        });
    });

    // Text Animation
    const splitText = new SplitText(".animate-text", { type: "chars, words" });
    gsap.from(splitText.chars, {
        opacity: 0,
        y: 50,
        stagger: 0.02,
        duration: 1,
        ease: "power3.out"
    });

    // Three.js Background
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.appendChild(renderer.domElement);
    }

    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshBasicMaterial({
        color: 0xC19A6B,
        wireframe: true,
        transparent: true,
        opacity: 0.1
    });
    
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);
    camera.position.z = 30;

    function animate() {
        requestAnimationFrame(animate);
        torusKnot.rotation.x += 0.01;
        torusKnot.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();

    // Particle Background
    const createParticles = () => {
        const particles = document.createElement('div');
        particles.className = 'particles';
        document.body.appendChild(particles);

        for(let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.background = 'rgba(193, 154, 107, 0.5)';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.top = Math.random() * 100 + 'vh';
            particles.appendChild(particle);

            gsap.to(particle, {
                y: 'random(-100, 100)',
                x: 'random(-100, 100)',
                opacity: 0,
                duration: 'random(2, 4)',
                repeat: -1,
                yoyo: true
            });
        }
    };

    createParticles();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const heroNameElement = document.getElementById('hero-name');
    
    const textEnglish = "Labh Rope Therapy";
    const textDevanagari = "लाभ रोप थेरपी";
    const typingSpeed = 150; // Speed of typing in milliseconds
    let isEnglish = true; // Flag to toggle between languages

    function typeWriter(text, callback) {
        heroNameElement.classList.add('typewriter');
        let i = 0;
        (function type() {
            if (i < text.length) {
                heroNameElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, typingSpeed);
            } else {
                heroNameElement.classList.remove('typewriter');
                if (callback) callback();
            }
        })();
    }

    function clearAndTypeNext() {
        setTimeout(() => {
            heroNameElement.innerHTML = '';
            isEnglish = !isEnglish;
            typeWriter(isEnglish ? textEnglish : textDevanagari, clearAndTypeNext);
        }, 1000); // Delay before switching to the other language
    }

    typeWriter(textEnglish, clearAndTypeNext);
});
// Video 
// Add this to your script.js
document.addEventListener('DOMContentLoaded', function() {
    // Get the YouTube iframe and sound toggle button
    const videoIframe = document.getElementById('hero-video');
    const soundToggle = document.getElementById('sound-toggle');
    const soundIcon = document.getElementById('sound-icon');
    const soundText = document.getElementById('sound-text');
    let isMuted = true;

    // Function to load YouTube API
    function loadYouTubeAPI() {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    loadYouTubeAPI();

    let player;
    
    // Called automatically by YouTube API when ready
    window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('hero-video', {
            events: {
                'onReady': onPlayerReady
            }
        });
    };

    function onPlayerReady(event) {
        // Add click event listener to sound toggle button
        soundToggle.addEventListener('click', function() {
            if (isMuted) {
                player.unMute();
                soundIcon.classList.remove('fa-volume-mute');
                soundIcon.classList.add('fa-volume-up');
                soundText.textContent = 'Mute';
            } else {
                player.mute();
                soundIcon.classList.remove('fa-volume-up');
                soundIcon.classList.add('fa-volume-mute');
                soundText.textContent = 'Unmute';
            }
            isMuted = !isMuted;
        });
    }
});


const leftScrollButton = document.getElementById('left-scroll');
  const rightScrollButton = document.getElementById('right-scroll');
  const scrollContainer = document.querySelector('.scroll-container');

  // Scroll left when left button is clicked
  leftScrollButton.addEventListener('click', () => {
    scrollContainer.scrollBy({
      left: -300, // Adjust scroll distance here
      behavior: 'smooth'
    });
  });

  // Scroll right when right button is clicked
  rightScrollButton.addEventListener('click', () => {
    scrollContainer.scrollBy({
      left: 300, // Adjust scroll distance here
      behavior: 'smooth'
    });
  });