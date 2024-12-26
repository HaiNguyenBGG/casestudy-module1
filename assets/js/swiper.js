const swiper = new Swiper('.mySwiper', {
    loop: true, // Cho phép slide quay vòng
    autoplay: {
        delay: 2500, // Tự động chuyển slide sau 3 giây
        disableOnInteraction: false, // Không dừng khi người dùng tương tác
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true, // Cho phép nhấp vào pagination
    },
});
