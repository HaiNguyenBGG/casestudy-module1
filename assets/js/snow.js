// Lấy phần tử canvas và ngữ cảnh 2D
const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');

// Kích thước canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Mảng lưu các hạt tuyết
const snowflakes = [];

// Tạo hạt tuyết
function createSnowflakes() {
    const count = 100; // Số lượng hạt tuyết
    for (let i = 0; i < count; i++) {
        snowflakes.push({
            x: Math.random() * canvas.width, // Vị trí ngang ngẫu nhiên
            y: Math.random() * canvas.height, // Vị trí dọc ngẫu nhiên
            radius: Math.random() * 4 + 1, // Kích thước ngẫu nhiên
            speed: Math.random() * 2 + 0.5, // Tốc độ rơi
            drift: Math.random() * 1 - 0.5 // Độ trôi ngang
        });
    }
}

// Vẽ hạt tuyết
function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.beginPath();
    snowflakes.forEach(snowflake => {
        ctx.moveTo(snowflake.x, snowflake.y);
        ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
    });
    ctx.fill();
}

// Cập nhật vị trí hạt tuyết
function updateSnowflakes() {
    snowflakes.forEach(snowflake => {
        snowflake.y += snowflake.speed; // Rơi xuống
        snowflake.x += snowflake.drift; // Trôi ngang

        // Reset vị trí khi hạt tuyết vượt qua màn hình
        if (snowflake.y > canvas.height) {
            snowflake.y = 0;
            snowflake.x = Math.random() * canvas.width;
        }
    });
}

// Vòng lặp hoạt hình
function animateSnowfall() {
    drawSnowflakes();
    updateSnowflakes();
    requestAnimationFrame(animateSnowfall);
}

// Khởi tạo hiệu ứng tuyết rơi
createSnowflakes();
animateSnowfall();

// Xử lý khi thay đổi kích thước màn hình
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    snowflakes.length = 0; // Xóa hạt tuyết cũ
    createSnowflakes();
});
