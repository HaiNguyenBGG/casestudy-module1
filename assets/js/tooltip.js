
document.addEventListener("DOMContentLoaded", function () {
    // Lấy tất cả các thẻ card hiện tại
    const cards = document.querySelectorAll(".card");

    // Lấy dữ liệu từ localStorage
    const carData = loadFromLocalStorage();

    // Tạo tooltip cho mỗi card dựa trên dữ liệu carData
    let index = 0; // Đếm thứ tự phiên bản để khớp với carData

    cards.forEach((card) => {
        // Tìm phiên bản phù hợp trong carData
        let car, variant;

        for (const carItem of carData) {
            if (index < carItem.variants.length) {
                car = carItem;
                variant = carItem.variants[index];
                break;
            } else {
                index -= carItem.variants.length;
            }
        }

        // Nếu không tìm thấy dữ liệu, bỏ qua
        if (!car || !variant) {
            console.error("Không tìm thấy dữ liệu cho card:", card);
            return;
        }

        // Tạo nội dung tooltip chi tiết
        const tooltipContent = `
            <strong>${car.make} ${car.model} - ${variant.name}</strong><br>
            <strong>Loại xe:</strong> ${car.type}<br>
            <strong>Động cơ:</strong> ${variant.engine}<br>
            <strong>Hộp số:</strong> ${variant.transmission}<br>
            <strong>Màu sắc:</strong> ${car.colorOptions.join(", ")}<br>
            <strong>Giá:</strong> ${variant.price || "Đang cập nhật"}<br>
            <strong>Tính năng:</strong> ${car.features.join(", ")}
        `;

        // Gán tooltip
        card.setAttribute("data-bs-toggle", "tooltip");
        card.setAttribute("data-bs-html", "true");
        card.setAttribute("title", tooltipContent);

        // Tiếp tục đến phiên bản kế tiếp
        index++;
    });

    // Khởi tạo tooltip sau khi gán
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

function initializeTooltips() {
    // Xóa các tooltip cũ (nếu có) trước khi khởi tạo lại
    const existingTooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    existingTooltips.forEach((tooltipEl) => {
        const instance = bootstrap.Tooltip.getInstance(tooltipEl);
        if (instance) {
            instance.dispose(); // Hủy tooltip cũ
        }
    });

    // Khởi tạo tooltip mới cho tất cả các thẻ `.card`
    const cards = document.querySelectorAll(".card[data-bs-toggle='tooltip']");
    cards.forEach((card) => {
        new bootstrap.Tooltip(card);
    });
}
