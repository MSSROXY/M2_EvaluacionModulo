const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField($field) {
  const id = $field.attr("id");
  const value = $.trim($field.val());
  let isValid = true;
  let feedbackKey = "";

  // Oculta todos los feedbacks primero
  $field.parent().find(".invalid-feedback").hide();

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

  // Mostrar/ocultar errores
  if (!isValid) {
    $field.addClass("is-invalid").removeClass("is-valid");
    let feedback = $field.parent().find(`[data-sb-feedback="${feedbackKey}"]`);
    feedback.fadeIn(150);
  } else {
    $field.removeClass("is-invalid").addClass("is-valid");
    $field.parent().find(".invalid-feedback").fadeOut(150);
  }

  return isValid;
}

$("#contactForm input, #contactForm textarea").on("input blur", function () {
  validateField($(this));
});

$("#contactForm").on("submit", function (e) {
  e.preventDefault();
  let formIsValid = true;

  $("#contactForm input, #contactForm textarea").each(function () {
    if (!validateField($(this))) formIsValid = false;
  });

  const $successMsg = $("#submitSuccessMessage");

  if (formIsValid) {
    $successMsg.removeClass("d-none").hide().fadeIn(300);
    this.reset();

    $("#contactForm input, #contactForm textarea")
      .removeClass("is-valid is-invalid")
      .each(function () {
        $(this).parent().find(".invalid-feedback").hide();
      });
  }
});

const testForm = document.getElementById("testForm");
const feedback = document.getElementById("feedbackTest");
const feedbackContainer = document.getElementById("testResult");
const closeBtn = document.getElementById("closeSecurityTestModal");

// Reinicia el test al cerrar el modal
const securityTestModal = document.getElementById("securityTestModal");
securityTestModal.addEventListener("hidden.bs.modal", function () {
  testForm.reset(); // limpia respuestas
  feedback.classList.remove("text-success", "text-danger");
  feedback.textContent = ""; // limpia texto
});

testForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const respuestas = [
    document.querySelector('input[name="q1"]:checked')?.value,
    document.querySelector('input[name="q2"]:checked')?.value,
    document.querySelector('input[name="q3"]:checked')?.value,
    document.querySelector('input[name="q4"]:checked')?.value,
    document.querySelector('input[name="q5"]:checked')?.value,
  ];
  let mensaje = "";
  const respuestasSinValor = respuestas.filter((r) => r == undefined).length;
  // console.log('hoola', respuestas, total, respuestas.length)
  if (respuestasSinValor > 0) {
    // console.log("en el if", respuestasSinValor, feedback);
    feedback.classList.add("text-warning", "fw-semibold");
    feedback.textContent =
      "⚠️ Por favor responde todas las preguntas antes de continuar.";
    return;
  }
  const total = respuestas.filter((r) => r === "yes").length;
  feedback.classList.remove("text-success", "text-warning", "text-danger", "d-none");

  if (total === 5) {
    mensaje = "🟢 ¡Excelente! Tienes muy buenos hábitos de seguridad digital.";
    feedback.classList.add("text-success");
  } else if (total >= 3) {
    mensaje = "🟡 Vas por buen camino, pero podrías mejorar algunos hábitos.";
    feedback.classList.add("text-warning");
  } else {
    mensaje = "🔴 Cuidado: estás en riesgo de sufrir ataques cibernéticos.";
    feedback.classList.add("text-danger");
  }
  // console.log("entro al else", total, respuestas);
  feedback.textContent = `Tu puntaje: ${total}/5. ${mensaje}`;
});
