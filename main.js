console.clear();

const btn = document.querySelectorAll("[data-btn]");
const test = document.querySelector("#test");

function panningNext() {
  const slides = document.querySelectorAll(".slide");
  const container = document.querySelector(".slider");
  slides.forEach((e) => {
    e.dataset.type = "";
    e.style = "";
    e.classList.remove(
      "to-left",
      "to-right",
      "from-before",
      "to-before",
      "from-after",
      "to-after",
      "fade-in",
      "fade-out"
    );
  });
  slides[0].dataset.type = "before";
  slides[0].classList.add("fade-out");
  gsap.to(".fade-out", { duration: 1, scale: "0, 0" });

  slides[1].dataset.type = "before";
  slides[1].classList.add("to-before");

  gsap.from(".to-before", {
    duration: 1,
    transform: "translatex(0rem)",
    scale: "1, 1",
  });

  slides[2].dataset.type = "active";
  slides[2].classList.add("to-left");

  slides[3].dataset.type = "active";
  slides[3].classList.add("to-left");
  gsap.from(".to-left", { duration: 1, transform: "translatex(10.5rem)" });

  slides[4].dataset.type = "active";
  slides[4].classList.add("from-after");
  gsap.from(".from-after", {
    duration: 1,
    transform: "translatex(7rem)",
    scale: "0.8",
  });

  slides[5].dataset.type = "after";
  slides[5].classList.add("fade-in");
  gsap.from(".fade-in", { duration: 1, scale: "0, 0" });

  setTimeout(() => {
    render(slides, container);
    slides[0].dataset.type = "";
    container.innerHTML += slides[0].outerHTML;
    container.firstElementChild.remove();
  }, 1000);
}

function panningPrev() {
  const slides = document.querySelectorAll(".slide");
  const container = document.querySelector(".slider");
  slides.forEach((e) => {
    e.dataset.type = "";
    e.style = "";
    e.classList.remove(
      "to-left",
      "to-right",
      "from-before",
      "to-before",
      "from-after",
      "to-after",
      "fade-in",
      "fade-out"
    );
  });

  render(slides, container);
  container.insertAdjacentHTML(
    "afterbegin",
    `${slides[slides.length - 1].outerHTML}`
  );
  container.lastElementChild.remove();
  const emptySlides = document.querySelectorAll(".slide");
  emptySlides[0].dataset.type = "before";
  emptySlides[0].classList.add("fade-in");
  gsap.from(".fade-in", { duration: 1, scale: "0, 0" });

  emptySlides[1].dataset.type = "active";
  emptySlides[1].classList.add("from-before");
  gsap.from(".from-before", {
    duration: 1,
    transform: "translatex(-7rem)",
    scale: "0.8",
  });

  emptySlides[2].dataset.type = "active";
  emptySlides[3].dataset.type = "active";
  emptySlides[2].classList.add("to-right");
  emptySlides[3].classList.add("to-right");
  gsap.from(".to-right", { duration: 1, transform: "translatex(-10.5rem)" });

  emptySlides[4].dataset.type = "after";
  emptySlides[4].classList.add("to-after");
  gsap.from(".to-after", {
    duration: 1,
    transform: "translatex(0rem)",
    scale: "1, 1",
  });

  emptySlides[5].dataset.type = "after";
  emptySlides[5].classList.add("fade-out");
  gsap.to(".fade-out", { duration: 1, scale: "0, 0" });
}

function render(slides, container) {
  container.innerHTML = "";
  for (let slide of slides) {
    container.innerHTML += slide.outerHTML;
  }
}

btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.btn == "next") {
      panningNext();
    } else {
      panningPrev();
    }
  });
});
