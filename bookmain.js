const API = document.body.dataset.api;

const next = document.getElementById("next");
const previous = document.getElementById("previous");
const numberOfHadith = document.getElementById("numberOfHadith");
const count = document.querySelector(".count");
const hadithText = document.getElementById("hadithText");

let hadiths = [];
let index = 0;

const backButton = document.createElement("a");

backButton.href = "../index.html";
backButton.className = "backButton";
backButton.innerHTML = `
  <span>→</span>
  العودة إلى الكتب
`;

document.querySelector(".container").prepend(backButton);

async function GetHadiths() {
  try {
    hadithText.innerHTML = "جاري تحميل الأحاديث...";

    const res = await fetch(API);

    if (!res.ok) {
      throw new Error("حدث خطأ أثناء تحميل الأحاديث");
    }

    const data = await res.json();

    hadiths = data.hadiths;

    showHadith();
  } catch (error) {
    console.error(error);

    hadithText.innerHTML = "حدث خطأ أثناء تحميل الأحاديث، حاول مرة أخرى.";
  }
}

function showHadith() {
  if (hadiths.length === 0) return;

  numberOfHadith.innerHTML = index + 1;

  count.innerHTML = `الحديث ${index + 1} من ${hadiths.length}`;

  hadithText.classList.add("hide");

  setTimeout(() => {
    hadithText.innerHTML = hadiths[index].text;

    hadithText.classList.remove("hide");
  }, 200);

  if (index > 0) {
    previous.classList.remove("disapled");
  } else {
    previous.classList.add("disapled");
  }

  if (index < hadiths.length - 1) {
    next.classList.remove("disapled");
  } else {
    next.classList.add("disapled");
  }
}

next.addEventListener("click", () => {
  if (index < hadiths.length - 1) {
    index++;

    showHadith();
  }
});

previous.addEventListener("click", () => {
  if (index > 0) {
    index--;

    showHadith();
  }
});

GetHadiths();
