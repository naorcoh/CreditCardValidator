/*------------------------------------*\
  #SELECTORS
\*------------------------------------*/
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
  "br-1-toShortCHN",
  "br-2-toShortCCN",
  "br-3-toLongCHN",
  "br-4-toLongCCN",
  "br-5-toLongCVC",
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
  "br-invalidYearINlenght-18",
  "br-emptyMonthInput-19",
  "br-emptyYearInput-20",
  "br-invalidMonthINlenght-21",
])

payBtn.disabled = true
payBtn.classList.add("btn--cc-disabled")
let helper = 0
/*------------------------------------*\
  #STATE-MENEGMENT
\*------------------------------------*/
//Input validtions results
const cardHoldersNameInputResults = new Map([
  ["isToShortCHNInput", -1],
  ["isToLongCHNInput", -1],
  ["isOnlyAlphabetsAndSpacesInCHN", -1],
])
const creditCardNumberInputResults = new Map([["isToShortCCNInput", -1]])
const CVCInputVlidationsResults = new Map([
  ["isToShortCVCInput", -1],
  ["isToLongCVCInput", -1],
])

//validate results in all Input
const toLongValidationResults = new Map([
  ["isToLongCHNInput", -1],
  ["isToLongCCNInput", -1],
  ["isToLongCVCInput", -1],
])
const toShortValidationResults = new Map([
  ["isToShortCHNInput", -1],
  ["isToShortCCNInput", -1],
  ["isToShortCVCInput", -1],
])

const AlphabetsAndSpacesValidationsResults = new Map([
  ["isOnlyAlphabetsAndSpacesInCHN", -1],
])

//validate results for per Input
const isCardHoldersNameInputIsToShort = new Map([["isToShortCHNInput", -1]])
const isOnlyAlphabetsAndSpacesInCHN = new Map([
  ["isOnlyAlphabetsAndSpacesInCHN", -1],
])
const isCardHoldersNameInputIsToLong = new Map([["isToLongCHNInput", -1]])

const isCreditCardNumberInputIsToShort = new Map([["isToShortCCNInput", -1]])
const isCreditCardNumberInputIsToLong = new Map([["isToLongCCNInput", -1]])
const isCVCInputIsToShort = new Map([["isToShortCVCInput", -1]])
const isCVCInputIsToLong = new Map([["isToLongCVCInput", -1]])

//expiry inputs

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
  ["isYearINMinLenght", -1],
  ["isMonthINMinLenght", -1],
  ["isYearInputEmpty", -1],
  ["isMonthInputEmpty", -1],
])

let monthInputValidationsResults = new Map([
  ["isMonthInputContainOnlyDigit", -1],
  ["numberIsMonth", -1],
  ["isMonthExpire", -1],
  ["isMonthINMinLenght", -1],
  ["isMonthInputEmpty", -1],
])

let yearInputValidationsResults = new Map([
  ["isCurrentOrFutureYear", -1],
  ["isYearInputContainOnlyDigit", -1],
  ["isYearExpire", -1],
  ["isYearINMinLenght", -1],
  ["isYearInputEmpty", -1],
])

let digitValidationsResults = new Map([
  ["isMonthInputContainOnlyDigit", -1],
  ["isYearInputContainOnlyDigit", -1],
])
const isCardDateExpire = new Map([
  ["isMonthExpire", -1],
  ["isYearExpire", -1],
])
const isMonthInputsEmptyValidationResult = new Map([["isMonthInputEmpty", -1]])

const isYearInputsEmptyValidationResult = new Map([["isYearInputEmpty", -1]])
const isYearINMinLenghtValidationResult = new Map([["isYearINMinLenght", -1]])
const isMonthINMinLenghtValidationResult = new Map([["isMonthINMinLenght", -1]])
const numberIsMounthValidationsResults = new Map([["numberIsMonth", -1]])
let isFutureYearValidationsResults = new Map([["isCurrentOrFutureYear", -1]])

//validation pass map
const validationPass = new Map([
  ["onlyNumber", false],
  ["tooShortCCN", false],
  ["ccnIsValid", false],
])

let BRStateArray = []

let BRelementUsedResults = new Map()

/*------------------------------------*\
  #EVENT-HANDLER
\*------------------------------------*/

const chnHandler = (evt) => {
  vlidateInputLengthNotTooShort(
    evt.target,
    cardHoldersErrorMsg,
    "Please lengthen this text to 2 characters or more (you are currently using 1 character).",
    [...brElementIdSet][1],
    "isToShortCHNInput",
    cardHoldersNameInputResults,
    toShortValidationResults,
    isCreditCardNumberInputIsToShort,
    BRStateArray
  )

  vlidateInputLengthTooLongMsg(
    evt.target,
    cardHoldersErrorMsg,
    "you reach maximum length of characters(30 characters)",
    [...brElementIdSet][2],
    "isToLongCCNInput",
    cardHoldersNameInputResults,
    toLongValidationResults,
    isCardHoldersNameInputIsToLong,
    BRStateArray
  )

  vlidateOnlyAlphabetsAndSpaces(
    evt.target,
    cardHoldersErrorMsg,
    "only english alphabets characters and spaces allow!",
    [...brElementIdSet][3],
    "isOnlyAlphabetsAndSpacesInCHN",
    cardHoldersNameInputResults,
    AlphabetsAndSpacesValidationsResults,
    isOnlyAlphabetsAndSpacesInCHN,
    BRStateArray
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

const monthInputEventHandler = (evt) => {
  const id = [
    [...brElementIdSet][13],
    [...brElementIdSet][15],
    [...brElementIdSet][16],
    [...brElementIdSet][18],
  ]
  const previousInputValue = evt.target.value
  formatNonDigit(evt.target, 0, 2)
  validateDigitMonthInput(
    evt.target,
    previousInputValue,
    mmInvalidMsg,
    ">only digit allow",
    id[0],
    inputValidationResults
  )
  validateNumberIsMonth(
    evt.target,
    mmInvalidMsg,
    ">The month you entered is invalid. Please ensure you enter a number between 1 and 12 for the month.",
    id[1],
    "numberIsMonth",
    inputValidationResults,
    numberIsMounthValidationsResults,
    monthInputValidationsResults,
    BRStateArray
  )
  validateCardExpiration(
    mmInput,
    yyInput,
    mmInvalidMsg,
    ">The expiration date you entered is invalid. Please make sure the date you eneter is not expire",
    id[2],
    "isMonthExpire",
    "isYearExpire",
    inputValidationResults,
    isCardDateExpire,
    monthInputValidationsResults,
    yearInputValidationsResults,
    BRStateArray
  )
  // validateMonthInputEmpty(
  //   evt.target,
  //   mmInvalidMsg,
  //   ">Invalid month input. The input is empty.",
  //   id[3],
  //   "isMonthInputEmpty",
  //   inputValidationResults,
  //   isMonthInputsEmptyValidationResult,
  //   monthInputValidationsResults,
  //   BRStateArray
  // )

  validatePastYear(
    yyInput,
    mmInput,
    mmInvalidMsg,
    ">the year are enter past please enter valid year",
    [...brElementIdSet][12],
    inputValidationResults
  )

  removeMonthInputEmptyValidations(
    evt.target,
    mmInvalidMsg,
    ">Invalid month input. The input is empty.",
    id[3],
    "isMonthInputEmpty",
    inputValidationResults,
    isMonthInputsEmptyValidationResult,
    monthInputValidationsResults,
    BRStateArray
  )

  if (
    evt.target.value.length >= 2 &&
    evt.target.nextElementSibling.nextElementSibling &&
    isHidable(monthInputValidationsResults)
  ) {
    evt.target.nextElementSibling.nextElementSibling.focus()
  }
}

const monthChangeEeventHandler = (evt) => {
  validateNumberIsMonth(
    evt.target,
    mmInvalidMsg,
    ">The month you entered is invalid. Please ensure you enter a number between 1 and 12 for the month.",
    [...brElementIdSet][15],
    "numberIsMonth",
    inputValidationResults,
    numberIsMounthValidationsResults,
    monthInputValidationsResults,
    BRStateArray
  )
}

// const focusLoseMM = mmInput.addEventListener("change", (evt) => {
//   if (evt.target.value == 1) evt.target.value = "01"
// })

const monthFocusEventHandler = (evt) => {
  const id = [[...brElementIdSet][18]]
  // removeMonthInputEmptyValidations(
  //   evt.target,
  //   mmInvalidMsg,
  //   ">Invalid month input. The input is empty.",
  //   id[0],
  //   "isMonthInputEmpty",
  //   inputValidationResults,
  //   isMonthInputsEmptyValidationResult,
  //   monthInputValidationsResults,
  //   BRStateArray
  // )
}

const monthBlurEvtHandler = (evt) => {
  const id = [[...brElementIdSet][18]]
  validateMonthInputEmpty(
    evt.target,
    mmInvalidMsg,
    ">Invalid month input. The input is empty.",
    id[0],
    "isMonthInputEmpty",
    inputValidationResults,
    isMonthInputsEmptyValidationResult,
    monthInputValidationsResults,
    BRStateArray
  )

  const previousInputValue = evt.target.value
  formatNonDigit(evt.target, 0, 2)
  validateDigitMonthInput(
    evt.target,
    previousInputValue,
    mmInvalidMsg,
    ">only digit allow",
    [...brElementIdSet][13],
    inputValidationResults
  )
}

const yearInputEventHandler = (evt) => {
  const id = [
    [...brElementIdSet][12],
    [...brElementIdSet][13],
    [...brElementIdSet][16],
    [...brElementIdSet][17],
    [...brElementIdSet][19],
  ]

  const previousInputValue = evt.target.value

  formatNonDigit(evt.target, 0, 2)
  validateDigitYearInput(
    evt.target,
    previousInputValue,
    mmInvalidMsg,
    ">only digit allow",
    id[1],
    inputValidationResults
  )

  validatePastYear(
    evt.target,
    mmInput,
    mmInvalidMsg,
    ">the year are enter past please enter valid year",
    id[0],
    inputValidationResults
  )

  validateYearMinLengthInInputEvent(
    evt.target,
    mmInvalidMsg,
    "Invalid input length. The year input must contain a minimum of two digits",
    id[3],
    "isYearINMinLenght",
    inputValidationResults,
    isYearINMinLenghtValidationResult,
    yearInputValidationsResults,
    BRStateArray
  )

  validateCardExpiration(
    mmInput,
    yyInput,
    mmInvalidMsg,
    ">The expiration date you entered is invalid. Please make sure the date you eneter is not expire",
    id[2],
    "isMonthExpire",
    "isYearExpire",
    inputValidationResults,
    isCardDateExpire,
    monthInputValidationsResults,
    yearInputValidationsResults,
    BRStateArray
  )

  // validateYearInputEmpty(
  //   evt.target,
  //   mmInvalidMsg,
  //   ">Invalid year input. The input is empty.",
  //   id[4],
  //   "isYearInputEmpty",
  //   inputValidationResults,
  //   isYearInputsEmptyValidationResult,
  //   yearInputValidationsResults,
  //   BRStateArray
  // )

  removeYearInputEmptyValidations(
    evt.target,
    mmInvalidMsg,
    ">Invalid year input. The input is empty.",
    id[4],
    "isYearInputEmpty",
    inputValidationResults,
    isYearInputsEmptyValidationResult,
    yearInputValidationsResults,
    BRStateArray
  )
}

const yearInputBlurEeventHandler = (evt) => {
  const id = [[...brElementIdSet][17], [...brElementIdSet][19]]
  const previousInputValue = evt.target.value
  formatNonDigit(evt.target, 0, 2)

  validateYearMinLength(
    evt.target,
    mmInvalidMsg,
    ">Invalid input length. The year input must contain a minimum of two digits",
    id[0],
    "isYearINMinLenght",
    inputValidationResults,
    isYearINMinLenghtValidationResult,
    yearInputValidationsResults,
    BRStateArray
  )

  validateYearInputEmpty(
    evt.target,
    mmInvalidMsg,
    ">Invalid year input. The input is empty.",
    id[1],
    "isYearInputEmpty",
    inputValidationResults,
    isYearInputsEmptyValidationResult,
    yearInputValidationsResults,
    BRStateArray
  )

  validateDigitYearInput(
    evt.target,
    previousInputValue,
    mmInvalidMsg,
    ">only digit allow",
    [...brElementIdSet][13],
    inputValidationResults
  )
}

const cvcHandler = (evt) => {
  vlidateInputLengthNotTooShort(
    evt.target,
    cvcInvalidMsg,
    "the minium length for cvc code is 3 digit",
    [...brElementIdSet][2],
    "isToShortCVCInput",
    CVCInputVlidationsResults,
    toShortValidationResults,
    isCVCInputIsToShort,
    BRStateArray
  )

  vlidateInputLengthTooLongMsg(
    evt.target,
    cvcInvalidMsg,
    "you reach maximum length of characters 3",
    [...brElementIdSet][2],
    "isToLongCVCInput",
    CVCInputVlidationsResults,
    toLongValidationResults,
    isCVCInputIsToLong,
    BRStateArray
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

/*------------------------------------*\
  #LISTENERS
\*------------------------------------*/
//input listener
chnInput.addEventListener("input", chnHandler)
ccnInput.addEventListener("input", ccnHandler)
cvcInput.addEventListener("input", cvcHandler)

mmInput.addEventListener("input", monthInputEventHandler)
mmInput.addEventListener("focusout", monthBlurEvtHandler)
mmInput.addEventListener("focus", monthFocusEventHandler)
// mmInput.addEventListener("change", monthChangeEeventHandler)
// mmInput.addEventListener("focusout", (evt) => {})

yyInput.addEventListener("input", yearInputEventHandler)
yyInput.addEventListener("focusout", yearInputBlurEeventHandler)

form.addEventListener("input", formHandler)
/*------------------------------------*\
  #FORMATTERS
\*------------------------------------*/

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
const formatYearLenght = (input) => {
  if (input.value.length > 2) {
    input.value = input.value.substring(0, 2)
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

/*------------------------------------*\
  #VALIDATIONS
\*------------------------------------*/

//card holders constraint validation functions

const vlidateInputLengthNotTooShort = (
  input,
  errorElement,
  errorText,
  id,
  validtionName,
  validationsResults,
  validationResult,
  inputValidationsResults,
  BRstateArray
) => {
  if (input.validity.tooShort) {
    validationsResults.set(validtionName, false)
    validationResult.set(validtionName, false)
    inputValidationsResults.set(validtionName, false)

    input.setCustomValidity(errorText)
    appendErrorTextNodToElement(errorElement, errorText)
    appendBRToErrorElement(errorElement, id, BRstateArray)
    showError(errorElement)
  } else {
    validationsResults.set(validtionName, true)
    validationResult.set(validtionName, true)
    inputValidationsResults.set(validtionName, true)

    removeMarkField(input, inputValidationsResults)
    removeErrorText(errorElement, errorText, validationResult)
    removeBrById(errorElement, id, BRstateArray, validationResult)
    hideError(errorElement, validationsResults)
  }
}

const vlidateInputLengthTooLongMsg = (
  input,
  errorElement,
  errorText,
  id,
  validtionName,
  validationsResults,
  validationResult,
  inputValidationsResults,
  BRstateArray
) => {
  if (input.value.length >= input.maxLength) {
    validationsResults.set(validtionName, false)
    validationResult.set(validtionName, false)
    inputValidationsResults.set(validtionName, false)

    input.setCustomValidity(errorText)
    appendErrorTextNodToElement(errorElement, errorText)
    appendBRToErrorElement(errorElement, id, BRstateArray)
    showError(errorElement)
  } else {
    validationsResults.set(validtionName, true)
    validationResult.set(validtionName, true)
    inputValidationsResults.set(validtionName, true)

    removeMarkField(input, inputValidationsResults)
    removeErrorText(errorElement, errorText, validationResult)
    removeBrById(errorElement, id, BRstateArray, validationResult)
    hideError(errorElement, validationsResults)
  }
}
const vlidateOnlyAlphabetsAndSpaces = (
  input,
  errorElement,
  errorText,
  id,
  validtionName,
  validationsResults,
  validationResult,
  inputValidationsResults,
  BRstateArray
) => {
  const regexPattern = /^[a-zA-Z ]*$/

  if (!regexPattern.test(input.value)) {
    validationsResults.set(validtionName, false)
    validationResult.set(validtionName, false)
    inputValidationsResults.set(validtionName, false)

    input.setCustomValidity(errorText)
    appendErrorTextNodToElement(errorElement, errorText)
    appendBRToErrorElement(errorElement, id, BRstateArray)
    showError(errorElement)
  } else {
    validationsResults.set(validtionName, true)
    validationResult.set(validtionName, true)
    inputValidationsResults.set(validtionName, true)

    removeMarkField(input, inputValidationsResults)
    removeErrorText(errorElement, errorText, validationResult)
    removeBrById(errorElement, id, BRstateArray, validationResult)
    hideError(errorElement, validationsResults)
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

const showErrorValidations = (
  input,
  errorElement,
  errorText,
  customValidations,
  id,
  validtionName,
  validationsResults,
  validationResult,
  inputValidationsResults,
  BRstateArray
) => {
  validationsResults.set(validtionName, false)
  validationResult.set(validtionName, false)
  inputValidationsResults.set(validtionName, false)

  input.setCustomValidity(customValidations)
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
}

const hideErrorValidations = (
  input,
  errorElement,
  errorText,
  id,
  validtionName,
  validationsResults,
  validationResult,
  inputValidationsResults,
  BRstateArray
) => {
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
  hideError(errorElement, validationsResults)
}

//month input validations
const validateDigitMonthInput = (
  input,
  previousUserValue,
  errorElement,
  errorText,
  id,
  validationsTestMap
) => {
  if (isContainNonDigit(previousUserValue) && previousUserValue.length <= 2) {
    inputValidationResults.set("isMonthInputContainOnlyDigit", false)
    digitValidationsResults.set("isMonthInputContainOnlyDigit", false)
    monthInputValidationsResults.set("isMonthInputContainOnlyDigit", false)

    input.setCustomValidity("validate numeric in input")
    appendErrorTextNodToElement(errorElement, errorText)
    appendBRToErrorElement(errorElement, id, BRStateArray)
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
    removeBrById(errorElement, id, BRStateArray, digitValidationsResults)
    setBorderRadius(
      mmInput,
      yyInput,
      validationsTestMap,
      "form__input--mm-invalid-right",
      "form__input--yy-invalid-left"
    )
    setSlashInvalid(expirySlash, validationsTestMap, "form__slash--invalid")
    hideError(errorElement, validationsTestMap)
  }
}
const validateNumberIsMonth = (
  input,
  errorElement,
  errorText,
  id,
  validtionName,
  validationsResults,
  validationResult,
  inputValidationsResults,
  BRstateArray
) => {
  if (isNotMonth(input) && isNotBlank(input)) {
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
    hideError(errorElement, validationsResults)
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
const validateMonthInputEmpty = (
  input,
  errorElement,
  errorText,
  id,
  validtionName,
  validationsResults,
  validationResult,
  inputValidationsResults,
  BRstateArray
) => {
  if (isBlank(input)) {
    validationsResults.set(validtionName, false)
    validationResult.set(validtionName, false)
    inputValidationsResults.set(validtionName, false)

    input.setCustomValidity("month input is blank")
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
    hideError(errorElement, validationsResults)
  }
}

const removeMonthInputEmptyValidations = (
  input,
  errorElement,
  errorText,
  id,
  validtionName,
  validationsResults,
  validationResult,
  inputValidationsResults,
  BRstateArray
) => {
  if (isBlank(input) || input.value.length > 0) {
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
    hideError(errorElement, validationsResults)
  }
}

//year input validations
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
    appendBRToErrorElement(errorElement, id, BRStateArray)
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
    removeBrById(errorElement, id, BRStateArray, digitValidationsResults)
    setBorderRadius(
      mmInput,
      yyInput,
      validationsTestMap,
      "form__input--mm-invalid-right",
      "form__input--yy-invalid-left"
    )
    setSlashInvalid(expirySlash, validationsTestMap, "form__slash--invalid")
    hideError(errorElement, validationsTestMap)
  }
}
const validatePastYear = (
  yearInput,
  monthInput,
  errorElement,
  errorText,
  id,
  validationsTestMap
) => {
  if (
    isYearPast(yearInput) &&
    !isCurrentDateExpire(monthInput, yearInput) &&
    isNotBlank(yearInput) &&
    isNotBlank(monthInput)
  ) {
    inputValidationResults.set("isCurrentOrFutureYear", false)
    yearInputValidationsResults.set("isCurrentOrFutureYear", false)
    isFutureYearValidationsResults.set("isCurrentOrFutureYear", false)

    yearInput.setCustomValidity("past year validations")

    appendErrorTextNodToElement(errorElement, errorText)
    appendBRToErrorElement(errorElement, id, BRStateArray)
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

    removeMarkField(yearInput, yearInputValidationsResults)
    removeErrorText(errorElement, errorText, isFutureYearValidationsResults)
    removeBrById(errorElement, id, BRStateArray, isFutureYearValidationsResults)
    setBorderRadius(
      mmInput,
      yyInput,
      validationsTestMap,
      "form__input--mm-invalid-right",
      "form__input--yy-invalid-left"
    )
    setSlashInvalid(expirySlash, validationsTestMap, "form__slash--invalid")
    hideError(errorElement, validationsTestMap)
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
const validateYearMinLength = (
  input,
  errorElement,
  errorText,
  id,
  validtionName,
  validationsResults,
  validationResult,
  inputValidationsResults,
  BRstateArray
) => {
  if (input.value.length < 2 && isNotBlank(input)) {
    validationsResults.set(validtionName, false)
    validationResult.set(validtionName, false)
    inputValidationsResults.set(validtionName, false)

    input.setCustomValidity(
      "Invalid input length. The year input must contain a minimum of two digits"
    )
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
    hideError(errorElement, validationsResults)
  }
}
const validateYearMinLengthInInputEvent = (
  input,
  errorElement,
  errorText,
  id,
  validtionName,
  validationsResults,
  validationResult,
  inputValidationsResults,
  BRstateArray
) => {
  if (input.value.length == 2 || isBlank(input)) {
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
    hideError(errorElement, validationsResults)
  }
}
const validateYearInputEmpty = (
  input,
  errorElement,
  errorText,
  id,
  validtionName,
  validationsResults,
  validationResult,
  inputValidationsResults,
  BRstateArray
) => {
  if (isBlank(input)) {
    validationsResults.set(validtionName, false)
    validationResult.set(validtionName, false)
    inputValidationsResults.set(validtionName, false)

    input.setCustomValidity("year input is blank")
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
    hideError(errorElement, validationsResults)
  }
}

const removeYearInputEmptyValidations = (
  input,
  errorElement,
  errorText,
  id,
  validtionName,
  validationsResults,
  validationResult,
  inputValidationsResults,
  BRstateArray
) => {
  if (isBlank(input) || input.value.length > 0) {
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
    hideError(errorElement, validationsResults)
  }
}

//year and input validation
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
  validationsResults.delete(monthInputKey)
  validationsResults.delete(yearInputKey)

  if (isCurrentDateExpire(monthInput, yearInput) && isNotBlank(monthInput)) {
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
    hideError(errorElement, validationsResults)
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
/*------------------------------------*\
  #LOGICAL-TESTS
\*------------------------------------*/
//logic test
const isCurrentDateExpire = (monthInput, yearInput) => {
  const dateObj = new Date()
  const currentMonth = dateObj.getMonth() + 1
  const currentYear = dateObj.getFullYear().toString().substring(2, 4)

  return (
    (monthInput.value <= currentMonth &&
      yearInput.value <= currentYear &&
      yearInput.value.length == 2 &&
      monthInput.value.length <= 2 &&
      monthInput.value <= 12) ||
    (yearInput.value < currentYear &&
      yearInput.value.length == 2 &&
      monthInput.value.length <= 2 &&
      monthInput.value <= 12)
  )
}
function isNumber(value) {
  return !isNaN(value)
}
const isMonth = (input) => {
  const NUM_IS_MONTH_REGEX = /^(0?[1-9]|1[0-2])$/g
  return NUM_IS_MONTH_REGEX.test(input.value)
}
const isNotMonth = (input) => {
  return !isMonth(input)
}
const isFourDigitNumber = (input) => {
  return /^\d{4}$/.test(input.value)
}
const isContainNonDigit = (value) => {
  const NON_DIGIT_REGEX = /\D+/g
  return NON_DIGIT_REGEX.test(value)
}
const isNotBlank = (input) => {
  return !(input.value == "")
}
const isBlank = (input) => {
  return input.value == ""
}
const isYearPast = (input) => {
  const currentYear = new Date().getFullYear().toString().substring(2, 4)
  return input.value < currentYear && input.value.length == 2
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

/*------------------------------------*\
  #DOM-MANIPULATIONS
\*------------------------------------*/

//DOM element manipulations
const showError = (msgElement) => {
  msgElement.classList.remove("hidden")
}
const hideError = (msgElement, validationsTestMap) => {
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
const setErrorElementText = (errorElement, errorText) => {
  if (!isTextInclude(errorElement, errorText)) {
    errorElement.textContent = errorText
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
