const signupForm = document.querySelector(".signup__form");
const signupFields = document.querySelectorAll(".signup__field");
const emailField = document.querySelector(`input[name="email"]`);

const resetField = (e) => {
  e.target.classList.remove("signup__field--error");
  e.target.nextSibling.classList.remove("err-msg--visible");
};

const validateFields = (e) => {
  e.preventDefault();

  signupFields.forEach((field) => {
    const fieldType = field.getAttribute("type");

    if (fieldType === "password" && field.value.length > 0) return;
    if (fieldType === "email" && !isValidEmail(field.value.trim()))
      showFieldError(field, `Looks like this is not an email`);

    if (field.value.trim() === "") {
      field.value = "";
      showFieldError(
        field,
        `${field.getAttribute("placeholder")} cannot be empty`
      );
    }
  });

  if (!document.querySelectorAll(".signup__field--error").length) {
    // signupForm.submit();
    alert("Submit");
  }
};

signupForm.addEventListener("submit", validateFields);
emailField.addEventListener("invalid", (e) => {
  e.preventDefault();
  validateFields(e);
});

signupFields.forEach((field) => {
  const errorMsg = document.createElement("SMALL");
  errorMsg.classList.add("err-msg");
  field.insertAdjacentElement("afterend", errorMsg);
  field.addEventListener("input", resetField);
});

function showFieldError(field, errorMessage) {
  field.classList.add("signup__field--error");
  field.nextSibling.classList.add("err-msg--visible");
  field.nextSibling.innerText = errorMessage;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
