$(function() {

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

    $('.thumbnail li').each(function(slide_index){
        $(this).click(function(e) {
            owl.trigger('to.owl.carousel',[slide_index,1500]);
            e.preventDefault();
        })
    })

    owl.on('changed.owl.carousel', function(event) {
        $('.thumbnail li').removeClass('active');
        $('.thumbnail li').eq(event.item.index - 2).addClass('active');
    })

	
})