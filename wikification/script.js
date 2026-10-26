
const registrationForm = document.getElementById("registrationForm");
const formMessage = document.getElementById("formMessage");

registrationForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!registrationForm.checkValidity()) {
    registrationForm.reportValidity();
    return;
  }

  const firstName = document.getElementById("firstName").value.trim();

  formMessage.textContent =
    `Thank you, ${firstName}! Your details passed the demo validation. ` +
    "No registration has been submitted to Cvent.";

  formMessage.hidden = false;
  formMessage.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
});
