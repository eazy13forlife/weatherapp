class ImageSlider {
  constructor(allImageDivs, navDotsObject) {
    this.allImageDivs = Array.from(allImageDivs);
    this.imageNumber;
    this.navDotsObject = navDotsObject;
  }
  incrementNumber() {
    this.imageNumber += 1;
  }
  decrementNumber() {
    this.imageNumber -= 1;
  }
  showImage(number) {
    this.allImageDivs.forEach((image) => {
      if (image.id !== `_${number}`) {
        image.setAttribute("style", "display:none");
      } else {
        image.setAttribute("style", "display:block");
      }
    });
    this.imageNumber = number;
    this.navDotsObject.focusDot(this.imageNumber);
  }
  moveSlideForward() {
    if (this.imageNumber >= this.allImageDivs.length) return;
    this.incrementNumber();
    this.showImage(this.imageNumber);
    this.navDotsObject.focusDot(this.imageNumber);
  }
  moveSlideBackwards() {
    if (this.imageNumber <= 1) return;
    this.decrementNumber();
    this.showImage(this.imageNumber);
    this.navDotsObject.focusDot(this.imageNumber);
  }
  playSlide(e) {
    if (e.target.id === "right_arrow") {
      this.moveSlideForward();
    } else if (e.target.id === "left_arrow") {
      this.moveSlideBackwards();
    }
  }
  playSlideAutomatically(number, msInterval) {
    this.showImage(number);
    let msMultiplier = 0;
    for (let i = number; i < this.allImageDivs.length; i++) {
      msMultiplier += 1;
      console.log(msMultiplier);
      setTimeout(() => {
        this.allImageDivs[i - 1].setAttribute("style", "display:none");
        this.allImageDivs[i].setAttribute("style", "display:block");
        this.navDotsObject.focusDot(i + 1);
      }, msInterval * msMultiplier);
    }
  }
}

const allImageDivs = document.querySelectorAll(".img");
const newSlider = new ImageSlider(allImageDivs, navDots);
newSlider.showImage(1);
document.querySelector("#right_arrow").addEventListener("click", (e) => {
  newSlider.playSlide(e);
});

document.querySelector("#left_arrow").addEventListener("click", (e) => {
  newSlider.playSlide(e);
});

document.querySelector("#play_slide").addEventListener("click", (e) => {
  newSlider.playSlideAutomatically(4, 5000);
});

allNavDots.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    const idNumber = navDots.getId(e);
    navDots.displayImage(newSlider, idNumber);
  });
});
