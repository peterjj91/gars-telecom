
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

});