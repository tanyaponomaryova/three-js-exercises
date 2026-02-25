document.addEventListener("DOMContentLoaded", () => {
  // квадрат - круг
  const shape = document.querySelector(".shape");
  const btn1 = document.querySelector(".btn-1");
  btn1.addEventListener("click", () => {
    console.log("click");
    shape.classList.toggle("big");
    shape.classList.toggle("pink");
    shape.classList.toggle("round");
  });
  //----------------------------------

  // кнопка + подпись
  const btn2 = document.querySelector(".btn-2");
  btn2.addEventListener("click", () => {
    const demo = document.querySelector("#demo");
    if (demo.innerHTML === ":(") {
      demo.innerHTML = ":|";
    } else if (demo.innerHTML === ":|") {
      demo.innerHTML = ":)";
    } else if (demo.innerHTML === ":)") {
      demo.innerHTML = ":D";
    } else if (demo.innerHTML === ":D") {
      demo.innerHTML = ":(";
    }
  });
  // ------------------------------------------

  // кружочки
  const points = document.querySelectorAll(".point");
  points.forEach((point) => {
    point.addEventListener("mouseover", () => {
      point.classList.toggle("transparent");
    });
    point.addEventListener("mouseout", () => {
      point.classList.toggle("transparent");
    });
  });
});
