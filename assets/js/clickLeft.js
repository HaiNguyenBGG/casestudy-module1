document.addEventListener('DOMContentLoaded', () => {
    const carData = loadFromLocalStorage(); // Lấy dữ liệu từ localStorage
    const carCategoryList = document.getElementById('car-category-list'); // Danh mục bên trái
    const carModelsContainer = document.getElementById('car-models'); // Khu vực hiển thị sản phẩm

    // Kiểm tra nếu không có dữ liệu
    if (!carData.length) {
        console.error('Không có dữ liệu xe để hiển thị.');
        carCategoryList.innerHTML = '<p>Không có danh mục sản phẩm để hiển thị.</p>';
        return;
    }

    // Hiển thị danh mục sản phẩm xe
    displayCarCategories(carData);

    // Sự kiện khi nhấp vào danh mục để hiển thị sản phẩm
    carCategoryList.addEventListener('click', (e) => {
        const listItem = e.target;
        if (listItem && listItem.dataset.index) {
            const categoryIndex = parseInt(listItem.dataset.index, 10);
            displayCarModels(carData, categoryIndex, 'car-models', 6, 1); // Hiển thị sản phẩm với phân trang
        }
    });
});

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

// Hàm hiển thị sản phẩm theo danh mục với phân trang
function displayCarModels(carData, categoryIndex, modelsContainerId, itemsPerPage = 6, currentPage = 1) {
    const carModelsContainer = document.getElementById(modelsContainerId);
    if (!carData || !Array.isArray(carData) || categoryIndex >= carData.length) {
        console.error('Dữ liệu hoặc chỉ mục không hợp lệ.');
        return;
    }

    carModelsContainer.innerHTML = ''; // Xóa nội dung cũ

    const selectedCar = carData[categoryIndex];
    const totalItems = selectedCar.variants.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    // Tạo container "row" để hiển thị sản phẩm
    const row = document.createElement('div');
    row.classList.add('row', 'gy-6');

    // Hiển thị các sản phẩm thuộc trang hiện tại
    const itemsToDisplay = selectedCar.variants.slice(startIndex, endIndex);
    itemsToDisplay.forEach((variant) => {
        const col = document.createElement('div');
        col.classList.add('col-md-4', 'col-sm-6');

        col.innerHTML = `
            <div class="card h-100">
                <img src="${variant.image || 'assets/images/default.jpg'}" class="card-img-top" alt="${variant.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${selectedCar.model} - ${variant.name}</h5>
                    <p class="card-text">Loại xe: ${selectedCar.type}</p>
                    <p class="card-text"><strong>Giá:</strong> ${formatPrice(variant.price)}</p>
                </div>
            </div>
        `;
        row.appendChild(col);
    });

    carModelsContainer.appendChild(row);

    // Thêm phân trang
    const pagination = document.createElement('div');
    pagination.classList.add('pagination', 'mt-4', 'd-flex', 'justify-content-center');

    const createPageButton = (page, text = page) => {
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-outline-primary', 'mx-1');
        button.textContent = text;
        if (page === currentPage) {
            button.classList.add('active');
            button.disabled = true;
        }
        button.addEventListener('click', () => {
            displayCarModels(carData, categoryIndex, modelsContainerId, itemsPerPage, page);
        });
        return button;
    };

    // Nút "Trước"
    if (currentPage > 1) {
        pagination.appendChild(createPageButton(currentPage - 1, '‹'));
    }

    // Hiển thị các nút phân trang
    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 || // Trang đầu
            i === totalPages || // Trang cuối
            (i >= currentPage - 1 && i <= currentPage + 1) // Các trang gần trang hiện tại
        ) {
            pagination.appendChild(createPageButton(i));
        } else if (
            (i === currentPage - 2 || i === currentPage + 2) && // Dấu "..." khi cần
            totalPages > 5
        ) {
            const dots = document.createElement('span');
            dots.textContent = '...';
            dots.classList.add('mx-1');
            pagination.appendChild(dots);
        }
    }

    // Nút "Tiếp"
    if (currentPage < totalPages) {
        pagination.appendChild(createPageButton(currentPage + 1, '›'));
    }

    carModelsContainer.appendChild(pagination);
}

// Hàm định dạng giá tiền
function formatPrice(price) {
    if (!price) return 'Đang cập nhật'; // Nếu không có giá, trả về 'Đang cập nhật'
    return parseInt(price, 10).toLocaleString('vi-VN') + ' VNĐ'; // Định dạng giá theo kiểu VNĐ
}

// Hàm lấy dữ liệu từ localStorage
function loadFromLocalStorage() {
    return JSON.parse(localStorage.getItem('carData')) || [];
}
