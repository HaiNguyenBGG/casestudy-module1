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
function displayPaginatedCars(carData, modelsContainerId, itemsPerPage = 6, currentPage = 1) {
    const carModelsContainer = document.getElementById(modelsContainerId);
    if (!carData || !Array.isArray(carData)) {
        console.error('Dữ liệu carData không hợp lệ.');
        return;
    }

    // Xóa nội dung cũ
    carModelsContainer.innerHTML = '';

    // Tạo container "row" để sắp xếp các card theo hàng ngang
    const row = document.createElement('div');
    row.classList.add('row', 'gy-6');

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
        col.classList.add('col-md-4', 'col-sm-6');

        col.innerHTML = `
            <div class="card h-100">
                <img src="${variant.image}" class="card-img-top" alt="${variant.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${variant.model} - ${variant.name}</h5>
                    <p class="card-text">Loại xe: ${variant.type}</p>
                    <p class="card-text"><strong>Giá:</strong> ${formatPrice(variant.price)}</p>
                </div>
            </div>
        `;
        row.appendChild(col);
    });

    carModelsContainer.appendChild(row);

    // Tạo nút phân trang
    const pagination = document.createElement('div');
    pagination.classList.add('pagination', 'mt-4', 'd-flex', 'justify-content-center');

    // Hàm tạo nút phân trang
    const createPageButton = (page, text = page) => {
        const pageButton = document.createElement('button');
        pageButton.classList.add('btn', 'btn-outline-primary', 'mx-1');
        pageButton.textContent = text;
        if (page === currentPage) {
            pageButton.classList.add('active');
            pageButton.disabled = true;
        }
        pageButton.addEventListener('click', () => {
            displayPaginatedCars(carData, modelsContainerId, itemsPerPage, page);
        });
        return pageButton;
    };

    // Nút "Trước"
    if (currentPage > 1) {
        pagination.appendChild(createPageButton(currentPage - 1, '‹'));
    }

    // Nút đầu tiên
    if (currentPage > 2) {
        pagination.appendChild(createPageButton(1));
    }

    // Dấu "..." nếu cần
    if (currentPage > 3) {
        const dots = document.createElement('span');
        dots.textContent = '...';
        dots.classList.add('mx-1');
        pagination.appendChild(dots);
    }

    // Các nút xung quanh trang hiện tại
    for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
        pagination.appendChild(createPageButton(i));
    }

    // Dấu "..." nếu cần
    if (currentPage < totalPages - 2) {
        const dots = document.createElement('span');
        dots.textContent = '...';
        dots.classList.add('mx-1');
        pagination.appendChild(dots);
    }

    // Nút cuối cùng
    if (currentPage < totalPages - 1) {
        pagination.appendChild(createPageButton(totalPages));
    }

    // Nút "Tiếp"
    if (currentPage < totalPages) {
        pagination.appendChild(createPageButton(currentPage + 1, '›'));
    }

    carModelsContainer.appendChild(pagination);
}