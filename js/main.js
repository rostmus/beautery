document.addEventListener('DOMContentLoaded',  () => {
    const activeClass = 'active';
    const overflowClass = 'overflow-hidden';
    let startIndex = 0;
    let activePagination;
    let pagination;
    let element = '<div class="swiper-pagination-bullet-width js-pagination-width"></div>'

    const removeActivePagination = function () {
        pagination.forEach((el) => {
            console.log(el)
            let removeElement = el.querySelector('.js-pagination-width');
            if (removeElement) {
                removeElement.remove();
            }
        })
    }

    const thumbSwiper = new Swiper('.js-thumb-swiper', {
        spaceBetween: 0,
        slideActiveClass: 'active',
        slidesPerView: 'auto',
    })

    const mainSwiper = new Swiper('.js-swiper', {
        slidesPerView: 1,
        slideActiveClass: 'active',
        bulletActiveClass: 'active',
        spaceBetween: 10,
        thumbs: {
            swiper: thumbSwiper
        },
        autoplay: {delay: 5000},
        breakpoints: {
            1440: {
                autoplay: false
            },
            300: {
                autoplay: {delay: 5000},
            },
        },
        disableOnInteraction: false,
        pagination: {
            type: 'bullets',
            el: '.js-pagination'
        },
        initialSlide: startIndex,
        on: {
            autoplayTimeLeft: (mainSwiper, timeLeft, percent) => {
                let width = (1 - percent) * 100
                if (activePagination) {
                    activePagination.querySelector('.js-pagination-width').style.width = `${width}%`
                }
            },
            autoplay: (mainSwiper) => {
                removeActivePagination()
                activePagination = pagination[mainSwiper.activeIndex];
                activePagination.insertAdjacentHTML('beforeend', element);
            },
            autoplayStart: (mainSwiper) => {
                pagination = document.querySelector('.js-pagination').querySelectorAll('.swiper-pagination-bullet');
                activePagination = pagination[0];
                activePagination.insertAdjacentHTML('beforeend', element);
            }
        }
    });

    const video = document.querySelector('.js-video');
    video.play();
    //popup
    const popupOpenButtons = document.querySelectorAll('.js-popup-open');
    const popup = document.querySelector('.js-popup');
    const popupWrapper = popup.querySelector('.js-popup-wrapper');
    const mainHtml = document.querySelector('html');
    const closePopupButton = popup.querySelector('.js-popup-close');

    popup.addEventListener('click', (event) => {
        let element = event.target.closest('.js-popup-wrapper');
        if (element !== popupWrapper) {
            closePopup();
        }
    });

    popupOpenButtons.forEach((el) => {
        el.addEventListener('click', () => {
            popup.classList.add(activeClass);
            mainHtml.classList.add(overflowClass);
        })
    });

    document.addEventListener('keydown', (event) => {
        if (event.keyCode === 27) {
            closePopup();
        }
    });

    closePopupButton.addEventListener('click', () => {
        closePopup();
    })
    const closePopup = function () {
        popup.classList.remove(activeClass);
        mainHtml.classList.remove(overflowClass);
    };

    //фиксированные блок
    const scrollBlock = document.querySelector('.js-scroll-block');
    const mainBlock = document.querySelector('.js-main-block');
    const heightMainBlock = mainBlock.offsetHeight;
    const heightScrollBlock = scrollBlock.offsetHeight;
    const topPositionScrollBLock = scrollBlock.getBoundingClientRect().top;

    document.addEventListener('scroll', () => {
        const scrollMainBlockTop = Math.abs(mainBlock.getBoundingClientRect().top);
        const bodyScrollNumber = document.querySelector('body').getBoundingClientRect().top;

        if (heightMainBlock - scrollMainBlockTop < topPositionScrollBLock - heightScrollBlock) {
            scrollBlock.classList.add(activeClass);
        } else {
            scrollBlock.classList.remove(activeClass);
        }
    });

    const scrollButtonUp = document.querySelector('.js-scroll-up');

    scrollButtonUp.addEventListener('click', () => {
        window.scrollTo(0, 0);
    })
});