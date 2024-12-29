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
        const product = document.getElementById('customer-product').value.trim();

        if (name && address && phone && product) {
            // Tạo đối tượng thông tin khách hàng
            const customerInfo = {
                name,
                address,
                phone,
                product,
                submittedAt: new Date().toISOString() // Thời gian gửi theo ISO
            };

            // Lưu thông tin vào localStorage
            const existingCustomers = JSON.parse(localStorage.getItem('customers')) || [];
            existingCustomers.push(customerInfo);
            localStorage.setItem('customers', JSON.stringify(existingCustomers));

            // Hiển thị thông báo và đóng modal
            alert(`Cảm ơn ${name}! Thông tin của bạn về sản phẩm "${product}" đã được gửi.`);
            customerInfoModal.hide();
        } else {
            alert('Vui lòng điền đầy đủ thông tin!');
        }
    });

    // Hiển thị danh sách khách hàng
    function formatDate(dateString) {
        if (!dateString || isNaN(new Date(dateString))) return 'Không xác định';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN');
    }

    function displayCustomers(customers) {
        const customerTableBody = document.getElementById('customer-table-body');
        if (!customerTableBody) return;
        customerTableBody.innerHTML = '';

        customers.forEach((customer, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${customer.name}</td>
                <td>${customer.address}</td>
                <td>${customer.phone}</td>
                <td>${customer.product || 'Không xác định'}</td>
                <td>${formatDate(customer.submittedAt)}</td>
            `;
            customerTableBody.appendChild(row);
        });
    }

    const customers = JSON.parse(localStorage.getItem('customers') || '[]');
    displayCustomers(customers);
});
