const SUITS = {
  Hearts: { icon: "♥", class: "red" },
  Diamonds: { icon: "♦", class: "red" },
  Clubs: { icon: "♣", class: "" },
  Spades: { icon: "♠", class: "" },
};

const FOODS = {
  A: { Hearts: "Phở", Diamonds: "Cơm tấm", Clubs: "Bánh mì", Spades: "Bún đậu mắm tôm" },
  2: { Hearts: "Bún bò Huế", Diamonds: "Cơm gà", Clubs: "Bánh xèo", Spades: "Bún chả" },
  3: { Hearts: "Bún riêu", Diamonds: "Cơm sườn", Clubs: "Bánh cuốn", Spades: "Nem nướng" },
  4: { Hearts: "Hủ tiếu", Diamonds: "Cơm chiên", Clubs: "Bánh khọt", Spades: "Gỏi cuốn" },
  5: { Hearts: "Miến gà", Diamonds: "Cơm bò lúc lắc", Clubs: "Bánh căn", Spades: "Chả giò" },
  6: { Hearts: "Cháo sườn", Diamonds: "Cơm niêu", Clubs: "Bánh ướt", Spades: "Ốc các loại" },
  7: { Hearts: "Bánh canh", Diamonds: "Cơm cá kho", Clubs: "Bánh bèo", Spades: "Lẩu Thái" },
  8: { Hearts: "Bún mọc", Diamonds: "Cơm gà xối mỡ", Clubs: "Bánh đúc", Spades: "Lẩu bò" },
  9: { Hearts: "Bún thang", Diamonds: "Cơm trộn", Clubs: "Bánh hỏi", Spades: "Lẩu hải sản" },
  10:{ Hearts: "Mì Quảng", Diamonds: "Cơm chay", Clubs: "Bánh tráng nướng", Spades: "BBQ nướng" },
  J: { Hearts: "Bún cá", Diamonds: "Cơm cà ri", Clubs: "Bánh tráng trộn", Spades: "Gà nướng" },
  Q: { Hearts: "Bún chả cá", Diamonds: "Cơm vịt", Clubs: "Bánh bột lọc", Spades: "Vịt quay" },
  K: { Hearts: "Bún mắm", Diamonds: "Cơm thịt kho", Clubs: "Bánh bao", Spades: "Hải sản" },
};

const deckEl = document.getElementById("deck");
const resultEl = document.getElementById("result");
const randomBtn = document.getElementById("randomBtn");

const cards = [];

// Build deck
for (const value in FOODS) {
  for (const suit in FOODS[value]) {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="card-header">
        <div class="value">${value}</div>
        <div class="suit ${SUITS[suit].class}">${SUITS[suit].icon}</div>
      </div>
      <div class="food">${FOODS[value][suit]}</div>
    `;

    deckEl.appendChild(card);
    cards.push({ value, suit, food: FOODS[value][suit], el: card });
  }
}

// Randomize animation
randomBtn.addEventListener("click", () => {
  resultEl.classList.add("hidden");
  cards.forEach(c => c.el.classList.remove("highlight"));

  let ticks = 16;
  const interval = setInterval(() => {
    cards.forEach(c => c.el.classList.remove("highlight"));
    const pick = cards[Math.floor(Math.random() * cards.length)];
    pick.el.classList.add("highlight");

    if (--ticks === 0) {
      clearInterval(interval);
      showResult(pick);
    }
  }, 75);
});

function showResult(card) {
  const suitIcon = SUITS[card.suit].icon;
  resultEl.innerHTML = `
    🎉 <strong>${card.value} ${suitIcon}</strong><br>
    ${card.food}
  `;
  resultEl.classList.remove("hidden");
}
