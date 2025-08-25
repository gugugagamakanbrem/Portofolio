document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 20,
                behavior: 'smooth'
            });

            // Update active indicator
            updateIndicator(targetId.substring(1));
        });
    });

    // Scroll indicator functionality
    const indicatorDots = document.querySelectorAll('.indicator-dot');
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    
    indicatorDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            
            window.scrollTo({
                top: section.offsetTop - 20,
                behavior: 'smooth'
            });
            
            updateIndicator(sectionId);
        });
    });
    
    function updateIndicator(activeSection) {
        indicatorDots.forEach(dot => {
            if (dot.getAttribute('data-section') === activeSection) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Update indicator on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 50;
        
        sections.forEach(section => {
            const element = document.getElementById(section);
            if (element.offsetTop <= scrollPosition && 
                element.offsetTop + element.offsetHeight > scrollPosition) {
                updateIndicator(section);
            }
        });
    });

    // Animate items in runner section
    const runnerItems = document.querySelectorAll('.runner-item');
    if (runnerItems) {
        runnerItems.forEach((item, index) => {
            item.style.animation = `blink ${2 + index * 0.5}s infinite`;
        });
    }
});

const music = document.getElementById("bg-music");
music.volume = 0.7;
const btn = document.getElementById("music-btn");

btn.addEventListener("click", () => {
  if (music.muted) {
    music.muted = false;
    music.play(); // pastiin langsung play setelah unmute
    btn.textContent = "🔊 Mute";
  } else {
    music.muted = true;
    btn.textContent = "🔇 Unmute";
  }
});
  
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // biar ga reload
  const data = new FormData(form);

  const response = await fetch(form.action, {
    method: form.method,
    body: data,
    headers: { 'Accept': 'application/json' }
  });

  if (response.ok) {
    status.style.display = "block"; // munculin pesan sukses
    form.reset(); // kosongin form
  } else {
    status.style.display = "block";
    status.style.color = "red";
    status.innerText = "Oops, something went wrong ❌";
  }
});

