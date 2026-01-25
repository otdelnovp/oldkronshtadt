$(document).ready(function() {
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
            
            $('html, body').animate({
                scrollTop: $(hash).offset().top - offset
            }, 800);
            
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
        return currentGallery === 'main' ? galleryImages : modernImages;
    }

    function getCurrentIndex() {
        return currentGallery === 'main' ? galleryIndex : modernIndex;
    }

    function setCurrentIndex(index) {
        if (currentGallery === 'main') {
            galleryIndex = index;
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
