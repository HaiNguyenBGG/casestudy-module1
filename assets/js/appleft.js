document.addEventListener('DOMContentLoaded', () => {
    const carData = loadFromLocalStorage(); // Lấy dữ liệu từ localStorage
    const carCategoryList = document.getElementById('car-category-list');
    const carModelsContainer = document.getElementById('car-models');

    // Kiểm tra nếu không có dữ liệu
    if (!carData.length) {
        console.error('Không có dữ liệu xe để hiển thị.');
        carCategoryList.innerHTML = '<p>Không có danh mục sản phẩm để hiển thị.</p>';
        return;
    }

    // Hiển thị danh mục sản phẩm xe
    displayCarCategories(carData);

    // Gắn sự kiện cho danh mục để hiển thị các xe tương ứng
    carCategoryList.addEventListener('click', (e) => {
        const listItem = e.target;
        if (listItem && listItem.dataset.index) {
            const categoryIndex = parseInt(listItem.dataset.index, 10);
            displayCarModels(carData, categoryIndex, 'car-models');
        }
    });
});

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

// Hàm hiển thị danh mục sản phẩm xe
function displayCarCategories(carData) {
    const carCategoryList = document.getElementById('car-category-list');
    carCategoryList.innerHTML = ''; // Xóa nội dung cũ

    carData.forEach((car, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'list-group-item-action');
        listItem.textContent = car.model;
        listItem.setAttribute('data-index', index); // Lưu index danh mục để sử dụng
        carCategoryList.appendChild(listItem);
    });
}

// Hàm hiển thị các xe tương ứng khi nhấp vào danh mục
function displayCarModels(carData, categoryIndex, modelsContainerId) {
    const carModelsContainer = document.getElementById(modelsContainerId);
    if (!carData || !Array.isArray(carData) || categoryIndex >= carData.length) {
        console.error('Dữ liệu hoặc chỉ mục không hợp lệ.');
        return;
    }

    carModelsContainer.innerHTML = ''; // Xóa nội dung cũ

    const selectedCar = carData[categoryIndex];
    const row = document.createElement('div');
    row.classList.add('row', 'gy-3');

    selectedCar.variants.forEach((variant) => {
        const col = document.createElement('div');
        col.classList.add('col-md-4', 'col-sm-3');

        col.innerHTML = `
            <div class="card h-100">
                <img src="${variant.image}" class="card-img-top" alt="${variant.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${selectedCar.model} - ${variant.name}</h5>
                    <p class="card-text">Loại xe: ${selectedCar.type}</p>
                    <p class="card-text">Động cơ: ${variant.engine}</p>
                    <p class="card-text">Hộp số: ${variant.transmission}</p>
                    <p class="card-text">Màu sắc: ${selectedCar.colorOptions.join(', ')}</p>
                    <p class="card-text"><strong>Giá:</strong> ${formatPrice(variant.price)}</p>
                </div>
            </div>
        `;
        row.appendChild(col);
    });

    carModelsContainer.appendChild(row);
}
