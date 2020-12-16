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
  //if its the first click (meaning total is even,it  starts from 2) run the forward animation.
  if (total % 2 === 0) {
    forwardMenuObject.setAnimation();
    setTimeout(() => {
      forwardListObject.setListAnimation();
    }, 200);
    total -= 1;
  } else {
    //if its the second click (total is odd,1), run the backwards animation
    backwardsMenuObject.setAnimation(); // take 250s for our backwards menuObject animation to close, so after it closes, then we can remove the list menu animation so when we click button again, the animation is re-triggered. We have to wait for backwards menuObject to finish before removing list animation, other list will pop off first, letting us see the background for the menu still dissapearing, which is not what we want.
    setTimeout(() => {
      forwardListObject.removeListAnimation();
    }, 255);
    total += 1;
  }
};
export { ListAnimation };
