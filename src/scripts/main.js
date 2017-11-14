
$(function () {
    $('.selectpicker').selectpicker();
});

$(function () {
    $('.slider-promo').slick({
        dots: true,
        arrows: false,
        infinite: false,
        speed: 300,
        cssEase: 'linear',
        slidesToShow: 1,
        slidesToScroll: 1
    });
});

$(document).on('click', '.dropdown .dropdown-menu', function (e) {
    e.stopPropagation();
});

$(document).ready(function(){
    tippy('.tooltip')
});

$(function () {
    if(window.matchMedia('(min-width: 850px)').matches) {
        $(".scrollbar").mCustomScrollbar({
            scrollButtons:{enable:true},
            theme:"light-thick",
            scrollbarPosition:"outside"
        });
    } else if (window.matchMedia('(max-width: 851px)').matches) {
        $(".scrollbar").mCustomScrollbar({
            axis:"x",
            theme:"light-thick",
            // autoExpandScrollbar:true,
            advanced:{autoExpandHorizontalScroll:true}
        });
    }
});

// if ($(".toggle-menu").length > 0) {
//
// }

$(document).ready(function(){
    var slideout = new Slideout({
        'panel': document.getElementById('main'),
        'menu': document.getElementById('navbar-main'),
        'padding': 320,
        'tolerance': 70,
        'side': 'right',
        'touch': false
    });

    document.querySelector('.toggle-menu').addEventListener('click', function() {
        slideout.toggle();
        $("#navbar-main").toggleClass("zindex-top");
    });

    document.querySelector('.sidemenu__close').addEventListener('click', function() {
        slideout.close();
        $("#navbar-main").removeClass("zindex-top");
    });

    function close(eve) {
        eve.preventDefault();
        slideout.close();
    }

    slideout
        .on('beforeopen', function() {
            this.panel.classList.add('slideout-open');
            $(".header").addClass('header--open');
            $(".burger__button").addClass("open");
        })
        .on('open', function() {
            this.panel.addEventListener('click', close);
        })
        .on('beforeclose', function() {
            this.panel.classList.remove('slideout-open');
            $(".header").removeClass('header--open');
            $(".burger__button").removeClass("open");
            this.panel.removeEventListener('click', close);
        });
});


$(document).on('click','.promo-drop__icon',function(){
    $(this).toggleClass("promo-drop__icon--active");
});

$(document).on('click','.promo-use__collapse',function(){
    $(".promo-use").toggleClass("active");
});

$(function() {
    var cbpHorizontalMenu = (function() {
        var $listItems = $( '#cbp-hrmenu > ul > li' ),
            $menuItems = $listItems.children( 'a' ),
            $body = $( 'body' ),
            current = -1;

        function init() {
            $menuItems.on( 'click', open );
            $listItems.on( 'click', function( event ) {
                event.stopPropagation();
            });
        }

        function open( event ) {
            if( current !== -1 ) {
                $listItems.eq( current ).removeClass( 'cbp-hropen' );
            }

            var $item = $( event.currentTarget ).parent( 'li' ),
                idx = $item.index();

            if( current === idx ) {
                $item.removeClass( 'cbp-hropen' );
                current = -1;
            }
            else {
                $item.addClass( 'cbp-hropen' );
                current = idx;
                $body.off( 'click' ).on( 'click', close );
            }

            return false;
        }

        function close( event ) {
            $listItems.eq( current ).removeClass( 'cbp-hropen' );
            current = -1;
        }

        return { init : init };
    })();

    cbpHorizontalMenu.init();
});