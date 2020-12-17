const form = document.querySelector("form");
const allInputs = document.querySelectorAll("input");
console.log(allInputs);
class FormValidator {
  constructor(formElement, allInputItems) {
    this.formElement = formElement;
    this.allInputItems = Array.from(allInputItems);
  }

  initialize() {
    this.validateLive();
    this.validateOnSubmit();
  }
  //checks to see if our input fields are valid as we type into them live and provides appropriate message.
  validateLive() {
    this.allInputItems.forEach((input) => {
      input.addEventListener("input", (e) => {
        this.checkValue(e.target);
        this.checkEmail(e.target);
        this.checkPassWordConfirm(e.target);
      });
    });
  }

  //checks to see if all our form input fields are valid when we click the submit button and provides appropriate message.
  validateOnSubmit() {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.allInputItems.forEach((input) => {
        //at the very beginning, just remove the verified class if the input item has it(that means it was verified from the last submit aka the field is correct).But if we submitted, and changed the form field, we want to start from the top and see if it is still verified.
        input.classList.remove("verified");
        const value = this.checkValue(input);
        const email = this.checkEmail(input);
        const password = this.checkPassWordConfirm(input);
        // some form elements won'thave to do checkEmail and checkPasswordConfirm so their values will be undefined or null. Every form input has to go through a value check, so value will always be true. But we are saying, for each form element, if value is true and email check is not false(meaning it is undefined(it didnt go through an email check because it wasnt an email) or it did and its true and if password is not false, meaning it is undefined or true, add a class of verified to our input meaning the form field is valid.
        if (value !== false && email !== false && password !== false) {
          input.classList.add("verified");
        }
      });
    });
  }

  // returns true if we are actually ready to submit our form because every input field has a verified class. Otherwise, returns false;
  submitForm() {
    return this.allInputItems.every((item) =>
      item.classList.contains("verified")
    );
  }

  //get the parent element of our input field/
  getParentEl(input) {
    const parentEl = input.parentElement;
    return parentEl;
  }

  //get the span error message of our input field;
  getErrorEl(input) {
    const parentEl = input.parentElement;
    const errorMessageEl = parentEl.querySelector("span");
    return errorMessageEl;
  }

  //check to see if there is an actual value provided in our text field
  checkValue(input) {
    if (input.value.trim() === "") {
      this.runError(input, "Please enter a valid string.");
      return false;
    } else {
      this.runSuccess(input);
      return true;
    }
  }

  //check to see if a valid email is provided in our text feild
  checkEmail(input) {
    if (input.id === "email") {
      //check to see if there is an actual value inside first, before running our email check
      if (!this.checkValue(input)) {
        this.runError(input, "Please enter a valid string.");
      } else {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(input.value.trim()).toLowerCase())) {
          this.runSuccess(input);
          return true;
        } else {
          this.runError(input, "Please enter a valid email.");
        }
      }
    }
  }

  //check to see if the password is the same as the one before it
  checkPassWordConfirm(input) {
    if (input.id === "password-confirm") {
      //check to see if there is an actual value inside first, before running our password confirm check
      if (!this.checkValue(input)) {
        this.runError(input, "Please enter a valid string.");
      } else {
        const passwordEl = this.allInputItems.find(
          (input) => input.id === "password"
        );
        if (input.value !== passwordEl.value) {
          this.runError(input, "Passwords must be equal.");
        } else {
          this.runSuccess(input);
          return true;
        }
      }
    }
  }

  //runs our success fuction, which means the text field was valid, so we can remove the error messages and the error icon
  runSuccess(input) {
    const errorMessage = this.getErrorEl(input);
    errorMessage.setAttribute("style", "display:none");
    this.getParentEl(input)
      .querySelector("img")
      .setAttribute("style", "display:none");
  }

  //runs our error fuction, which means the text field was not valid, so we provide an error message and an error icon
  runError(input, message) {
    const errorMessage = this.getErrorEl(input);
    errorMessage.setAttribute("style", "display:block");
    errorMessage.textContent = message;
    this.getParentEl(input)
      .querySelector("img")
      .setAttribute("style", "display:inline");
  }
}

const firstForm = new FormValidator(form, allInputs);
//initialize the form so the submit event and input event are ready from the start. Event handlers fire in the order in which they were bound.
firstForm.initialize();

//now, add another submit event on our form, which checks to see if submitForm is true or false. If it's true, we can run our submit code. Otherwise, we can't.
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (firstForm.submitForm()) {
    // run code if form is valid to submit
  }
});
