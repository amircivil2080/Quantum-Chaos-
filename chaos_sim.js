const canvas = document.getElementById('chaosCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const numParticles = 500;
const maxVelocity = 1.5;

// مقداردهی اولیه ذرات آشوبناک
for (let i = 0; i < numParticles; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * maxVelocity,
        vy: (Math.random() - 0.5) * maxVelocity,
    });
}

// تابع رسم ذرات
function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0f0';
    for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

// به‌روزرسانی موقعیت ذرات با فرمول آشوبی
function updateParticles() {
    for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // بازتاب از لبه‌ها
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // معادله آشوبی ساده‌شده
        p.vx += 0.01 * Math.sin(p.y * 0.01);
        p.vy += 0.01 * Math.cos(p.x * 0.01);
    }
}

// تابع اصلی انیمیشن
function animate() {
    drawParticles();
    updateParticles();
    requestAnimationFrame(animate);
}

// شروع انیمیشن
animate();
