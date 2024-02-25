//inputs selector
const chnInput = document.querySelector("#card-holders")
const ccnInput = document.querySelector("#ccn")
const cvcInput = document.querySelector("#cvc")
const mmInput = document.querySelector("#mm-input")
const yyInput = document.querySelector("#yy-input")
const expirySlash = document.querySelector("#slash-1")

//msg(span) selector
const cardHoldersErrorMsg = document.querySelector("#chn-error-message")
const ccnInvalidMsg = document.querySelector("#ccn-invalid-message")
const cvcInvalidMsg = document.querySelector("#cvc-invalid-message")
const mmInvalidMsg = document.querySelector("#mm-invalid-message")

//icon
const ccIcon = document.querySelector("#cc-icon")

//form selector
const form = document.querySelector("#form")
const payBtn = document.querySelector("#pay-btn")
const brElementIdSet = new Set([
  "br-1",
  "br-2",
  "br-3",
  "br-4",
  "br-5",
  "br-6",
  "br-7",
  "br-8",
  "br-9",
  "br-10",
  "br-11",
  "br-12",
  "br-showYearPastError-13",
  "br-onlyNumberErrorMonth-14",
  "br-onlyNumberErrorYear-15",
  "br-numberIsMonth-16",
  "br-dateIsExpire-17",
])

payBtn.disabled = true
payBtn.classList.add("btn--cc-disabled")
let helper = 0

const chnHandler = (evt) => {
  tooShortMsg(
    evt.target,
    cardHoldersErrorMsg,
    "Please lengthen this text to 2 characters or more (you are currently using 1 character)."
  )
  tooLongMsg(
    evt.target,
    cardHoldersErrorMsg,
    "you reach maximum length of characters(30 characters)"
  )
  alphabetsAndSpaces(
    evt.target,
    cardHoldersErrorMsg,
    "only english alphabets characters and spaces allow!"
  )
}

const ccnHandler = (evt) => {
  // evt.target.value = ccFormat(evt.target, ccnInvalidMsg, ccIcon, [
  //   "only numbers allowed",
  //   "Please lengthen this text to 16 characters or more.",
  // ])
  let arr = ccFormatV(evt.target)

  evt.target.value = arr[0]

  onlyNumber(evt.target, arr[1], ccnInvalidMsg, ccIcon, "only numbers allowed")
  tooShortCCN(
    evt.target,
    arr[1],
    ccnInvalidMsg,
    ccIcon,
    "the min length of payment card is 8 digit"
  )
  changeIconByCCissuer(evt.target, ccIcon)
  ccnIsValid(
    evt.target,
    ccnInvalidMsg,
    ccIcon,
    "invalid card number please check you don't has typo!"
  )

  blankIsValid(evt.target, arr[1], ccnInvalidMsg, ccIcon)
}
const focusSibling = function (target) {
  const nextTarget = document.querySelector("#yy-input")
  nextTarget && nextTarget.focus()

  // // if callback is supplied we return the sibling target which has focus
  // callback && callback(nextTarget)
}

const mmHandler = (evt) => {
  const id = [
    [...brElementIdSet][13],
    [...brElementIdSet][15],
    [...brElementIdSet][16],
  ]
  const previousInputValue = evt.target.value
  formatNonDigit(evt.target, 0, 2)
  formatNonMounth(evt.target)
  validateDigitMonthInput(
    evt.target,
    previousInputValue,
    mmInvalidMsg,
    "only digit allow",
    id[0],
    inputValidationResults
  )
  validateNumberIsMonth(
    evt.target,
    previousInputValue,
    mmInvalidMsg,
    "the month range is allowed from 1-12 or 01-12",
    id[1],
    "numberIsMonth",
    inputValidationResults,
    numberIsMounthValidationsResults,
    monthInputValidationsResults,
    brArray
  )
  validateCardExpiration(
    mmInput,
    yyInput,
    mmInvalidMsg,
    "The expiration date you entered is invalid. Please make sure the date you eneter is not expire",
    id[2],
    "isMonthExpire",
    "isYearExpire",
    inputValidationResults,
    isCardDateExpire,
    monthInputValidationsResults,
    yearInputValidationsResults,
    brArray
  )

  // mmInRangeValidations(
  //   evt.target,

  //   formatMMarr[1],
  //   mmInvalidMsg,
  //   "the month range is allowed from 1-12 or 01-12"
  // )

  // isCardExpValid(evt.target, yyInput, mmInvalidMsg, "expiry date is not valid")

  // 2 <= evt.target.value.length && focusSibling(evt.target)
  // evt.stopImmediatePropagation()
  // return evt.target.value
}

// const focusLoseMM = mmInput.addEventListener("change", (evt) => {
//   if (evt.target.value == 1) evt.target.value = "01"
// })

const yearHandler = (evt) => {
  const id = [
    [...brElementIdSet][12],
    [...brElementIdSet][13],
    [...brElementIdSet][16],
  ]

  const previousInputValue = evt.target.value

  // inRangeValidations(evt.target, mmInvalidMsg, "test msg")

  formatNonDigit(evt.target, 0, 4)

  validateDigitYearInput(
    evt.target,
    previousInputValue,
    mmInvalidMsg,
    "only digit allow",
    id[1],
    inputValidationResults
  )

  validatePastYear(
    evt.target,
    mmInvalidMsg,
    "the year are enter past please enter valid year",
    id[0],
    inputValidationResults
  )
  validateCardExpiration(
    mmInput,
    yyInput,
    mmInvalidMsg,
    "The expiration date you entered is invalid. Please make sure the date you eneter is not expire",
    id[2],
    "isMonthExpire",
    "isYearExpire",
    inputValidationResults,
    isCardDateExpire,
    monthInputValidationsResults,
    yearInputValidationsResults,
    brArray
  )
  // isCardExpValid(mmInput, evt.target, mmInvalidMsg, "expiry date is not valid")
  // isMonthInEmpty(mmInput, evt.target, mmInvalidMsg, "please fill month input")
}

const monthBlurEvtHandler = (evt) => {
  // isMonthInEmpty(evt.target, mmInvalidMsg, "please fill month input")
}

const cvcHandler = (evt) => {
  tooShortMsg(
    evt.target,
    cvcInvalidMsg,
    "the minium length for cvc code is 3 digit"
  )
}

const formHandler = (evt) => {
  evt.preventDefault()
  isSubmittable(form, payBtn, chnInput, ccnInput, cvcInput)
}

const isSubmittable = (formElm, btn, chnInput, cnnInput, cvcInput) => {
  if (
    formElm.checkValidity() &&
    chnInput.value.length > 0 &&
    cnnInput.value.length > 0 &&
    cvcInput.value.length > 0 &&
    validationPass.get("ccnIsValid") &&
    validationPass.get("onlyNumber") &&
    validationPass.get("tooShortCCN")
  ) {
    payBtn.disabled = false
    btn.classList.remove("btn--cc-disabled")
  } else {
    payBtn.disabled = true
    btn.classList.add("btn--cc-disabled")
  }
}

//input listener
chnInput.addEventListener("input", chnHandler)
ccnInput.addEventListener("input", ccnHandler)
cvcInput.addEventListener("input", cvcHandler)
mmInput.addEventListener("input", mmHandler)
// mmInput.addEventListener("blur", monthBlurEvtHandler)

yyInput.addEventListener("input", yearHandler)
form.addEventListener("input", formHandler)

//card holders constraint validation functions
//validation pass map
const validationPass = new Map([
  ["onlyNumber", false],
  ["tooShortCCN", false],
  ["ccnIsValid", false],
])
const tooShortMsg = (input, msgElement, msgText) => {
  const msgTxtNode = document.createTextNode(msgText)
  const msgBrOne = document.createElement("br")
  const id = [...brElementIdSet][0]
  //set id to br element!
  msgBrOne.setAttribute("id", id)

  // Returns true if the value is less than the minimum specified by the min attribute
  if (input.validity.tooShort) {
    //show the msgElement by remove hidden class
    msgElement.classList.remove("hidden")

    //if msg exist in msgElement don't append it agin!;
    if (!msgElement.textContent.includes(msgText)) {
      //append text nod and br element
      msgElement.append(msgTxtNode)
      msgElement.append(msgBrOne)
    }
  } //if tooShort validations false remove msg and br element
  else if (!input.validity.tooShort) {
    removeTextNodeByMsgContent(msgElement, msgText)
    removeBrById(msgElement, id)
  }

  //hide msgElement only if all constrain validations fulfill!
  if (input.checkValidity()) {
    //add hidden class to hide msg element

    msgElement.classList.add("hidden")
    //for the input we don't need spacial class because
    //we have :invalid and :valid pseudo class fire when input.checkValidity() true/false
  }
}

const tooLongMsg = (input, msgElement, msgText) => {
  const msgTxtNode = document.createTextNode(msgText)
  const msgBrOne = document.createElement("br")
  const id = [...brElementIdSet][1]
  msgBrOne.setAttribute("id", id)

  //check if input reach equal to max length of characters (30)
  //if true constraint invalid
  if (input.value.length >= input.maxLength) {
    //update the state
    input.setCustomValidity(msgText) //add custom validation msg that update the state of element.validity.customError
    //...............................fire/trigger invalid event which trigger the :invalid pseudo-classes!

    //add the invalid error msg to span element
    // msgElement.textContent = msgText // which constraint user don't fulfil

    if (!msgElement.textContent.includes(msgText)) {
      msgElement.append(msgTxtNode)
      msgElement.append(msgBrOne)
    }
    //remove hidden class from input element
    msgElement.classList.remove("hidden") //now we can see the error span
  } else {
    // input is fine -- reset the error message
    removeTextNodeByMsgContent(msgElement, msgText)
    removeBrById(msgElement, id)
    input.setCustomValidity("")
  }

  //check if all constraint are valid
  if (input.checkValidity()) {
    msgElement.classList.add("hidden") //if true hidden error msg
  }
}
const alphabetsAndSpaces = (input, msgElement, msgText) => {
  const regexPattern = /^[a-zA-Z ]*$/
  const msgTxtNode = document.createTextNode(msgText)
  const msgBrTwo = document.createElement("br")
  const id = [...brElementIdSet][2]
  msgBrTwo.setAttribute("id", id)

  if (!regexPattern.test(input.value)) {
    //remove hidden class from input element
    msgElement.classList.remove("hidden")

    input.setCustomValidity(msgText)

    if (!msgElement.textContent.includes(msgText)) {
      msgElement.append(msgTxtNode)
      msgElement.append(msgBrTwo)
    }
  } else if (!input.validity.customError) {
    input.setCustomValidity("")
    removeTextNodeByMsgContent(msgElement, msgText)
    removeBrById(msgElement, id)
  }

  if (input.checkValidity()) {
    msgElement.classList.add("hidden")
  }
}
//card number constraint validation functions
const onlyNumber = (input, pInputValue, msgElement, ccIcon, msgText) => {
  const regexPattern = /^\d*$/g
  const msgTxtNode = document.createTextNode(msgText)
  const msgBrTwo = document.createElement("br")
  const id = [...brElementIdSet][3]
  msgBrTwo.setAttribute("id", id)

  if (!regexPattern.test(pInputValue) && pInputValue.length <= 16) {
    input.setCustomValidity(msgText)
    validationPass.set("onlyNumber", false)
    //remove hidden class from input element
    msgElement.classList.remove("hidden")
    ccIcon.classList.add("form__icon--error")
    input.classList.add("form__input--number-error")

    if (!msgElement.textContent.includes(msgText)) {
      msgElement.append(msgTxtNode)
      msgElement.append(msgBrTwo)
    }
  } else {
    validationPass.set("onlyNumber", true)
    input.setCustomValidity("")
    removeTextNodeByMsgContent(msgElement, msgText)
    removeBrById(msgElement, id)
  }

  if (
    validationPass.get("ccnIsValid") &&
    validationPass.get("onlyNumber") &&
    validationPass.get("tooShortCCN")
  ) {
    ccIcon.classList.remove("form__icon--error")
    input.classList.remove("form__input--number-error")
    msgElement.classList.add("hidden")
  }
}

const tooShortCCN = (input, pInputValue, msgElement, ccIcon, msgText) => {
  const msgTxtNode = document.createTextNode(msgText)
  const msgBrTwo = document.createElement("br")
  const id = [...brElementIdSet][4]
  msgBrTwo.setAttribute("id", id)

  if (pInputValue.length < input.minLength) {
    input.setCustomValidity(msgText)
    validationPass.set("tooShortCCN", false)

    //remove hidden class from input element
    msgElement.classList.remove("hidden")
    ccIcon.classList.add("form__icon--error")
    input.classList.add("form__input--number-error")

    if (!msgElement.textContent.includes(msgText)) {
      msgElement.append(msgTxtNode)
      msgElement.append(msgBrTwo)
    }
  } else {
    pInputValue = ""
    validationPass.set("tooShortCCN", true)
    input.setCustomValidity("")
    removeTextNodeByMsgContent(msgElement, msgText)
    removeBrById(msgElement, id)
  }

  if (
    validationPass.get("ccnIsValid") &&
    validationPass.get("onlyNumber") &&
    validationPass.get("tooShortCCN")
  ) {
    ccIcon.classList.remove("form__icon--error")
    input.classList.remove("form__input--number-error")
    msgElement.classList.add("hidden")
  }
}

const blankIsValid = (input, pInputValue, msgElement, ccIcon) => {
  if (input.value.length <= 0 && pInputValue.length <= 0) {
    ccIcon.classList.remove("form__icon--error")
    input.classList.remove("form__input--number-error")
    msgElement.classList.add("hidden")
  }
}

const ccnIsValid = (input, msgElement, ccIcon, msgText) => {
  const msgTxtNode = document.createTextNode(msgText)
  const msgBrTwo = document.createElement("br")
  const id = [...brElementIdSet][5]
  msgBrTwo.setAttribute("id", id)
  const removeSpace = input.value.replaceAll(/\s*/g, "")

  if (
    removeSpace.length >= 8 &&
    removeSpace.length <= 16 &&
    !luhnCheck(removeSpace)
  ) {
    input.setCustomValidity(msgText)
    validationPass.set("ccnIsValid", false)

    //remove hidden class from input element
    msgElement.classList.remove("hidden")
    ccIcon.classList.add("form__icon--error")
    input.classList.add("form__input--number-error")

    if (!msgElement.textContent.includes(msgText)) {
      msgElement.append(msgTxtNode)
      msgElement.append(msgBrTwo)
    }
  } else {
    validationPass.set("ccnIsValid", true)
    input.setCustomValidity("")
    removeTextNodeByMsgContent(msgElement, msgText)
    removeBrById(msgElement, id)
  }

  if (
    validationPass.get("ccnIsValid") &&
    validationPass.get("onlyNumber") &&
    validationPass.get("tooShortCCN")
  ) {
    ccIcon.classList.remove("form__icon--error")
    input.classList.remove("form__input--number-error")
    msgElement.classList.add("hidden")
  }
}
var luhnCheck = (function () {
  var luhnArr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
  return function (str) {
    var counter = 0
    var incNum
    var odd = false
    var temp = String(str).replace(/[^\d]/g, "")
    if (temp.length == 0) return false
    for (var i = temp.length - 1; i >= 0; --i) {
      incNum = parseInt(temp.charAt(i), 10)
      counter += (odd = !odd) ? incNum : luhnArr[incNum]
    }
    return counter % 10 == 0
  }
})()

const changeIconByCCissuer = (input, ccIcon) => {
  const visaRegexPattern = /^4[0-9]{12}(?:[0-9]{3})?$/g
  const mcRegexPattern =
    /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/g
  const amcRegexPattern = /^3[47][0-9]{13}$/g
  const dinnerClub = /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/g
  const discover = /^6(?:011|5[0-9]{2})[0-9]{12}$/g
  const jcb = /^(?:2131|1800|35\d{3})\d{11}$ /g
  const removeSpace = input.value.replaceAll(/\s/g, "")
  const iconsName = [
    "visa_icon.png",
    "mc_icon.png",
    "amex_icon.png",
    "dinners_icon.png",
    "discover_icon.png",
    "jcb_icon.png",
    "cc_icon.png",
  ]

  if (visaRegexPattern.test(removeSpace)) {
    ccIcon.children[0].setAttribute("src", `/images/cc-icons/${iconsName[0]}`)
    console.log(ccIcon.children[0])
  } else if (mcRegexPattern.test(removeSpace)) {
    ccIcon.children[0].setAttribute("src", `/images/cc-icons/${iconsName[1]}`)
    console.log(ccIcon.children[0])
  } else if (amcRegexPattern.test(removeSpace)) {
    ccIcon.children[0].setAttribute("src", `/images/cc-icons/${iconsName[2]}`)
  } else if (dinnerClub.test(removeSpace)) {
    ccIcon.children[0].setAttribute("src", `/images/cc-icons/${iconsName[3]}`)
  } else if (discover.test(removeSpace)) {
    ccIcon.children[0].setAttribute("src", `/images/cc-icons/${iconsName[4]}`)
  } else if (jcb.test(removeSpace)) {
    ccIcon.children[0].setAttribute("src", `/images/cc-icons/${iconsName[5]}`)
  } else {
    ccIcon.children[0].setAttribute("src", `/images/cc-icons/${iconsName[6]}`)
  }
}

//truth table
const mmTrueTable = new Map([
  ["mmValidations", false],
  ["mmInRangeValidations", false],
])
const expiryTruthTable = new Map([
  ["mmInRangeValidations", false],
  ["yearRangeIsValid", false],
  ["mmValidations", false],
  ["isCardExpValid", false],
  ["monthIsEmpty", false],
  // ["yearIsEmpty", false],
])

const inputValidationResults = new Map([
  ["isMonthInputContainOnlyDigit", -1],
  ["isYearInputContainOnlyDigit", -1],
  ["isCurrentOrFutureYear", -1],
  ["numberIsMonth", -1],
  ["isMonthExpire", -1],
  ["isYearExpire", -1],
])

let digitValidationsResults = new Map([
  ["isMonthInputContainOnlyDigit", -1],
  ["isYearInputContainOnlyDigit", -1],
])
const isCardDateExpire = new Map([
  ["isMonthExpire", -1],
  ["isYearExpire", -1],
])
const numberIsMounthValidationsResults = new Map([["numberIsMonth", -1]])

let isFutureYearValidationsResults = new Map([["isCurrentOrFutureYear", -1]])

let monthInputValidationsResults = new Map([
  ["isMonthInputContainOnlyDigit", -1],
  ["numberIsMonth", -1],
  ["isMonthExpire", -1],
])

let yearInputValidationsResults = new Map([
  ["isCurrentOrFutureYear", -1],
  ["isYearInputContainOnlyDigit", -1],
  ["isYearExpire", -1],
])

let brArray = []

let BRelementUsedResults = new Map()

//input formatting functions
const formatNonDigit = (input, stringStart, stringEnd) => {
  const formattedValue = input.value
    .replaceAll(/\D/g, "")
    .substring(stringStart, stringEnd)
  // update the input value to the formatted value
  input.value = formattedValue
}
const formatNonMounth = (input) => {
  if (input.value > 12 || input.value == "00") {
    input.value = ""
  } else {
    input.value = input.value
  }
}
const ccFormat = (input, msgElement, ccIcon, msgText) => {
  const v = input.value.replace(/\s+/g, "").replace(/[^0-9]+/g, "")
  //check for validity from formatter
  onlyNumber(input, msgElement, ccIcon, msgText[0])
  // need to fix
  // input.value = input.value.replace(/\s+/g, "")
  // tooShortMsg(input, msgElement, msgText[1])
  // checkFormatValue(input, msgElement, ccIcon, msgText[1])
  changeIconByCCissuer(input, ccIcon)

  const matches = v.match(/\d{4,16}/g)
  const match = (matches && matches[0]) || ""

  const parts = []

  for (i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4))
  }
  if (parts.length) {
    return parts.join(" ")
  } else {
    return input.value.replaceAll(/[^0-9]+/g, "")
  }
}
const mmFormat = (input) => {
  const results = []
  const previousUserInput = input.value
  let formatUserInput = input.value
    .replaceAll(/[^0-9]+/g, "")
    .replaceAll(/\s+/g, "")
    .substring(0, 2)

  if (!(formatUserInput <= 12) || formatUserInput === "00") {
    formatUserInput = formatUserInput.replaceAll(formatUserInput, "")
  }

  // after focus!!!
  if (
    formatUserInput.length == 1 &&
    formatUserInput >= 2 &&
    formatUserInput <= 9
  ) {
    formatUserInput = `0${formatUserInput}`
  }

  results.push(formatUserInput)
  results.push(previousUserInput)

  return results
}
const ccFormatV = (input) => {
  const results = []
  const userInput = input.value
  const cleanValue = input.value
    .replaceAll(/[^0-9]+/g, "")
    .replaceAll(/\s+/g, "")

  let matches = cleanValue.match(/\d{4,16}/g)
  let match = (matches && matches[0]) || ""
  let parts = []

  for (i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4))
  }

  if (parts.length) {
    parts = parts.join(" ")
    results.push(parts)
  } else {
    results.push(cleanValue)
  }

  results.push(userInput.replaceAll(/\s+/g, ""))

  return results
}
const replaceAllChar = (inputEl) => {
  return inputEl.value.replaceAll(/[^0-9]+/g, "")
}

//input validations
const validateDigitMonthInput = (
  input,
  previousUserValue,
  errorElement,
  errorText,
  id,
  validationsTestMap
) => {
  if (isContainNonDigit(previousUserValue)) {
    inputValidationResults.set("isMonthInputContainOnlyDigit", false)
    digitValidationsResults.set("isMonthInputContainOnlyDigit", false)
    monthInputValidationsResults.set("isMonthInputContainOnlyDigit", false)

    input.setCustomValidity("validate numeric in input")
    appendErrorTextNodToElement(errorElement, errorText)
    appendBRToErrorElement(errorElement, id, brArray)
    setBorderRadius(
      mmInput,
      yyInput,
      validationsTestMap,
      "form__input--mm-invalid-right",
      "form__input--yy-invalid-left"
    )
    setSlashInvalid(expirySlash, validationsTestMap, "form__slash--invalid")
    showError(errorElement)
  } else {
    inputValidationResults.set("isMonthInputContainOnlyDigit", true)
    digitValidationsResults.set("isMonthInputContainOnlyDigit", true)
    monthInputValidationsResults.set("isMonthInputContainOnlyDigit", true)

    removeMarkField(input, monthInputValidationsResults)
    removeErrorText(errorElement, errorText, digitValidationsResults)
    removeBrById(errorElement, id, brArray, digitValidationsResults)
    setBorderRadius(
      mmInput,
      yyInput,
      validationsTestMap,
      "form__input--mm-invalid-right",
      "form__input--yy-invalid-left"
    )
    setSlashInvalid(expirySlash, validationsTestMap, "form__slash--invalid")
    hideError(input, errorElement, validationsTestMap)
  }
}

const validateDigitYearInput = (
  input,
  previousUserValue,
  errorElement,
  errorText,
  id,
  validationsTestMap
) => {
  if (isContainNonDigit(previousUserValue)) {
    inputValidationResults.set("isYearInputContainOnlyDigit", false)
    digitValidationsResults.set("isYearInputContainOnlyDigit", false)
    yearInputValidationsResults.set("isYearInputContainOnlyDigit", false)

    input.setCustomValidity("validate numeric in input")

    appendErrorTextNodToElement(errorElement, errorText)
    appendBRToErrorElement(errorElement, id, brArray)
    setBorderRadius(
      mmInput,
      yyInput,
      validationsTestMap,
      "form__input--mm-invalid-right",
      "form__input--yy-invalid-left"
    )
    setSlashInvalid(expirySlash, validationsTestMap, "form__slash--invalid")

    showError(errorElement)
  } else {
    inputValidationResults.set("isYearInputContainOnlyDigit", true)
    digitValidationsResults.set("isYearInputContainOnlyDigit", true)
    yearInputValidationsResults.set("isYearInputContainOnlyDigit", true)

    removeMarkField(input, yearInputValidationsResults)
    removeErrorText(errorElement, errorText, digitValidationsResults)
    removeBrById(errorElement, id, brArray, digitValidationsResults)
    setBorderRadius(
      mmInput,
      yyInput,
      validationsTestMap,
      "form__input--mm-invalid-right",
      "form__input--yy-invalid-left"
    )
    setSlashInvalid(expirySlash, validationsTestMap, "form__slash--invalid")
    hideError(input, errorElement, validationsTestMap)
  }
}
const validatePastYear = (
  input,
  errorElement,
  errorText,
  id,
  validationsTestMap
) => {
  if (isYearPast(input)) {
    inputValidationResults.set("isCurrentOrFutureYear", false)
    yearInputValidationsResults.set("isCurrentOrFutureYear", false)
    isFutureYearValidationsResults.set("isCurrentOrFutureYear", false)

    input.setCustomValidity("past year validations")

    appendErrorTextNodToElement(errorElement, errorText)
    appendBRToErrorElement(errorElement, id, brArray)
    setBorderRadius(
      mmInput,
      yyInput,
      validationsTestMap,
      "form__input--mm-invalid-right",
      "form__input--yy-invalid-left"
    )
    setSlashInvalid(expirySlash, validationsTestMap, "form__slash--invalid")
    showError(errorElement)
  } else {
    inputValidationResults.set("isCurrentOrFutureYear", true)
    yearInputValidationsResults.set("isCurrentOrFutureYear", true)
    isFutureYearValidationsResults.set("isCurrentOrFutureYear", true)

    removeMarkField(input, yearInputValidationsResults)
    removeErrorText(errorElement, errorText, isFutureYearValidationsResults)
    removeBrById(errorElement, id, brArray, isFutureYearValidationsResults)
    setBorderRadius(
      mmInput,
      yyInput,
      validationsTestMap,
      "form__input--mm-invalid-right",
      "form__input--yy-invalid-left"
    )
    setSlashInvalid(expirySlash, validationsTestMap, "form__slash--invalid")
    hideError(input, errorElement, validationsTestMap)
  }
}

const validateNumberIsMonth = (
  input,
  previousUserValue,
  errorElement,
  errorText,
  id,
  validtionName,
  validationsResults,
  validationResult,
  inputValidationsResults,
  BRstateArray
) => {
  if (isNotMonth(previousUserValue)) {
    validationsResults.set(validtionName, false)
    validationResult.set(validtionName, false)
    inputValidationsResults.set(validtionName, false)

    input.setCustomValidity("the number is enter is not month")
    appendErrorTextNodToElement(errorElement, errorText)
    appendBRToErrorElement(errorElement, id, BRstateArray)
    setBorderRadius(
      mmInput,
      yyInput,
      validationsResults,
      "form__input--mm-invalid-right",
      "form__input--yy-invalid-left"
    )
    setSlashInvalid(expirySlash, validationsResults, "form__slash--invalid")
    showError(errorElement)
  } else {
    validationsResults.set(validtionName, true)
    validationResult.set(validtionName, true)
    inputValidationsResults.set(validtionName, true)

    removeMarkField(input, inputValidationsResults)
    removeErrorText(errorElement, errorText, validationResult)
    removeBrById(errorElement, id, BRstateArray, validationResult)
    setBorderRadius(
      mmInput,
      yyInput,
      validationsResults,
      "form__input--mm-invalid-right",
      "form__input--yy-invalid-left"
    )
    setSlashInvalid(expirySlash, validationsResults, "form__slash--invalid")
    hideError(input, errorElement, validationsResults)
  }
}

const validateFutureYear = (input, msgElement, msgText) => {
  const id = [...brElementIdSet][9]
  const currentYear = new Date().getFullYear()
  if (isFutureYear(input)) {
    expiryTruthTable.set("yearRangeIsValid", true)
    input.setCustomValidity("")
    removeTextNodeByMsgContent(msgElement, msgText)
    removeBrById(msgElement, id)
    hideRedBG(msgElement, expiryTruthTable)
  } else if (input.value.length == 4 && currentYear > input.value) {
    expiryTruthTable.set("yearRangeIsValid", false)
    input.setCustomValidity("year in range?")
    // msgElement.classList.remove("hidden")
    showRedBG(msgElement, expiryTruthTable)
    noRepeat(msgElement, msgText, 9)
  }
}

const validateCardExpiration = (
  monthInput,
  yearInput,
  errorElement,
  errorText,
  id,
  monthInputKey,
  yearInputKey,
  validationsResults,
  validationResult,
  monthInputValidationsResults,
  yearInputValidationsResults,
  BRstateArray
) => {
  if (isCurrentDateExpire(monthInput, yearInput)) {
    validationsResults.set(monthInputKey, false)
    validationsResults.set(yearInputKey, false)
    validationResult.set(monthInputKey, false)
    validationResult.set(yearInputKey, false)
    monthInputValidationsResults.set(monthInputKey, false)
    yearInputValidationsResults.set(yearInputKey, false)

    monthInput.setCustomValidity("invalid expiration month")
    yearInput.setCustomValidity("invalid expiration year")
    appendErrorTextNodToElement(errorElement, errorText)
    appendBRToErrorElement(errorElement, id, BRstateArray)
    setBorderRadius(
      mmInput,
      yyInput,
      validationsResults,
      "form__input--mm-invalid-right",
      "form__input--yy-invalid-left"
    )
    setSlashInvalid(expirySlash, validationsResults, "form__slash--invalid")
    showError(errorElement)
  } else {
    validationsResults.set(monthInputKey, true)
    validationsResults.set(yearInputKey, true)
    validationResult.set(monthInputKey, true)
    validationResult.set(yearInputKey, true)
    monthInputValidationsResults.set(monthInputKey, true)
    yearInputValidationsResults.set(yearInputKey, true)

    removeMarkField(monthInput, monthInputValidationsResults)
    removeMarkField(yearInput, yearInputValidationsResults)
    removeErrorText(errorElement, errorText, validationResult)
    removeBrById(errorElement, id, BRstateArray, validationResult)
    setBorderRadius(
      mmInput,
      yyInput,
      validationsResults,
      "form__input--mm-invalid-right",
      "form__input--yy-invalid-left"
    )
    setSlashInvalid(expirySlash, validationsResults, "form__slash--invalid")
    hideError(yearInput, errorElement, validationsResults)
  }
}

const mmInRangeValidations = (
  input,
  previousUserInput,
  msgElement,
  msgText
) => {
  const msgTxtNode = document.createTextNode(msgText)
  const msgBrTwo = document.createElement("br")
  const id = [...brElementIdSet][8]
  msgBrTwo.setAttribute("id", id)

  if (
    !(previousUserInput >= 1 && previousUserInput <= 12) &&
    !previousUserInput == "" &&
    !previousUserInput == "00"
  ) {
    //show the msgElement by remove hidden class
    // expiryTruthTable.set("mmInRangeValidations", false)
    // msgElement.classList.remove("hidden")

    input.setCustomValidity("msgText")

    showRedBG(msgElement, expiryTruthTable)

    //if msg exist in msgElement don't append it agin!;
    if (!msgElement.textContent.includes(msgText)) {
      //append text nod and br element
      msgElement.append(msgTxtNode)
      msgElement.append(msgBrTwo)
    }
  } else {
    expiryTruthTable.set("mmInRangeValidations", true)
    removeTextNodeByMsgContent(msgElement, msgText)
    removeBrById(msgElement, id)
    msgElement.classList.add("hidden")

    // hideRedBG(msgElement, expiryTruthTable)
  }
}

const isCardExpValid = (mInput, yInput, msgElement, msgText) => {
  const dateObj = new Date()
  const currentMonth = dateObj.getMonth() + 1
  const currentYear = dateObj.getFullYear()
  const id = [...brElementIdSet][10]

  if (
    mInput.value <= currentMonth &&
    yInput.value <= currentYear &&
    yInput.value.length == 4 &&
    mInput.value.length == 2
  ) {
    expiryTruthTable.set("isCardExpValid", false)
    noRepeat(msgElement, msgText, 10)
    showRedBG(msgElement, expiryTruthTable)
  } else {
    expiryTruthTable.set("isCardExpValid", true)
    hideRedBG(msgElement, expiryTruthTable)
    removeTextNodeByMsgContent(msgElement, msgText)
    removeBrById(msgElement, id)
  }
}

const isMonthInEmpty = (mInput, msgElement, msgText) => {
  const id = [...brElementIdSet][11]

  if (mInput.value == "") {
    noRepeat(msgElement, msgText, id)
    showRedBG(msgElement, expiryTruthTable)
  } else {
    expiryTruthTable.set("monthIsEmpty", true)
    hideRedBG(msgElement, expiryTruthTable)
    removeTextNodeByMsgContent(msgElement, msgText)
    removeBrById(msgElement, id)
  }
}

//logic test
const isCurrentDateExpire = (monthInput, yearInput) => {
  const dateObj = new Date()
  const currentMonth = dateObj.getMonth() + 1
  const currentYear = dateObj.getFullYear()

  return (
    monthInput.value <= currentMonth &&
    yearInput.value <= currentYear &&
    yearInput.value.length == 4 &&
    monthInput.value.length == 2
  )
}
function isNumber(value) {
  return !isNaN(value)
}

const isMonth = (value) => {
  const NUM_IS_MONTH_REGEX = /^(0?[1-9]|1[0-2])$/g
  return NUM_IS_MONTH_REGEX.test(value)
}

const isNotMonth = (value) => {
  return !isMonth(value)
}
const isFourDigitNumber = (input) => {
  return /^\d{4}$/.test(input.value)
}
const isContainNonDigit = (value) => {
  const NON_DIGIT_REGEX = /\D+/g
  return NON_DIGIT_REGEX.test(value)
}
const isNotBlank = (input) => {
  return !input.value == ""
}
const isYearPast = (input) => {
  const currentYear = new Date().getFullYear()
  return input.value < currentYear && input.value.length == 4
}
const isTextInclude = (element, txt) => {
  return element.textContent.includes(txt)
}
const isNotEmptyArr = (arr) => {
  if (arr.length > 0) return true
  return false
}
const isTextErrorNotUsed = (validationsTestResults) => {
  return (
    areEveryTrue(validationsTestResults) ||
    (areSomeTrue(validationsTestResults) &&
      areSomeUncheck(validationsTestResults) &&
      isNotContainFalse(validationsTestResults))
  )
}
const isArrEmpty = (arr) => {
  return arr.length < 1
}
const areEveryTrue = (map) => {
  return [...map.values()].every((x) => x == true)
}
const areEveryFalse = (map) => {
  return [...map.values()].every((x) => x == false)
}
const areSomeTrue = (map) => {
  return [...map.values()].some((x) => x == true)
}
const areSomeFalse = (map) => {
  return [...map.values()].some((x) => x == false)
}
const isNotContainFalse = (map) => {
  return !areSomeFalse(map)
}
const isNotContainTrue = (map) => {
  return !areSomeTrue(map)
}
const areSomeUncheck = (map) => {
  return [...map.values()].some((x) => x == -1)
}
const isHidable = (map) => {
  return (
    areEveryTrue(map) ||
    (areSomeTrue(map) && areSomeUncheck(map) && isNotContainFalse(map))
  )
}

//DOM element manipulations
const showError = (msgElement) => {
  msgElement.classList.remove("hidden")
}

//TODO: remove input parameter in hideError() functions and refrence functions
const hideError = (input, msgElement, validationsTestMap) => {
  if (isHidable(validationsTestMap)) {
    msgElement.classList.add("hidden")
  }
}
const createBRElement = (id) => {
  const br = document.createElement("br")
  br.setAttribute("id", id)
  return br
}
const appendBRToErrorElement = (errorMsgElement, id, brElementStateArray) => {
  const br = createBRElement(id)
  if (!brElementStateArray.includes(id)) {
    brElementStateArray.push(id)
    errorMsgElement.append(br)
  }
}
const appendErrorTextNodToElement = (element, errorText) => {
  const errorTextNod = document.createTextNode(errorText)

  //append text nod if the text not!! include
  if (!isTextInclude(element, errorText)) {
    element.append(errorTextNod)
  }
}
const removeElementByID = (element, id) => {
  for (const childElement of element.children) {
    if (childElement.id == id) {
      element.removeChild(childElement)
    }
  }
}
const noRepeat = (msgElement, msgText, idNum) => {
  const msgTxtNode = document.createTextNode(msgText)
  const msgBrTwo = document.createElement("br")
  const id = [...brElementIdSet][idNum]
  msgBrTwo.setAttribute("id", id)
  //if msg exist in msgElement don't append it agin!;
  if (!msgElement.textContent.includes(msgText)) {
    //append text nod and br element
    msgElement.append(msgTxtNode)
    msgElement.append(msgBrTwo)
  }
}
const showRedBG = (msgElement, map) => {
  if (areSomeTrue(map) || areEveryFalse(map)) {
    //show the msgElement by remove hidden class
    msgElement.classList.remove("hidden")
  }
}
const hideRedBG = (msgElement, map) => {
  if (areEveryTrue(map)) {
    //add hidden class to hide msg element

    msgElement.classList.add("hidden")
    //for the input we don't need spacial class because
    //we have :invalid and :valid pseudo class fire when input.checkValidity() true/false
  }
}
const removeBrById = (
  parentElement,
  id,
  brElementStateArray,
  validationsTestResults
) => {
  const brToRemove = parentElement.querySelector(`#${id}`)

  if (
    brElementStateArray.includes(id) &&
    isTextErrorNotUsed(validationsTestResults) &&
    !(brToRemove == null)
  ) {
    const index = brElementStateArray.indexOf(id)
    brElementStateArray.splice(index, 1)
    brToRemove.remove()
  }
}

const removeIDfromArr = (idArray, validationsTestResults) => {
  for (let index = 0; index < idArray.length; index++) {
    const element = idArray[index]
    if (element == id && isTextErrorNotUsed(validationsTestResults)) {
      idArray.splice(index, 1)
    }
  }
}
const removeTextNodeByMsgContent = (element, msgText) => {
  for (const node of element.childNodes) {
    if (node.nodeName == "#text" && node.nodeValue.includes(msgText)) {
      node.remove()
    }
  }
}

removeErrorText = (element, msgText, validationsTestResults) => {
  for (const node of element.childNodes) {
    if (
      node.nodeName == "#text" &&
      node.nodeValue.includes(msgText) &&
      isTextErrorNotUsed(validationsTestResults)
    ) {
      node.remove()
    }
  }
}
const removeMarkField = (input, inputValidationResults) => {
  if (isHidable(inputValidationResults)) {
    input.setCustomValidity("")
  }
}

let rmOutOfRange = (formatUserInput) => {
  if (!(formatUserInput <= 12) || formatUserInput === "00") {
    formatUserInput = formatUserInput.replaceAll(formatUserInput, "yes")
  }
}
const setFalseToValidityTestByID = (
  input,
  map,
  firstID,
  secondID,
  firstTest,
  secondTest
) => {
  switch (input.id) {
    case firstID:
      map.set(firstTest, false)
      break
    case secondID:
      map.set(secondTest, false)
      break

    default:
      break
  }
}
const setTrueToValidityTestByID = (
  input,
  map,
  firstID,
  secondID,
  firstTest,
  secondTest
) => {
  switch (input.id) {
    case firstID:
      map.set(firstTest, true)
      break
    case secondID:
      map.set(secondTest, true)
      break

    default:
      break
  }
}

const setBorderRadius = (
  inputFirst,
  inputSecond,
  state,
  firstClassName,
  secondClassName
) => {
  if (!isHidable(state)) {
    inputFirst.classList.add(firstClassName)
    inputSecond.classList.add(secondClassName)
  } else {
    inputFirst.classList.remove(firstClassName)
    inputSecond.classList.remove(secondClassName)
  }
}

const setSlashInvalid = (element, state, className) => {
  if (!isHidable(state)) {
    element.classList.add(className)
  } else {
    element.classList.remove(className)
  }
}

const getValidityTestResult = (
  input,
  map,
  newMap,
  firstID,
  secondID,
  firstTest,
  secondTest
) => {
  switch (input.id) {
    case firstID:
      newMap.set(firstTest, map.get(firstTest))
      return newMap
    case secondID:
      newMap.set(secondTest, map.get(secondTest))
      return newMap
    default:
      break
  }
}
