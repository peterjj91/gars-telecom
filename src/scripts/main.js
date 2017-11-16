
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

$(function () {
    $('.slider-side').slick({
        dots: false,
        arrows: true,
        infinite: true,
        speed: 300,
        cssEase: 'linear',
        slidesToShow: 1,
        slidesToScroll: 1
    });
});

$(function () {
    $('.slider-mini').slick({
        dots: false,
        arrows: true,
        infinite: false,
        speed: 300,
        cssEase: 'linear',
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    variableWidth: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    variableWidth: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    variableWidth: true
                }
            }
        ]
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

$(document).ready(function(){
    var span = $('<span>').css('display','inline-block')
        .css('word-break','break-all').appendTo('body').css('display','none');
    function initSpan(textarea){
        span.text(textarea.text())
            .width(textarea.width())
            .css('font',textarea.css('font'));
    }
    $('.textarea-expand').on({
        input: function(){
            var text = $(this).val();
            span.text(text);
            $(this).height(text ? span.height() : '26px');
        },
        focus: function(){
            initSpan($(this));
        },
        keypress: function(e){
            if(e.which == 13) e.preventDefault();
        }
    });
});

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

$(document).on('click','.service__table__open',function(){
    // $(this).parent().toggleClass("service__table__drop--active");
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

$(document).ready(function(){
    $('.responsive-table').stacktable();
});

jQuery(document).ready(function($){
    // browser window scroll (in pixels) after which the "back to top" link is shown
    var offset = 300,
        //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
        offset_opacity = 1200,
        //duration of the top scrolling animation (in ms)
        scroll_top_duration = 700,
        //grab the "back to top" link
        $back_to_top = $('.cd-top');

    //hide or show the "back to top" link
    $(window).scroll(function(){
        ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
        if( $(this).scrollTop() > offset_opacity ) {
            $back_to_top.addClass('cd-fade-out');
        }
    });

    //smooth scroll to top
    $back_to_top.on('click', function(event){
        event.preventDefault();
        $('body,html').animate({
                scrollTop: 0 ,
            }, scroll_top_duration
        );
    });

});