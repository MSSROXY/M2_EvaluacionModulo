const form = document.getElementById("contactForm");
const inputs = form.querySelectorAll("input, textarea");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(field) {
  const value = field.value.trim();
  const id = field.id;
  let isValid = true;
  let feedbackKey = "";

  // Primero ocultamos todos los feedbacks de ese campo
  const feedbacks = field.parentElement.querySelectorAll(".invalid-feedback");
  feedbacks.forEach((f) => (f.style.display = "none"));

  // Validaciones específicas
  if (id === "name" && value === "") {
    isValid = false;
    feedbackKey = "name:required";
  } else if (id === "email") {
    if (value === "") {
      isValid = false;
      feedbackKey = "email:required";
    } else if (!emailRegex.test(value)) {
      isValid = false;
      feedbackKey = "email:email";
    }
  } else if (id === "phone" && value === "") {
    isValid = false;
    feedbackKey = "phone:required";
  } else if (id === "message" && value === "") {
    isValid = false;
    feedbackKey = "message:required";
  }

  // Mostrar u ocultar mensajes según el resultado
  if (!isValid) {
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
    const feedback = field.parentElement.querySelector(
      `[data-sb-feedback="${feedbackKey}"]`
    );
    if (feedback) feedback.style.display = "block";
  } else {
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
    // Asegurar que todos los feedback queden ocultos
    feedbacks.forEach((f) => (f.style.display = "none"));
  }

  return isValid;
}

// Validar mientras escribe o al salir del campo
inputs.forEach((input) => {
  input.addEventListener("input", () => validateField(input));
  input.addEventListener("blur", () => validateField(input));
});

// Validar todo al enviar
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let formIsValid = true;

  inputs.forEach((input) => {
    const valid = validateField(input);
    if (!valid) formIsValid = false;
  });

  const successMsg = document.getElementById("submitSuccessMessage");
  const errorMsg = document.getElementById("submitErrorMessage");

  if (formIsValid) {
    successMsg.classList.remove("d-none");
    errorMsg.classList.add("d-none");
    form.reset();

    inputs.forEach((input) => {
      input.classList.remove("is-valid", "is-invalid");
      const feedbacks =
        input.parentElement.querySelectorAll(".invalid-feedback");
      feedbacks.forEach((f) => (f.style.display = "none"));
    });
  } else {
    errorMsg.classList.remove("d-none");
    successMsg.classList.add("d-none");
  }
});
