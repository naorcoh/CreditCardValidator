const cardHoldersInput = document.querySelector("#card-holders")
const cardHoldersErrorMsg = document.querySelector("#chn-error-message")

const form = document.querySelector("#form")
const payBtn = document.querySelector("#payBtn")

const cardHoldersHandler = (evt) => {
  tooShortMsg(evt.target, cardHoldersErrorMsg)
  tooLongMsg(
    evt.target,
    cardHoldersErrorMsg,
    "you reach maximum length of characters(30 characters)"
  )
  console.log(evt.target.validity)
}

const tooShortMsg = (input, msgElement) => {
  // Returns true if the value is less than the minimum specified by the min attribute
  if (input.validity.tooShort) {
    //If true, the element matches the :invalid and :out-of-range CSS pseudo-classes.
    msgElement.classList.remove("hidden")
    msgElement.textContent = input.validationMessage
  }

  if (input.checkValidity()) {
    msgElement.classList.add("hidden")
  }
}

const tooLongMsg = (input, msgElement, msgText) => {
  //check if input reach equal to max length of characters (30)
  if (input.value.length >= input.maxLength) {
    //update the state
    input.setCustomValidity(msgText) //if true constraint invalid

    //add the invalid error msg to span element
    msgElement.textContent = msgText // which constraint user don't fulfil

    //remove hidden class from input element
    msgElement.classList.remove("hidden") //now we can see the error span
  } else {
    // input is fine -- reset the error message
    input.setCustomValidity("")
  }

  //check if all constraint are valid
  if (input.checkValidity()) {
    msgElement.classList.add("hidden") //if true hidden error msg
  }
}
cardHoldersInput.addEventListener("input", cardHoldersHandler)
cardHoldersInput.addEventListener("invalid", () => {
  console.log("invalid event fire!!")
})
