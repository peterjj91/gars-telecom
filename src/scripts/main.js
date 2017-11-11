
$(function () {
    $('.selectpicker').selectpicker();
});

$(function () {
    $('.slider-product').slick({
        dots: true,
        infinite: false,
        speed: 300,
        cssEase: 'linear',
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    variableWidth: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    variableWidth: true
                }
            }
        ]
    });
});

$(document).on('click', '.dropdown .dropdown-menu', function (e) {
    e.stopPropagation();
});

$(function () {
    tippy('.tooltip')
});

$(function () {
    $(".scrollbar").mCustomScrollbar({
        scrollButtons:{enable:true},
        theme:"light-thick",
        scrollbarPosition:"outside"
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