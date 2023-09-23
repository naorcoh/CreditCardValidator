const cardHoldersInput = document.querySelector("#card-holders")
const cardHoldersErrorMsg = document.querySelector("#chn-error-message")

const form = document.querySelector("#form")
const payBtn = document.querySelector("#payBtn")

let ourRegex = /[a-z]/i

const validateCHN = (evt) => {
  //Returns true if the value is less than the minimum specified by the min attribute
  // if (evt.target.validity.tooShort) {
  //   //If true, the element matches the :invalid and :out-of-range CSS pseudo-classes.
  //   cardHoldersErrorMsg.classList.remove("hidden")
  //   cardHoldersErrorMsg.textContent = evt.target.validationMessage
  //   //fire invalid event and pop the message
  //   evt.target.reportValidity()
  //   //fire invalid event not! pop message
  //   evt.target.checkValidity()
  // } else {
  //   cardHoldersErrorMsg.classList.add("hidden")
  // }

  evt.target.checkValidity()
  //what the method do?
  //1) method returns a Boolean indicating whether the element's value passes its constraints.
  //2) If the element is invalid, this method also fires an invalid event on the element.

  //how it check Validity
  //(This is typically done by the user-agent when determining which of the CSS pseudo-classes,
  //...........................:valid or :invalid, applies.)

  //summary
  //Calling checkValidity() is called statically validating the constraints

  evt.target.reportValidity()
  //what the method do?
  //1)the reportValidity() method reports any constraint failures to the user.
  //...............................................(pop as validating message!)
  //3)method returns a Boolean indicating whether the element's value passes its constraints.
  //2)If the element is invalid, this method also fires an invalid event on the element.

  //summary
  //while calling reportValidity() or submitting the form is called interactively validating the constraints.
}

cardHoldersInput.addEventListener("invalid", () => {
  console.log("invalid event fire")
})

cardHoldersInput.addEventListener("input", validateCHN)
