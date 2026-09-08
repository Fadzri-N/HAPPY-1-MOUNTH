document.addEventListener("DOMContentLoaded", function () {
  // Render Feather Icons
  if (typeof feather !== "undefined") {
    feather.replace();
  }

  // Elemen Amplop & Surat
  const envelopeWrapper = document.getElementById("envelopeWrapper");
  const envelopeSeal = document.getElementById("envelopeSeal");
  const envelopeHint = document.getElementById("envelopeHint");
  const typedTextContainer = document.getElementById("typedText");

  // Isi teks surat
  const letterParagraphs = [
  "Hai, Sayanggg! Nggak terasa ya, hari ini kita sudah melewati satu bulan bersama. Terima kasih ya sudah hadir dan jadi bagian dari hari-hari aku selama sebulan ini.",
  "Kamu itu hebat banget, selalu bawa banyak hal baik dan senyuman di hidup aku. Semoga ke depannya kita bisa terus saling dukung, makin seru, dan bahagia terus yaaa, LOVE YOU ❤️"
];

  window.heartInterval = null;
  let isTyping = false;

  // Fungsi Buka Amplop (Klik Segel)
  if (envelopeSeal && envelopeWrapper) {
    envelopeSeal.addEventListener("click", function (e) {
      e.stopPropagation(); // Mencegah klik tembus ke wrapper
      openEnvelope();
    });
  }

  // Fungsi Tutup Amplop (Klik di mana saja pada area amplop/surat saat terbuka)
  if (envelopeWrapper) {
    envelopeWrapper.addEventListener("click", function (e) {
      if (envelopeWrapper.classList.contains("open")) {
        closeEnvelope();
      }
    });
  }

  function openEnvelope() {
    envelopeWrapper.classList.add("open");
    if (envelopeHint) {
      envelopeHint.innerText = "Klik di mana saja untuk menutup";
    }

    // Jalankan efek hujan love
    startContinuousHearts();

    // Jalankan efek ketik otomatis
    startTypingEffect();
  }

  function closeEnvelope() {
    envelopeWrapper.classList.remove("open");
    if (envelopeHint) {
      envelopeHint.innerText = "Klik segel untuk membuka";
    }

    // Hentikan efek love dan reset teks surat
    stopContinuousHearts();
    if (typedTextContainer) {
      typedTextContainer.innerHTML = "";
    }
    isTyping = false;
  }

  // Fungsi Efek Ketik Otomatis
  function startTypingEffect() {
    if (!typedTextContainer || isTyping) return;
    isTyping = true;
    typedTextContainer.innerHTML = ""; // Bersihkan dulu

    let pIndex = 0;

    function typeParagraph() {
      if (pIndex >= letterParagraphs.length) {
        isTyping = false;
        return;
      }

      const p = document.createElement("p");
      typedTextContainer.appendChild(p);

      let text = letterParagraphs[pIndex];
      let charArray = Array.from(text); // Aman untuk spasi dan emoji
      let charIndex = 0;

      function typeChar() {
        if (!envelopeWrapper.classList.contains("open")) return;

        if (charIndex < charArray.length) {
          p.textContent += charArray[charIndex];
          charIndex++;
          setTimeout(typeChar, 55); 
        } else {
          pIndex++;
          setTimeout(typeParagraph, 600); 
        }
      }

      typeChar();
    }

    typeParagraph();
  }

  // Fungsi Hujan Love dengan Durasi Sangat Lama / Pelan
  function startContinuousHearts() {
    const emojis = ['❤️', '💖', '💕', '💗', '💓', '🌸'];

    stopContinuousHearts();

    window.heartInterval = setInterval(() => {
      if (!envelopeWrapper.classList.contains("open")) {
        stopContinuousHearts();
        return;
      }

      const heart = document.createElement("div");
      heart.classList.add("floating-heart");
      heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      
      heart.style.left = Math.random() * window.innerWidth + "px";
      heart.style.top = "-30px";
      
      const duration = Math.random() * 5 + 10; 
      heart.style.animationDuration = duration + "s";
      
      const size = Math.random() * 20 + 16; 
      heart.style.fontSize = size + "px";

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, duration * 1000);
      
    }, 400); 
  }

  function stopContinuousHearts() {
    if (window.heartInterval) {
      clearInterval(window.heartInterval);
      window.heartInterval = null;
    }

    const activeHearts = document.querySelectorAll('.floating-heart');
    activeHearts.forEach(heart => heart.remove());
  }
});

// ==========================================
// TOGGLE FLOATING SPOTIFY PLAYER
// ==========================================
function toggleSpotify() {
  const container = document.getElementById('spotifyContainer');
  const toggleIcon = document.getElementById('toggleIcon');
  
  container.classList.toggle('active');
  
  if (container.classList.contains('active')) {
    toggleIcon.innerText = "✕"; 
  } else {
    toggleIcon.innerText = "🎵"; 
  }
}

// ==========================================
// MINI GAME: KOTAK HADIAH & BOTOL HARAPAN
// ==========================================

function typeGameText(element, text) {
  element.innerText = "";
  let i = 0;
  let charArray = Array.from(text);
  
  function typing() {
    if (i < charArray.length) {
      element.textContent += charArray[i];
      i++;
      setTimeout(typing, 30); 
    }
  }
  
  typing();
}

// Fungsi Kotak Misterius dengan Efek Guncangan & Ledakan Bintang
function openBox(boxNumber) {
  const boxMessage = document.getElementById('boxMessage');
  const resultBox = document.getElementById('boxResult');
  const minigameSection = document.querySelector('.minigame-section');
  
  let messages = [
    "💌 Hadiahnya: Di pijit setiap kita ketemuu 💆🏼‍♀️",
    "💌 Hadiahnya: Belii fresh flowerr 💐",
    "💌 Hadiahnya: Ke kopkenn dan beli yag kamu mau ☕🍪 "
  ];

  if (minigameSection) {
    minigameSection.classList.remove('shake-effect');
    void minigameSection.offsetWidth; 
    minigameSection.classList.add('shake-effect');
  }

  createSparkleBurst();

  resultBox.style.animation = 'none';
  resultBox.offsetHeight; 
  resultBox.style.animation = 'popIn 0.4s forwards';

  typeGameText(boxMessage, messages[boxNumber - 1]);
}

function createSparkleBurst() {
  const symbols = ['✨', '🌟', '💖', '🎉', '⭐', '💫'];
  const count = 18; 

  const originX = window.innerWidth / 2;
  const originY = window.innerHeight / 2;

  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('burst-sparkle');
    sparkle.innerText = symbols[Math.floor(Math.random() * symbols.length)];

    sparkle.style.left = originX + 'px';
    sparkle.style.top = originY + 'px';

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 180 + 50; 
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    sparkle.style.setProperty('--dx', `${dx}px`);
    sparkle.style.setProperty('--dy', `${dy}px`);

    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 1000);
  }
}

// Botol Harapan Terhubung Langsung ke WhatsApp Kamu
function sendWishToWhatsApp() {
  const input = document.getElementById('wishInput');
  const response = document.getElementById('wishResponse');
  const flyingBottle = document.getElementById('flyingBottle'); 
  const wishText = input.value.trim();

  if (wishText === "") {
    typeGameText(response, "Tulis dulu pesannya yaaa, jangan dikosongin dongg 🤭");
    return;
  }

  // Nomor WhatsApp kamu
  const myWhatsAppNumber = "6289527392152"; 
  const waMessage = `Halo! Aku kirim pesan lewat Botol Harapan nih 🌊✨:\n\n"${wishText}"`;
  const encodedMessage = encodeURIComponent(waMessage);
  const whatsappURL = `https://wa.me/${myWhatsAppNumber}?text=${encodedMessage}`;

  if (flyingBottle) {
    typeGameText(response, "Melempar botol harapan ke laut... 🌊✨");
    flyingBottle.classList.remove('throw');
    void flyingBottle.offsetWidth; 
    flyingBottle.classList.add('throw');

    // Tunggu sebentar (1.2 detik) agar animasi botol terlihat, lalu buka WhatsApp
    setTimeout(() => {
      typeGameText(response, "Botol berhasil sampai! Membuka WhatsApp... 🚀");
      window.open(whatsappURL, '_blank');
    }, 1200);
  } else {
    window.open(whatsappURL, '_blank');
  }
  
  input.value = ""; 
}