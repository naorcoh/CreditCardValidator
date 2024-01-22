//inputs selector
const chnInput = document.querySelector("#card-holders")
const ccnInput = document.querySelector("#ccn")
const cvcInput = document.querySelector("#cvc")
const mmInput = document.querySelector("#mm-input")

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
])

payBtn.disabled = true
payBtn.classList.add("btn--cc-disabled")

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
  const formatMMarr = mmFormat(evt.target)
  evt.target.value = formatMMarr[0]

  mmValidations(evt.target, formatMMarr[1], mmInvalidMsg, "only digit allow")
  mmInRangeValidations(
    evt.target,
    formatMMarr[1],
    mmInvalidMsg,
    "the month range is allowed from 1-12 or 01-12"
  )

  2 <= evt.target.value.length && focusSibling(evt.target)
  evt.stopImmediatePropagation()
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

const mmTrueTable = new Map([
  ["mmValidations", false],
  ["mmInRangeValidations", false],
])

console.log(mmTrueTable)
const mmValidations = (input, previousUserInput, msgElement, msgText) => {
  const msgTxtNode = document.createTextNode(msgText)
  const msgBrTwo = document.createElement("br")
  const id = [...brElementIdSet][6]
  msgBrTwo.setAttribute("id", id)
  const regex = /^\d+$/g

  if (!regex.test(previousUserInput) && !previousUserInput.length == 0) {
    mmTrueTable.set("mmValidations", false)
    //show the msgElement by remove hidden class
    msgElement.classList.remove("hidden")

    //if msg exist in msgElement don't append it agin!;
    if (!msgElement.textContent.includes(msgText)) {
      //append text nod and br element
      msgElement.append(msgTxtNode)
      msgElement.append(msgBrTwo)
    }
  } else {
    mmTrueTable.set("mmValidations", true)

    input.setCustomValidity("")
    removeTextNodeByMsgContent(msgElement, msgText)
    removeBrById(msgElement, id)
  }

  if (
    input.checkValidity() &&
    mmTrueTable.get("mmValidations") &&
    mmTrueTable.get("mmInRangeValidations")
  ) {
    //add hidden class to hide msg element

    msgElement.classList.add("hidden")
    //for the input we don't need spacial class because
    //we have :invalid and :valid pseudo class fire when input.checkValidity() true/false
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
  const id = [...brElementIdSet][7]
  msgBrTwo.setAttribute("id", id)

  if (
    !(previousUserInput >= 1 && previousUserInput <= 12) &&
    !previousUserInput == "" &&
    !previousUserInput == "00"
  ) {
    //show the msgElement by remove hidden class
    mmTrueTable.set("mmInRangeValidations", false)
    msgElement.classList.remove("hidden")
    input.setCustomValidity("msgText")

    //if msg exist in msgElement don't append it agin!;
    if (!msgElement.textContent.includes(msgText)) {
      //append text nod and br element
      msgElement.append(msgTxtNode)
      msgElement.append(msgBrTwo)
    }
  } else {
    mmTrueTable.set("mmInRangeValidations", true)
    removeTextNodeByMsgContent(msgElement, msgText)
    removeBrById(msgElement, id)
  }

  if (
    input.checkValidity() &&
    mmTrueTable.get("mmValidations") &&
    mmTrueTable.get("mmInRangeValidations")
  ) {
    //add hidden class to hide msg element

    msgElement.classList.add("hidden")
    //for the input we don't need spacial class because
    //we have :invalid and :valid pseudo class fire when input.checkValidity() true/false
  }
}

//helper functions
const removeBrById = (pElement, id) => {
  for (const childElement of pElement.children) {
    if (childElement.id == id) {
      pElement.removeChild(childElement)
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
//take from stackoverflow
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

let rmOutOfRange = (formatUserInput) => {
  if (!(formatUserInput <= 12) || formatUserInput === "00") {
    formatUserInput = formatUserInput.replaceAll(formatUserInput, "yes")
  }
}

console.log("let check what going", rmOutOfRange("33"))

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
