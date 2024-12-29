// Format date to a readable format
function formatDate(dateString) {
    if (!dateString) return 'Không xác định';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN');
}

// Hiển thị danh sách khách hàng
function displayCustomers(customers) {
    const customerTableBody = document.getElementById('customer-table-body');
    customerTableBody.innerHTML = ''; // Xóa nội dung cũ

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

// Hiển thị danh sách sản phẩm và phiên bản trong dropdown
function populateCarDropdown(carData) {
    const carSelect = document.getElementById('edit-customer-product');
    carSelect.innerHTML = '<option value="">Chọn sản phẩm</option>'; // Reset dropdown

    carData.forEach(car => {
        const group = document.createElement('optgroup');
        group.label = car.model;

        car.variants.forEach(variant => {
            const option = document.createElement('option');
            option.value = `${car.model} - ${variant.name}`;
            option.textContent = `${car.model} - ${variant.name}`;
            group.appendChild(option);
        });

        carSelect.appendChild(group);
    });
}

// Gắn sự kiện sửa và xóa khách hàng
function attachCustomerEventListeners(customers) {
    const carData = JSON.parse(localStorage.getItem('carData') || '[]');

    document.querySelectorAll('.edit-customer-btn').forEach((button) => {
        button.addEventListener('click', function () {
            const customerIndex = this.dataset.index;
            const customer = customers[customerIndex];

            // Hiển thị dropdown sản phẩm
            populateCarDropdown(carData);

            // Điền thông tin khách hàng vào form
            document.getElementById('edit-customer-name').value = customer.name;
            document.getElementById('edit-customer-address').value = customer.address;
            document.getElementById('edit-customer-phone').value = customer.phone;
            document.getElementById('edit-customer-product').value = customer.product || '';
            document.getElementById('edit-customer-status').value = customer.status || '';
            document.getElementById('edit-customer-date').value = customer.submittedAt || '';

            // Hiển thị modal
            const editCustomerModal = new bootstrap.Modal(document.getElementById('editCustomerModal'));
            editCustomerModal.show();

            // Xóa sự kiện cũ trên nút lưu
            const saveButton = document.getElementById('save-customer-btn');
            saveButton.replaceWith(saveButton.cloneNode(true)); // Xóa sự kiện cũ
            const newSaveButton = document.getElementById('save-customer-btn');

            // Thêm sự kiện lưu
            newSaveButton.addEventListener('click', function () {
                // Cập nhật thông tin khách hàng
                customers[customerIndex].name = document.getElementById('edit-customer-name').value.trim();
                customers[customerIndex].address = document.getElementById('edit-customer-address').value.trim();
                customers[customerIndex].phone = document.getElementById('edit-customer-phone').value.trim();
                customers[customerIndex].product = document.getElementById('edit-customer-product').value.trim();
                customers[customerIndex].status = document.getElementById('edit-customer-status').value;
                customers[customerIndex].submittedAt = document.getElementById('edit-customer-date').value;

                // Lưu lại localStorage
                localStorage.setItem('customers', JSON.stringify(customers));
                displayCustomers(customers);

                // Ẩn modal
                editCustomerModal.hide();
            });
        });
    });

    // Sự kiện xóa khách hàng
    document.querySelectorAll('.delete-customer-btn').forEach((button) => {
        button.addEventListener('click', function () {
            const customerIndex = this.dataset.index;
            if (confirm('Bạn có chắc muốn xóa khách hàng này?')) {
                customers.splice(customerIndex, 1); // Xóa khách hàng khỏi danh sách

                // Lưu lại localStorage và cập nhật giao diện
                localStorage.setItem('customers', JSON.stringify(customers));
                displayCustomers(customers);
            }
        });
    });
}

// Lấy dữ liệu từ localStorage và hiển thị
document.addEventListener('DOMContentLoaded', () => {
    const customers = JSON.parse(localStorage.getItem('customers') || '[]');
    displayCustomers(customers);
});
