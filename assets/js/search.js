// Hàm tìm kiếm với đối sánh rộng
function searchCars(carData, keyword) {
    const normalizedKeyword = keyword.trim().toLowerCase();
    const results = [];

    carData.forEach(car => {
        car.variants.forEach(variant => {
            const model = car.model.toLowerCase();
            const variantName = variant.name.toLowerCase();
            const engine = variant.engine.toLowerCase();
            const transmission = variant.transmission.toLowerCase();

            // Kiểm tra nếu từ khóa xuất hiện hoặc gần giống
            if (
                model.includes(normalizedKeyword) ||
                variantName.includes(normalizedKeyword) ||
                engine.includes(normalizedKeyword) ||
                transmission.includes(normalizedKeyword) ||
                fuzzyMatch(model, normalizedKeyword) ||
                fuzzyMatch(variantName, normalizedKeyword)
            ) {
                results.push({
                    ...variant,
                    model: car.model,
                    type: car.type,
                    colorOptions: car.colorOptions,
                });
            }
        });
    });

    return results;
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

// Hiển thị kết quả tìm kiếm
function displaySearchResults(results, container) {
    container.innerHTML = '';

    if (results.length === 0) {
        container.innerHTML = '<p>Không tìm thấy kết quả phù hợp.</p>';
        return;
    }

    const row = document.createElement('div');
    row.classList.add('row', 'gy-3');

    results.forEach(result => {
        const col = document.createElement('div');
        col.classList.add('col-md-4', 'col-sm-6');
        col.innerHTML = `
            <div class="card h-100">
                <img src="${result.image || 'assets/images/default.jpg'}" class="card-img-top" alt="${result.name || result.model}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${result.model} - ${result.name || 'Phiên bản không rõ'}</h5>
                    <p class="card-text">Loại xe: ${result.type || 'Không xác định'}</p>
                    <p class="card-text">Động cơ: ${result.engine || 'Không có thông tin'}</p>
                    <p class="card-text">Hộp số: ${result.transmission || 'Không có thông tin'}</p>
                    <p class="card-text"><strong>Màu sắc:</strong> ${result.colorOptions?.length ? result.colorOptions.join(', ') : 'Không có thông tin'}</p>
                    <p class="card-text"><strong>Giá:</strong> ${result.price ? formatPrice(result.price) : 'Đang cập nhật'}</p>
                </div>
            </div>
        `;
        row.appendChild(col);
    });

    container.appendChild(row);
}

// Hàm định dạng giá tiền
function formatPrice(price) {
    if (!price) return 'Đang cập nhật';
    return parseInt(price, 10).toLocaleString('vi-VN') + ' VNĐ';
}

// Lắng nghe sự kiện tìm kiếm
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchIcon = document.querySelector('.logosearch img'); // Biểu tượng tìm kiếm
    const carModelsContainer = document.getElementById('car-models');

    // Hàm hiển thị tất cả dữ liệu (trang ban đầu)
    function displayAllCars() {
        const carData = JSON.parse(localStorage.getItem('carData')) || [];
        if (carData.length > 0) {
            displayPaginatedCars(carData, 'car-models', 6, 1); // Hiển thị với phân trang
        } else {
            carModelsContainer.innerHTML = '<p>Không có dữ liệu để hiển thị.</p>';
        }
    }

    // Hàm cuộn xuống phần sản phẩm
    function scrollToProducts() {
        const productSection = document.getElementById('car-models');
        productSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Sự kiện khi nhập từ khóa
    searchInput.addEventListener('input', (event) => {
        const keyword = event.target.value.trim();
        const carData = JSON.parse(localStorage.getItem('carData')) || [];

        if (keyword) {
            const searchResults = searchCars(carData, keyword);
            displaySearchResults(searchResults, carModelsContainer);
        } else {
            displayAllCars(); // Trả về trạng thái ban đầu khi không có từ khóa
        }
    });

    // Sự kiện nhấn Enter trong ô tìm kiếm
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            scrollToProducts();
        }
    });

    // Sự kiện click vào biểu tượng tìm kiếm
    searchIcon.addEventListener('click', () => {
        scrollToProducts();
    });

    // Hiển thị tất cả dữ liệu ban đầu khi tải trang
    displayAllCars();
});
