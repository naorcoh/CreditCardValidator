//main mission
//1)all input show to end user validations message
//2)disable form send button until all input validations fulfill
//3)when all input validations enable form send button

//show to end user validations message
//name input
//1)create event listener to input event
//2)create constraint to each input using constraint validation api and input validation attribute
//3)show message if constraint not fulfil == false by using css invalid propr and display:none
//4)remove the message if the constraint fulfil == true
//ccn input
//when user enter later char a pop invalid msg
//format the text

//improvement
//check about document fragment

//ref constraint validation api
//https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#the-constraint-validation-api
//https://www.youtube.com/watch?v=D9JHizCAx8U
//https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation
//https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
//ref regex
//https://stackoverflow.com/questions/36833366/format-credit-card-number
//https://www.peterbe.com/plog/cc-formatter
//https://github.com/nosir/cleave.js
//https://www.regular-expressions.info/creditcard.html
//https://www.regular-expressions.info/lookaround.html
//https://stackoverflow.com/questions/16398471/regex-for-string-not-ending-with-given-suffix
//https://stackoverflow.com/questions/3926451/how-to-match-but-not-capture-part-of-a-regex
//date input
//https://codepen.io/mikeumus/pen/OBoVoX?editors=1010
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
/*TO DO
//when focus loss check valid after value update
**/

/*bug:**/

cardHoldersInput.addEventListener("invalid", () => {
  console.log("invalid event fire")
})

cardHoldersInput.addEventListener("input", validateCHN)
