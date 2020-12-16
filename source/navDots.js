class NavDots {
  constructor(allNavDots) {
    this.allNavDots = Array.from(allNavDots);
  }
  getId(e) {
    const idString = e.target.id;
    const idNumber = idString.replace(/\D/g, "");
    return +idNumber;
  }
  displayImage(imageSliderObject, idNumber) {
    imageSliderObject.showImage(idNumber);
  }
  focusDot(imageNumber) {
    this.allNavDots.forEach((dot) => {
      if (dot.id === `dot${imageNumber}`) {
        dot.classList.add("focus");
      } else {
        dot.classList.remove("focus");
      }
    });
  }
}

const allNavDots = document.querySelectorAll(".nav-dot");
const navDots = new NavDots(allNavDots);
