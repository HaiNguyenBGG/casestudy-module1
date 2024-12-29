// Hàm tìm kiếm với đối sánh rộng (fuzzy matching)
function searchCars(carData, keyword) {
    const normalizedKeyword = keyword.trim().toLowerCase();
    return carData.filter(car =>
        car.model.toLowerCase().includes(normalizedKeyword) || // Tìm kiếm trong tên model
        car.variants.some(variant => {
            const variantName = variant.name.toLowerCase();
            const engine = variant.engine?.toLowerCase() || '';
            const transmission = variant.transmission?.toLowerCase() || '';

            // Tìm kiếm trong variant hoặc các trường liên quan
            return (
                variantName.includes(normalizedKeyword) ||
                engine.includes(normalizedKeyword) ||
                transmission.includes(normalizedKeyword) ||
                fuzzyMatch(variantName, normalizedKeyword) // Đối sánh rộng
            );
        })
    );
}

// Hàm kiểm tra fuzzy matching (đối sánh rộng)
function fuzzyMatch(text, keyword) {
    const normalizedText = text.replace(/\s+/g, '').toLowerCase();
    const normalizedKeyword = keyword.replace(/\s+/g, '').toLowerCase();

    let i = 0;
    for (let j = 0; j < normalizedText.length && i < normalizedKeyword.length; j++) {
        if (normalizedText[j] === normalizedKeyword[i]) {
            i++;
        }
    }
    return i === normalizedKeyword.length;
}

// Hàm định dạng giá tiền
function formatPrice(price) {
    if (!price) return 'Đang cập nhật';
    return parseInt(price, 10).toLocaleString('vi-VN') + ' VNĐ';
}

// Hiển thị danh sách sản phẩm với phân trang
function displayPaginatedCars(carData, modelsContainerId, itemsPerPage = 6, currentPage = 1) {
    const carModelsContainer = document.getElementById(modelsContainerId);
    carModelsContainer.innerHTML = ''; // Xóa nội dung cũ

    // Tính toán chỉ số phân trang
    const totalItems = carData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    // Lấy danh sách sản phẩm hiển thị cho trang hiện tại
    const itemsToDisplay = carData.slice(startIndex, endIndex);

    // Hiển thị các sản phẩm
    const row = document.createElement('div');
    row.classList.add('row', 'gy-6');
    itemsToDisplay.forEach(item => {
        const col = document.createElement('div');
        col.classList.add('col-md-4', 'col-sm-6');
        col.innerHTML = `
            <div class="card h-100">
                <img src="${item.image || 'assets/images/default.jpg'}" class="card-img-top" alt="${item.name || item.model}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${item.model} - ${item.name || 'Phiên bản không rõ'}</h5>
                    <p class="card-text">Loại xe: ${item.type || 'Không xác định'}</p>
                    <p class="card-text"><strong>Giá:</strong> ${item.price ? formatPrice(item.price) : 'Đang cập nhật'}</p>
                </div>
            </div>
        `;
        row.appendChild(col);
    });
    carModelsContainer.appendChild(row);

    // Tạo phân trang
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
            displayPaginatedCars(carData, modelsContainerId, itemsPerPage, page);
        });
        return button;
    };

    if (currentPage > 1) pagination.appendChild(createPageButton(currentPage - 1, '‹'));
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
            pagination.appendChild(createPageButton(i));
        } else if (Math.abs(i - currentPage) === 2) {
            const dots = document.createElement('span');
            dots.textContent = '...';
            dots.classList.add('mx-1');
            pagination.appendChild(dots);
        }
    }
    if (currentPage < totalPages) pagination.appendChild(createPageButton(currentPage + 1, '›'));

    carModelsContainer.appendChild(pagination);
}

// Lắng nghe sự kiện DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const carModelsContainer = document.getElementById('car-models');

    // Hiển thị toàn bộ sản phẩm khi không tìm kiếm
    function displayAllCars() {
        const carData = JSON.parse(localStorage.getItem('carData')) || [];
        if (carData.length > 0) {
            displayPaginatedCars(carData, 'car-models', 6, 1);
        } else {
            carModelsContainer.innerHTML = '<p>Không có dữ liệu để hiển thị.</p>';
        }
    }

    // Sự kiện tìm kiếm
    searchInput.addEventListener('input', (event) => {
        const keyword = event.target.value.trim();
        const carData = JSON.parse(localStorage.getItem('carData')) || [];
        if (keyword) {
            const searchResults = searchCars(carData, keyword);
            if (searchResults.length > 0) {
                displayPaginatedCars(searchResults, 'car-models', 6, 1);
            } else {
                carModelsContainer.innerHTML = '<p>Không tìm thấy kết quả phù hợp.</p>';
            }
        } else {
            displayAllCars(); // Hiển thị lại tất cả nếu không có từ khóa
        }
    });

    // Hiển thị tất cả sản phẩm khi tải trang
    displayAllCars();
});
