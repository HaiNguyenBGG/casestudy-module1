document.addEventListener('DOMContentLoaded', () => {
    const serviceLinks = document.querySelectorAll('[data-bs-target="#serviceModal"]');
    const serviceMessage = document.getElementById('serviceMessage');

    serviceLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const text = event.target.textContent.trim();
            if (text === "Bảo hành") {
                serviceMessage.textContent = "Chính sách bảo hành áp dụng cho tất cả các sản phẩm KIA. Liên hệ hotline: 0817 179 222";
            } else if (text === "Hỗ trợ kỹ thuật") {
                serviceMessage.textContent = "Hỗ trợ kỹ thuật 24/7 qua hotline: 0817 179 222 hoặc email: huuhai97bg@gmail.com";
            } else if (text === "Tư vấn mua hàng") {
                serviceMessage.textContent = "Liên hệ với chúng tôi qua hotline: 0817 179 222 hoặc điền form thông tin để nhận tư vấn mua xe phù hợp.";
            }
        });
    });
});

