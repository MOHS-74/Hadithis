const API =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.json";

const booksContainer = document.getElementById("booksContainer");
const bookCount = document.getElementById("bookCount");

const booksInfo = {
  bukhari: {
    title: "صحيح البخاري",
    author: "الإمام البخاري",
    folder: "bukhari",
    image: `https://ia600402.us.archive.org/BookReader/BookReaderImages.php?zip=/10/items/79565_20220227_2311/79565_jp2.zip&file=79565_jp2/79565_0000.jp2&id=79565_20220227_2311&scale=4&rotate=0`,
  },

  muslim: {
    title: "صحيح مسلم",
    author: "الإمام مسلم",
    folder: "muslim",
    image:
      "https://ia800807.us.archive.org/BookReader/BookReaderImages.php?zip=/34/items/SahihMuslimKarmi/Sahih_Muslim_Karmi_jp2.zip&file=Sahih_Muslim_Karmi_jp2/Sahih_Muslim_Karmi_0000.jp2&id=SahihMuslimKarmi&scale=8&rotate=0",
  },

  abudawud: {
    title: "سنن أبي داود",
    author: "الإمام أبو داود السجستاني",
    folder: "abudawud",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKR3zbRsFFbMdoJmno9HQ5V6Xu940x6Kd0xpjqdEaMBzcv9a7riyh9NZ8&s=10",
  },

  ibnmajah: {
    title: "سنن ابن ماجه",
    author: "الإمام ابن ماجه",
    folder: "ibnmajah",
    image:
      "https://ia600504.us.archive.org/BookReader/BookReaderImages.php?zip=/33/items/sounnan-ibn-madjih_202309/Sounnan%20Ibn%20Madjih-%D8%B3%D9%86%D9%86%20%D8%A7%D8%A8%D9%86%20%D9%85%D8%A7%D8%AC%D9%87_jp2.zip&file=Sounnan%20Ibn%20Madjih-%D8%B3%D9%86%D9%86%20%D8%A7%D8%A8%D9%86%20%D9%85%D8%A7%D8%AC%D9%87_jp2/Sounnan%20Ibn%20Madjih-%D8%B3%D9%86%D9%86%20%D8%A7%D8%A8%D9%86%20%D9%85%D8%A7%D8%AC%D9%87_0000.jp2&id=sounnan-ibn-madjih_202309&scale=2&rotate=0",
  },

  malik: {
    title: "موطأ الإمام مالك",
    author: "الإمام مالك بن أنس",
    folder: "malik",
    image:
      "https://archive.org/services/img/AlMuwatae/full/pct:200/0/default.jpg",
  },

  nasai: {
    title: "سنن النسائي",
    author: "الإمام النسائي",
    folder: "nasai",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSruRiGLUbhIEXuJIWSq_fFYSaGBDdx-zS5uYJLxGqZ26QwCuhX3Qpml0q&s=10",
  },

  nawawi: {
    title: "الأربعون النووية",
    author: "الإمام النووي",
    folder: "nawawi",
    image:
      "https://ia802907.us.archive.org/BookReader/BookReaderImages.php?zip=/9/items/Matn_alarbaein_alnawawiuh/%D9%85%D8%AA%D9%86%20%D8%A7%D9%84%D8%A3%D8%B1%D8%A8%D8%B9%D9%8A%D9%86%20%D8%A7%D9%84%D9%86%D9%88%D9%88%D9%8A%D9%87_jp2.zip&file=%D9%85%D8%AA%D9%86%20%D8%A7%D9%84%D8%A3%D8%B1%D8%A8%D8%B9%D9%8A%D9%86%20%D8%A7%D9%84%D9%86%D9%88%D9%88%D9%8A%D9%87_jp2/%D9%85%D8%AA%D9%86%20%D8%A7%D9%84%D8%A3%D8%B1%D8%A8%D8%B9%D9%8A%D9%86%20%D8%A7%D9%84%D9%86%D9%88%D9%88%D9%8A%D9%87_0000.jp2&id=Matn_alarbaein_alnawawiuh&scale=8&rotate=0",
  },

  qudsi: {
    title: "الأحاديث القدسية",
    author: "أحاديث قدسية مختارة",
    folder: "qudsi",
    image:
      "https://www.neelwafurat.com/images/lb/abookstore/covers/hard/138/138296.jpg",
  },

  tirmidhi: {
    title: "جامع الترمذي",
    author: "الإمام الترمذي",
    folder: "tirmidhi",
    image:
      "https://archive.org/services/img/termizi-dar-alsalam/full/pct:200/0/default.jpg",
  },
};

async function getBooks() {
  try {
    const response = await fetch(API);

    if (!response.ok) {
      throw new Error("حدث خطأ أثناء تحميل البيانات");
    }

    const data = await response.json();

    createBooks(data);
  } catch (error) {
    console.error(error);

    booksContainer.innerHTML = `
      <div class="error">
        حدث خطأ أثناء تحميل الكتب، حاول مرة أخرى.
      </div>
    `;

    bookCount.textContent = "تعذر تحميل الكتب";
  }
}

function createBooks(data) {
  booksContainer.innerHTML = "";

  const books = [];

  for (const bookKey in booksInfo) {
    if (!data[bookKey]) {
      continue;
    }

    const collection = data[bookKey].collection;

    if (!collection) {
      continue;
    }

    const arabicEdition = collection.find(
      (edition) =>
        edition.language === "Arabic" && edition.name === `ara-${bookKey}`,
    );

    if (!arabicEdition) {
      continue;
    }

    books.push({
      key: bookKey,
      ...booksInfo[bookKey],
      api: arabicEdition.link,
    });
  }

  bookCount.textContent = `${books.length} كتب`;

  books.forEach((book) => {
    const card = document.createElement("a");

    card.className = "bookCard";

    card.href = `./${book.folder}/index.html`;

    card.innerHTML = `
      <div class="bookCover">
        <img
          src="${book.image}"
          alt="${book.title}"
          loading="lazy"
        >
      </div>

      <div class="bookInfo">
        <div class="bookTitle">
          ${book.title}
        </div>

        <div class="bookAuthor">
          ${book.author}
        </div>

        <div class="bookOpen">
          <span>قراءة الكتاب</span>

          <span class="bookOpenArrow">
            ←
          </span>
        </div>
      </div>
    `;

    booksContainer.appendChild(card);
  });
}

getBooks();
