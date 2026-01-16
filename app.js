let received = 1200000;
let spent = 850000;

document.getElementById("received").innerText = received.toLocaleString();
document.getElementById("spent").innerText = spent.toLocaleString();
document.getElementById("remain").innerText = (received - spent).toLocaleString();

const btn = document.getElementById("runBtn");

btn.addEventListener("mouseenter", () => {
  const x = Math.random() * 250;
  const y = Math.random() * 40;
  btn.style.transform = `translate(${x}px, ${y}px)`;
});

document.getElementById("donateBtn").onclick = () => {
  alert("Anh Chị vào ngân hàng chuyển tiền đi em đói quá r 🍜❤️");
};


const cards = document.querySelectorAll(".glass");

cards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 18;
    const rotateY = (x - centerX) / 18;

    card.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(12px)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `
      perspective(900px)
      rotateX(0deg)
      rotateY(0deg)
      translateZ(0)
    `;
  });
});
