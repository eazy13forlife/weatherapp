let total = 2;
class ListAnimation {
  constructor(allMenuItems, animationName, duration = 350, timeFunction) {
    this.allMenuItems = allMenuItems;
    this.animationName = animationName;
    this.duration = duration;
    this.timeFunction = timeFunction;
  }

  setListAnimation() {
    for (let i = 0; i < this.allMenuItems.length; i++) {
      this.allMenuItems[i].setAttribute(
        "style",
        `animation:${this.animationName} ${this.duration}ms ${
          300 * i
        }ms  forwards ${this.timeFunction}`
      );
    }
  }

  removeListAnimation() {
    this.allMenuItems.forEach((item) => {
      item.setAttribute("style", "animation:none");
    });
  }
}

const runListAnimation = (
  forwardMenuObject,
  forwardListObject,
  backwardsMenuObject
) => {
  if (total % 2 === 0) {
    forwardMenuObject.setAnimation();
    setTimeout(() => {
      forwardListObject.setListAnimation();
    }, 200);
    total -= 1;
  } else {
    backwardsMenuObject.setAnimation(); // take 250s for it to close, so after it closes then the list menu can be invisible again
    setTimeout(() => {
      forwardListObject.removeListAnimation();
    }, 255);
    total += 1;
  }
};
export { ListAnimation };
