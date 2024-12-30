// Lấy phần tử canvas và ngữ cảnh 2D
const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');

// Kích thước canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Hiệu ứng pháo hoa
function createFirework(x, y) {
    const particles = [];
    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: x,
            y: y,
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 4 + 1,
            radius: Math.random() * 2 + 1,
            alpha: 1
        });
    }

    function drawFirework() {
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${particle.alpha})`;
            ctx.fill();
        });
    }

    function updateFirework() {
        particles.forEach(particle => {
            particle.x += Math.cos(particle.angle) * particle.speed;
            particle.y += Math.sin(particle.angle) * particle.speed;
            particle.alpha -= 0.02;
        });
    }

    function animateFirework() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawFirework();
        updateFirework();
        requestAnimationFrame(() => {
            if (particles.some(particle => particle.alpha > 0)) {
                animateFirework();
            }
        });
    }

    animateFirework();
}

// Hiển thị pháo hoa liên tục
function continuousFireworks() {
    setInterval(() => {
        createFirework(
            Math.random() * canvas.width,
            Math.random() * canvas.height / 2
        );
    }, 500);
}

// Bắt đầu hiệu ứng pháo hoa
window.addEventListener('load', () => {
    continuousFireworks();
});

// Xử lý khi thay đổi kích thước màn hình
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});