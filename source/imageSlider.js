class ImageSlider {
  constructor(imagesContainer) {
    this.imagesContainer = Array.from(imagesContainer);
    this.id;
  }
  showImage(imageNumber) {
    this.imagesContainer.forEach((image) => {
      if (image.id !== `_${imageNumber}`) {
        image.setAttribute("style", "display:none");
      } else {
        image.setAttribute("style", "display:block");
      }
    });
    this.id = imageNumber;
  }
  moveSlideForward() {
    if (this.id >= this.imagesContainer.length) return;
    this.id += 1;
    this.showImage(this.id);
  }
  moveSlideBackwards() {
    if (this.id <= 1) return;
    this.id -= 1;
    this.showImage(this.id);
  }
  playSlide(e) {
    if (e.target.id === "right_arrow") {
      this.moveSlideForward();
    } else if (e.target.id === "left_arrow") {
      this.moveSlideBackwards();
    }
  }
  playSlideAutomatically(imageNumber, msInterval) {
    this.showImage(imageNumber);
    for (let i = 0; i < this.imagesContainer.length; i++) {
      setTimeout(() => {
        this.imagesContainer[i - 1].setAttribute("style", "display:none");
        this.imagesContainer[i].setAttribute("style", "display:block");
      }, msInterval * i);
    }
  }
}

const allImages = document.querySelectorAll(".img");
const newSlider = new ImageSlider(allImages);
newSlider.showImage(1);
