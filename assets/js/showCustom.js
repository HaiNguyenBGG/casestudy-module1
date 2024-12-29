document.addEventListener('DOMContentLoaded', () => {
    const editCustomerModalElement = document.getElementById('editCustomerModal');
    const editCustomerModal = editCustomerModalElement
        ? new bootstrap.Modal(editCustomerModalElement, {
            keyboard: false,
            backdrop: 'static',
        })
        : null;

    const customerTableBody = document.getElementById('customer-table-body');

    // Hiển thị danh sách khách hàng
    function formatDate(dateString) {
        if (!dateString) return 'Không xác định';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN');
    }

    function displayCustomers(customers) {
        if (!customerTableBody) return;
        customerTableBody.innerHTML = '';

        customers.forEach((customer, index) => {
            const statusIcon = customer.status === "Đã bán"
                ? "✔️"
                : customer.status === "Đang tư vấn"
                    ? "🟡"
                    : "❌";

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${customer.name}</td>
                <td>${customer.address}</td>
                <td>${customer.phone}</td>
                <td>${customer.product || 'Không xác định'}</td>
                <td>${statusIcon} ${customer.status || ''}</td>
                <td>${formatDate(customer.submittedAt)}</td>
                <td>
                    <button class="btn btn-warning btn-sm edit-customer-btn" data-index="${index}">Sửa</button>
                    <button class="btn btn-danger btn-sm delete-customer-btn" data-index="${index}">Xóa</button>
                </td>
            `;
            customerTableBody.appendChild(row);
        });

        attachCustomerEventListeners(customers);
    }

    // Gắn sự kiện sửa và xóa khách hàng
    function attachCustomerEventListeners(customers) {
        document.querySelectorAll('.edit-customer-btn').forEach((button) => {
            button.addEventListener('click', function () {
                const customerIndex = this.dataset.index;
                const customer = customers[customerIndex];

                // Điền thông tin khách hàng vào form
                document.getElementById('edit-customer-name').value = customer.name;
                document.getElementById('edit-customer-address').value = customer.address;
                document.getElementById('edit-customer-phone').value = customer.phone;
                document.getElementById('edit-customer-product').value = customer.product || '';
                document.getElementById('edit-customer-status').value = customer.status || '';
                document.getElementById('edit-customer-date').value = customer.submittedAt || '';

                // Hiển thị modal chỉnh sửa
                if (editCustomerModal) editCustomerModal.show();

                const saveButton = document.getElementById('save-customer-btn');
                saveButton.replaceWith(saveButton.cloneNode(true)); // Xóa sự kiện cũ
                const newSaveButton = document.getElementById('save-customer-btn');

                newSaveButton.addEventListener('click', function () {
                    // Cập nhật thông tin khách hàng
                    customers[customerIndex].name = document.getElementById('edit-customer-name').value.trim();
                    customers[customerIndex].address = document.getElementById('edit-customer-address').value.trim();
                    customers[customerIndex].phone = document.getElementById('edit-customer-phone').value.trim();
                    customers[customerIndex].product = document.getElementById('edit-customer-product').value.trim();
                    customers[customerIndex].status = document.getElementById('edit-customer-status').value;
                    customers[customerIndex].submittedAt = document.getElementById('edit-customer-date').value;

                    // Lưu lại vào localStorage
                    localStorage.setItem('customers', JSON.stringify(customers));
                    displayCustomers(customers);

                    // Ẩn modal
                    if (editCustomerModal) editCustomerModal.hide();
                });
            });
        });

        document.querySelectorAll('.delete-customer-btn').forEach((button) => {
            button.addEventListener('click', function () {
                const customerIndex = this.dataset.index;
                if (confirm('Bạn có chắc muốn xóa khách hàng này?')) {
                    customers.splice(customerIndex, 1);
                    localStorage.setItem('customers', JSON.stringify(customers));
                    displayCustomers(customers);
                }
            });
        });
    }

    // Lấy dữ liệu từ localStorage
    const customers = JSON.parse(localStorage.getItem('customers') || '[]');
    displayCustomers(customers);

    // Tìm kiếm khách hàng
    const searchCustomerInput = document.getElementById("search-customer");
    if (searchCustomerInput) {
        searchCustomerInput.addEventListener("input", function () {
            const searchValue = this.value.toLowerCase();
            const rows = document.querySelectorAll("#customer-table-body tr");
            rows.forEach(row => {
                const rowText = row.textContent.toLowerCase();
                row.style.display = rowText.includes(searchValue) ? "" : "none";
            });
        });
    }
});
