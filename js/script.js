// S - Conmments 
// S - Timer 
function updateTimer() {
    future = Date.parse("April 10, 2023 00:00:00");
    now = new Date();
    diff = future - now;

    days = Math.floor(diff / (1000 * 60 * 60 * 24));
    hours = Math.floor(diff / (1000 * 60 * 60));
    mins = Math.floor(diff / (1000 * 60));
    secs = Math.floor(diff / 1000);

    d = days;
    h = hours - days * 24;
    m = mins - hours * 60;
    s = secs - mins * 60;

    document.getElementById("timer")
        .innerHTML =
        '<div>' + d + '<span>days</span></div>' +
        '<div>' + h + '<span>hours</span></div>' +
        '<div>' + m + '<span>minutes</span></div>' +
        '<div>' + s + '<span>seconds</span></div>';
}
setInterval('updateTimer()', 1000);

//   E-Timer 

$(function () {

    var owl = $('.slide-one-item');

    $('.slide-one-item').owlCarousel({
        center: false,
        items: 1,
        loop: true,
        stagePadding: 0,
        margin: 0,

        smartSpeed: 1500,
        autoplay: false,
        dots: false,
        nav: false,
        navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">']
    });

    $('.thumbnail li').each(function (slide_index) {
        $(this).click(function (e) {
            owl.trigger('to.owl.carousel', [slide_index, 1500]);
            e.preventDefault();
        })
    })

    owl.on('changed.owl.carousel', function (event) {
        $('.thumbnail li').removeClass('active');
        $('.thumbnail li').eq(event.item.index - 2).addClass('active');
    })


})
// E - Conmments
