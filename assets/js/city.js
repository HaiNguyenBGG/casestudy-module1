// Lấy container danh sách và dropdown
const topCarsListContainer = document.getElementById('top-cars-list');
const provinceDropdown = document.getElementById('province-selector');

// Dữ liệu top xe theo tỉnh
const topCarsByCity = {
    "Hà Nội": [
        "Kia Morning", "Kia K5", "Kia Sorento", "Kia K3", "Kia Seltos",
        "Kia Carnival", "Kia Sonet", "Kia Soluto"
    ],
    "Đà Nẵng": [
        "Kia K3", "Kia Sorento", "Kia Carnival", "Kia Morning", "Kia Sonet",
        "Kia K5", "Kia Soluto", "Kia Seltos"
    ],
    "Hồ Chí Minh": [
        "Kia Carnival", "Kia Morning", "Kia K5", "Kia Sorento", "Kia Seltos",
        "Kia K3", "Kia Soluto", "Kia Sonet"
    ]
};

// Hàm hiển thị danh sách top xe theo tỉnh
function displayTopCarsByCity(city) {
    // Xóa danh sách cũ
    topCarsListContainer.innerHTML = '';

    // Lấy danh sách xe theo tỉnh
    const cars = topCarsByCity[city];
    if (cars) {
        cars.forEach(car => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.textContent = car;
            topCarsListContainer.appendChild(listItem);
        });
    } else {
        const emptyMessage = document.createElement('li');
        emptyMessage.className = 'list-group-item text-muted';
        emptyMessage.textContent = 'Không có dữ liệu cho tỉnh này.';
        topCarsListContainer.appendChild(emptyMessage);
    }
}

// Gắn sự kiện thay đổi cho dropdown
provinceDropdown.addEventListener('change', (e) => {
    const selectedCity = e.target.value;
    displayTopCarsByCity(selectedCity);
});

// Hiển thị mặc định cho tỉnh đầu tiên
displayTopCarsByCity(provinceDropdown.value);
