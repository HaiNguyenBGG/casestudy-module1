document.addEventListener('DOMContentLoaded', () => {
    loadAndDisplayData();

    // Lắng nghe sự kiện tìm kiếm
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (event) => {
        const keyword = event.target.value.trim().toLowerCase();
        const carData = JSON.parse(localStorage.getItem('carData')) || [];

        if (keyword) {
            const searchResults = searchCars(carData, keyword);
            const container = document.getElementById('car-models');
            displaySearchResults(searchResults, container);
        } else {
            loadAndDisplayData(); // Hiển thị tất cả nếu không có từ khóa
        }
    });
});

// Hiển thị dữ liệu toàn bộ
function loadAndDisplayData() {
    const carData = JSON.parse(localStorage.getItem('carData')) || [];
    const container = document.getElementById('car-models');
    if (carData.length > 0) {
        displayPaginatedCars(carData, 'car-models', 6, 1); // Phân trang
    } else {
        container.innerHTML = '<p>Không có dữ liệu để hiển thị.</p>';
    }
}
