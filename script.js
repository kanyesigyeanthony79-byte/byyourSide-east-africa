// Business WhatsApp number in international format (no + or spaces)
const BUSINESS_WHATSAPP = "256787612459";

const form = document.getElementById('companionForm');
const statusBox = document.getElementById('statusBox');

function setError(fieldId, hasError) {
  const el = document.getElementById(fieldId);
  el.classList.toggle('invalid', hasError);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value) {
  return /^[0-9+\s()-]{7,}$/.test(value);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  statusBox.classList.remove('success');
  statusBox.textContent = '';

  const fullName = document.getElementById('fullName').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const preferredContact = document.getElementById('preferredContact').value;
  const destination = document.getElementById('destination').value.trim();
  const travelDate = document.getElementById('travelDate').value;
  const helpType = document.getElementById('helpType').value;
  const notes = document.getElementById('notes').value.trim();

  let valid = true;

  setError('field-name', !fullName);
  if (!fullName) valid = false;

  const phoneOk = phone && isValidPhone(phone);
  setError('field-phone', !phoneOk);
  if (!phoneOk) valid = false;

  const emailOk = email && isValidEmail(email);
  setError('field-email', !emailOk);
  if (!emailOk) valid = false;

  if (!valid) return;

  // Build a prefilled WhatsApp message with the submitted details
  const lines = [
    `New companion request`,
    `Name: ${fullName}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Preferred contact: ${preferredContact}`,
    destination ? `Destination: ${destination}` : null,
    travelDate ? `Expected travel date: ${travelDate}` : null,
    `How we can help: ${helpType}`,
    notes ? `Notes: ${notes}` : null
  ].filter(Boolean).join('\n');

  const waUrl = `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(lines)}`;

  statusBox.classList.add('success');
  statusBox.textContent = "Thanks — opening WhatsApp with your request filled in. Just hit send there and our team will get back to you.";

  window.open(waUrl, '_blank');
  form.reset();
});
