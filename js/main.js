$(document).ready(function() {
    
    // Scroll Progress Indicator
    let ticking = false;
    $(window).scroll(function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrollPos = $(window).scrollTop();
                const docHeight = $(document).height() - $(window).height();
                const scrollPercent = (scrollPos / docHeight) * 100;
                $('.scroll-progress').css('width', scrollPercent + '%');
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Parallax Effect (optimized with requestAnimationFrame)
    let parallaxTicking = false;
    $(window).scroll(function() {
        if (!parallaxTicking) {
            window.requestAnimationFrame(function() {
                const scrollPos = $(window).scrollTop();

                // Enhanced parallax for hero background - more noticeable effect
                $('.hero-bg-img').css('transform', 'translateY(' + (scrollPos * 0.7) + 'px)');

                parallaxTicking = false;
            });
            parallaxTicking = true;
        }
    });
    
    // 3D Card Tilt Effect (optimized)
    let tiltTicking = false;
    $('.card-3d, .gallery-item, .modern-gallery-item').on('mousemove', function(e) {
        if (!tiltTicking) {
            window.requestAnimationFrame(function() {
                const $card = $(this);
                const rect = $card[0].getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 12;
                const rotateY = (centerX - x) / 12;

                $card.css('transform', `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`);
                tiltTicking = false;
            }.bind(this));
            tiltTicking = true;
        }
    });

    $('.card-3d, .gallery-item, .modern-gallery-item').on('mouseleave', function() {
        $(this).css('transform', 'perspective(1000px) rotateX(0) rotateY(0) scale(1)');
    });
    
    // Particles Animation
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    // Scroll-triggered animations
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const $element = $(entry.target);
                $element.addClass('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    $('.history-card, .attraction-card, .stat-card, .gallery-item, .modern-gallery-item, .contact-info').each(function() {
        $(this).addClass('scroll-up');
        scrollObserver.observe(this);
    });

    $('.hero-content h1, .hero-content p, .hero-content a').each(function() {
        $(this).addClass('fade-in');
        scrollObserver.observe(this);
    });
    
    var wow = new WOW({
        offset: 50,
        mobile: true,
        live: true,
        callback: function(box) {
            var $box = $(box);
            if (!$box.attr('data-wow-duration')) {
                $box.attr('data-wow-duration', '0.6s');
            }
        }
    });
    wow.init();

    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('#mainNav').addClass('scrolled');
        } else {
            $('#mainNav').removeClass('scrolled');
        }

        var scrollPos = $(this).scrollTop() + 100;
        $('section').each(function() {
            var $section = $(this);
            var sectionId = $section.attr('id');
            
            if (sectionId) {
                var sectionTop = $section.offset().top;
                var sectionBottom = sectionTop + $section.outerHeight();
                
                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    $('nav a[href="#' + sectionId + '"]').addClass('active');
                    $('nav a:not([href="#' + sectionId + '"])').removeClass('active');
                }
            }
        });
    });

    $('nav a, .scroll-to-section').on('click', function(e) {
        if (this.hash !== "") {
            e.preventDefault();
            var hash = this.hash;
            var offset = 70;

            // Мгновенный скролл без задержки
            $('html, body').stop().animate({
                scrollTop: $(hash).offset().top - offset
            }, 600, 'swing');

            // Закрываем меню на мобильных устройствах
            $('.navbar-collapse').collapse('hide');
        }
    });

    // Основная галерея
    var galleryImages = [];
    var galleryIndex = 0;
    var currentGallery = 'main';

    $('.gallery-item').each(function() {
        var img = $(this).find('img');
        galleryImages.push({
            src: img.attr('src'),
            title: img.attr('alt')
        });
    });

    // Галерея истории
    var historyImages = [];
    var historyIndex = 0;

    $('.history-gallery-item').each(function() {
        var img = $(this).find('img');
        historyImages.push({
            src: img.attr('src'),
            title: img.attr('alt')
        });
    });

    // Галерея достопримечательностей
    var attractionsImages = [];
    var attractionsIndex = 0;

    $('.attractions-gallery-item').each(function() {
        var img = $(this).find('img');
        attractionsImages.push({
            src: img.attr('src'),
            title: img.attr('alt')
        });
    });

    // Современная галерея
    var modernImages = [];
    var modernIndex = 0;

    $('.modern-gallery-item').each(function() {
        var img = $(this).find('img');
        modernImages.push({
            src: img.attr('src'),
            title: img.attr('alt')
        });
    });

    $('.gallery-item').on('click', function() {
        var img = $(this).find('img');
        galleryIndex = galleryImages.findIndex(function(item) {
            return item.src === img.attr('src');
        });
        
        if (galleryIndex === -1) {
            galleryIndex = 0;
        }
        
        currentGallery = 'main';
        openModal(galleryIndex);
    });

    $('.history-gallery-item').on('click', function() {
        var img = $(this).find('img');
        historyIndex = historyImages.findIndex(function(item) {
            return item.src === img.attr('src');
        });
        
        if (historyIndex === -1) {
            historyIndex = 0;
        }
        
        currentGallery = 'history';
        openModal(historyIndex);
    });

    $('.attractions-gallery-item').on('click', function() {
        var img = $(this).find('img');
        attractionsIndex = attractionsImages.findIndex(function(item) {
            return item.src === img.attr('src');
        });
        
        if (attractionsIndex === -1) {
            attractionsIndex = 0;
        }
        
        currentGallery = 'attractions';
        openModal(attractionsIndex);
    });

    $('.modern-gallery-item').on('click', function() {
        var img = $(this).find('img');
        modernIndex = modernImages.findIndex(function(item) {
            return item.src === img.attr('src');
        });
        
        if (modernIndex === -1) {
            modernIndex = 0;
        }
        
        currentGallery = 'modern';
        openModal(modernIndex);
    });

    function getCurrentImages() {
        if (currentGallery === 'main') {
            return galleryImages;
        } else if (currentGallery === 'history') {
            return historyImages;
        } else if (currentGallery === 'attractions') {
            return attractionsImages;
        } else {
            return modernImages;
        }
    }

    function getCurrentIndex() {
        if (currentGallery === 'main') {
            return galleryIndex;
        } else if (currentGallery === 'history') {
            return historyIndex;
        } else if (currentGallery === 'attractions') {
            return attractionsIndex;
        } else {
            return modernIndex;
        }
    }

    function setCurrentIndex(index) {
        if (currentGallery === 'main') {
            galleryIndex = index;
        } else if (currentGallery === 'history') {
            historyIndex = index;
        } else if (currentGallery === 'attractions') {
            attractionsIndex = index;
        } else {
            modernIndex = index;
        }
    }

    function openModal(index) {
        var modal = $('#gallery-modal');
        var modalImg = $('#modal-img');
        var caption = $('#modal-caption');
        var images = getCurrentImages();
        
        modalImg.attr('src', images[index].src);
        caption.text(images[index].title);
        modal.css('display', 'block');
        $('body').css('overflow', 'hidden');
    }

    function closeModal() {
        $('#gallery-modal').css('display', 'none');
        $('body').css('overflow', 'auto');
    }

    function showNextImage() {
        var images = getCurrentImages();
        var currentIndex = getCurrentIndex();
        currentIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(currentIndex);
        openModal(currentIndex);
    }

    function showPrevImage() {
        var images = getCurrentImages();
        var currentIndex = getCurrentIndex();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(currentIndex);
        openModal(currentIndex);
    }

    $('#gallery-modal .close').on('click', closeModal);
    $('#gallery-modal .next').on('click', showNextImage);
    $('#gallery-modal .prev').on('click', showPrevImage);

    $(document).keydown(function(e) {
        if ($('#gallery-modal').css('display') === 'block') {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            }
        }
    });

    $('#gallery-modal').on('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
});
