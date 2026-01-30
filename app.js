/* ==== DATA ==== */
let received = 1200000;
let spent = 850000;

const receivedEl = document.getElementById("received");
const spentEl = document.getElementById("spent");
const remainEl = document.getElementById("remain");

/* ==== ANIMATE NUMBER ==== */
function animateNumber(el, from, to, duration = 700) {
  const start = performance.now();

  function run(time) {
    const p = Math.min((time - start) / duration, 1);
    const val = Math.floor(from + (to - from) * p);
    el.textContent = val.toLocaleString();
    if (p < 1) requestAnimationFrame(run);
  }
  requestAnimationFrame(run);
}

animateNumber(receivedEl, 0, received);
animateNumber(spentEl, 0, spent);
animateNumber(remainEl, 0, received - spent);

/* ==== DONATE ==== */
const quotes = [
  "Cường sắp được ăn trứng 🍳",
  "Hôm nay lên mì hảo hạng 🍜",
  "Code mượt nhờ cái bụng no 😭",
  "Ân nhân ghi danh sử sách 🫶"
];

document.getElementById("donateBtn").onclick = () => {
  alert(quotes[Math.floor(Math.random() * quotes.length)]);
};

/* ==== RUN BUTTON ==== */
const btn = document.getElementById("runBtn");
const box = btn.parentElement;
let tries = 0;

function moveBtn() {
  const maxX = box.clientWidth - btn.offsetWidth;
  const maxY = box.clientHeight - btn.offsetHeight;

  btn.style.transform = `translate(
    ${Math.random() * maxX}px,
    ${Math.random() * maxY}px
  )`;
}

// btn.addEventListener("mouseenter", moveBtn);
btn.addEventListener("touchstart", moveBtn);

// Hiển thị modal khi bấm nút
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close");

// btn.addEventListener("click", e => {
//   e.preventDefault();
//   // Scroll lên top trước
//   window.scrollTo(0, 0);
  
//   modal.style.display = "block";
//   const modalContent = document.querySelector(".modal-content");
  
//   // Đặt modal ở giữa viewport
//   modalContent.style.left = "50%";
//   modalContent.style.top = "50%";
//   modalContent.style.transform = "translate(-50%, -50%)";
// });

//Sửa
btn.addEventListener("click", e => {
  e.preventDefault();
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
});



// Đóng modal khi bấm nút close
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
});
;

/* ==== 3D + LIGHT FOLLOW ==== */
const cards = document.querySelectorAll(".glass");

cards.forEach(card => {
  let raf;

  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();

    /* ánh sáng theo chuột */
    card.style.setProperty("--x", `${e.clientX - r.left}px`);
    card.style.setProperty("--y", `${e.clientY - r.top}px`);

    /* 3D nhẹ */
    if (raf) return;
    raf = requestAnimationFrame(() => {
      const rx = -(e.clientY - r.top - r.height / 2) / 30;
      const ry = (e.clientX - r.left - r.width / 2) / 30;

      card.style.transform = `
        perspective(1000px)
        rotateX(${rx}deg)
        rotateY(${ry}deg)
        translateZ(10px)
      `;
      raf = null;
    });
  });

  ["mouseleave","touchend","touchcancel"].forEach(evt => {
    card.addEventListener(evt, () => {
      card.style.transform = `
        perspective(1000px)
        rotateX(0)
        rotateY(0)
        translateZ(0)
      `;
    });
  });

  
});


/* ==== FLOATING ICON EFFECT ==== */
const icons = ["🍜","☕","💻","💖","🔥","✨","🧠", "💵", "💸"];

function spawnIcon(x, y) {
  const icon = document.createElement("div");
  icon.className = "float-icon";
  icon.textContent = icons[Math.floor(Math.random() * icons.length)];

  icon.style.left = x + "px";
  icon.style.top = y + "px";

  document.body.appendChild(icon);

  setTimeout(() => icon.remove(), 1200);
}

// Bay icon lên liên tục từ mọi vị trí trên màn hình
window.addEventListener("load", () => {
  setInterval(() => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    spawnIcon(x, y);
  }, 100); // Bay icon mỗi 100ms
});

/* hover card */
document.querySelectorAll(".glass").forEach(card => {
  card.addEventListener("mouseenter", e => {
    const rect = card.getBoundingClientRect();
    spawnIcon(
      rect.left + rect.width / 2,
      rect.top + 20
    );
  });
});

/* click button */
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", e => {
    spawnIcon(e.clientX, e.clientY);
  });
});


