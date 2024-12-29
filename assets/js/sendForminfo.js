document.addEventListener('DOMContentLoaded', () => {
    const customerInfoModal = new bootstrap.Modal(document.getElementById('customerInfoModal'), {
        keyboard: false,
        backdrop: 'static' // Không cho đóng modal khi click ra ngoài
    });

    // Hiển thị modal ngay khi trang được tải
    customerInfoModal.show();

    // Xử lý khi khách hàng gửi form
    const customerInfoForm = document.getElementById('customer-info-form');
    customerInfoForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Ngăn reload trang

        const name = document.getElementById('customer-name').value.trim();
        const address = document.getElementById('customer-address').value.trim();
        const phone = document.getElementById('customer-phone').value.trim();

        if (name && address && phone) {
            // Tạo đối tượng thông tin khách hàng
            const customerInfo = {
                name,
                address,
                phone,
                submittedAt: new Date().toLocaleString('vi-VN') // Thời gian gửi
            };

            // Lưu thông tin vào localStorage
            const existingCustomers = JSON.parse(localStorage.getItem('customers')) || [];
            existingCustomers.push(customerInfo);
            localStorage.setItem('customers', JSON.stringify(existingCustomers));

            // Hiển thị thông báo và đóng modal
            alert(`Cảm ơn ${name}! Thông tin của bạn đã được gửi.`);
            customerInfoModal.hide();
        } else {
            alert('Vui lòng điền đầy đủ thông tin!');
        }
    });
});
