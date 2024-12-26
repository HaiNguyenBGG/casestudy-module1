// Hàm định dạng giá tiền
function formatPrice(price) {
    if (!price) return 'Đang cập nhật'; // Nếu không có giá, trả về 'Đang cập nhật'
    return parseInt(price, 10).toLocaleString('vi-VN') + ' VNĐ'; // Định dạng giá theo kiểu VNĐ
}

// Hàm lưu dữ liệu vào localStorage
function saveToLocalStorage(data) {
    localStorage.setItem('carData', JSON.stringify(data));
}

// Hàm lấy dữ liệu từ localStorage
function loadFromLocalStorage() {
    return JSON.parse(localStorage.getItem('carData')) || [];
}

// Hàm hiển thị xe theo phân trang
function displayPaginatedCars(carData, modelsContainerId, itemsPerPage = 3, currentPage = 1) {
    const carModelsContainer = document.getElementById(modelsContainerId);
    if (!carData || !Array.isArray(carData)) {
        console.error('Dữ liệu carData không hợp lệ.');
        return;
    }

    // Xóa nội dung cũ
    carModelsContainer.innerHTML = '';

    // Tạo container "row" để sắp xếp các card theo hàng ngang
    const row = document.createElement('div');
    row.classList.add('row', 'gy-3');

    // Tính toán các chỉ số để phân trang
    const allVariants = carData.flatMap(car => car.variants.map(variant => ({
        ...variant,
        model: car.model,
        colorOptions: car.colorOptions,
        make: car.make,
        type: car.type,
        year: car.year
    })));

    const totalItems = allVariants.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    // Lấy danh sách các item cho trang hiện tại
    const itemsToDisplay = allVariants.slice(startIndex, endIndex);

    // Hiển thị các item của trang hiện tại
    itemsToDisplay.forEach(variant => {
        const col = document.createElement('div');
        col.classList.add('col-md-4', 'col-sm-3');

        col.innerHTML = `
            <div class="card h-100">
                <img src="${variant.image}" class="card-img-top" alt="${variant.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${variant.model} - ${variant.name}</h5>
                    <p class="card-text">Loại xe: ${variant.type}</p>
                    <p class="card-text">Động cơ: ${variant.engine}</p>
                    <p class="card-text">Hộp số: ${variant.transmission}</p>
                    <p class="card-text">Màu sắc: ${variant.colorOptions.join(', ')}</p>
                    <p class="card-text"><strong>Giá:</strong> ${formatPrice(variant.price)}</p>
                </div>
            </div>
        `;
        row.appendChild(col);
    });

    carModelsContainer.appendChild(row);

    // Thêm các nút phân trang
    const pagination = document.createElement('div');
    pagination.classList.add('pagination', 'mt-4', 'd-flex', 'justify-content-center');

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.classList.add('btn', 'btn-outline-primary', 'mx-1');
        pageButton.textContent = i;
        pageButton.disabled = i === currentPage;
        pageButton.addEventListener('click', () => {
            displayPaginatedCars(carData, modelsContainerId, itemsPerPage, i);
        });
        pagination.appendChild(pageButton);
    }

    carModelsContainer.appendChild(pagination);
}

// Lắng nghe sự kiện DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const carData = loadFromLocalStorage(); // Lấy dữ liệu từ localStorage
    const modelsContainerId = 'car-models';

    if (carData.length > 0) {
        displayPaginatedCars(carData, modelsContainerId, 3, 1); // Hiển thị dữ liệu mới nhất
    } else {
        console.error('Không có dữ liệu xe để hiển thị.');
    }
});
