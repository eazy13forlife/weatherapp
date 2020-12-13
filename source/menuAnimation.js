let total = 2;

class MenuAnimation {
  constructor(menuContainer, animationName, duration, delay = 0, timeFunction) {
    this.menuContainer = menuContainer;
    this.animationName = animationName;
    this.duration = duration;
    this.delay = delay;
    this.timeFunction = timeFunction;
  }

  // set the animation on the menu
  setAnimation() {
    this.menuContainer.setAttribute(
      "style",
      `animation:${this.animationName} ${this.duration}ms forwards ${this.timeFunction} ${this.delay}ms`
    );
  }

  // remove the animation on the menu
  removeAnimation() {
    this.menuContainer.setAttribute("style", "animation:none");
  }
}

const menu = document.querySelector("ul");
const menu1Forward = new Menu(
  menu,
  "menuShowMenu",
  200,
  undefined,
  "cubic-bezier(1,1.7,.58,1)"
);

const menu1Backwards = new Menu(menu, "removeNew", 250, undefined, "ease-in");

// function that runs our menu animation on click
const runMenuAnimation = (forwardObject, backwardsbject) => {
  // on first click(even), open the forward animation
  if (total % 2 === 0) {
    forwardObject.setAnimation();
    total -= 1;
    // on second click(odd),open the backwards animation
  } else {
    backwardsbject.setAnimation();
    total += 1;
  }
};
