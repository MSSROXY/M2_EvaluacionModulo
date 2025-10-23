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
