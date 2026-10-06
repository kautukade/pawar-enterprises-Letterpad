const $ = (id) => document.getElementById(id);

const fields = {
  letterNo: $("letterNo"),
  letterDate: $("letterDate"),
  recipientName: $("recipientName"),
  recipientCompany: $("recipientCompany"),
  recipientAddress: $("recipientAddress"),
  subject: $("subject"),
  salutation: $("salutation"),
  bodyText: $("bodyText"),
  closing: $("closing"),
  signatoryName: $("signatoryName"),
  designation: $("designation"),
  showSignatureLine: $("showSignatureLine")
};

const STORAGE_KEY = "pawar_enterprises_letterpad_draft_v1";

function randomPart(length = 4) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function makeLetterNumber() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `PE-${y}${m}${d}-${randomPart()}`;
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

function textOrBlank(value) {
  return (value || "").trim();
}

function render() {
  $("pLetterNo").textContent = textOrBlank(fields.letterNo.value);
  $("pDate").textContent = formatDate(fields.letterDate.value);

  const name = textOrBlank(fields.recipientName.value);
  const company = textOrBlank(fields.recipientCompany.value);
  const address = textOrBlank(fields.recipientAddress.value);
  $("pRecipientName").textContent = name;
  $("pRecipientCompany").textContent = company;
  $("pRecipientAddress").textContent = address;
  $("pRecipientWrap").style.display = name || company || address ? "block" : "none";

  const subject = textOrBlank(fields.subject.value);
  $("pSubject").textContent = subject;
  $("pSubjectWrap").style.display = subject ? "grid" : "none";

  $("pSalutation").textContent = textOrBlank(fields.salutation.value);
  $("pBody").textContent = fields.bodyText.value;
  $("pClosing").textContent = textOrBlank(fields.closing.value);
  $("pSignatory").textContent = textOrBlank(fields.signatoryName.value);
  $("pDesignation").textContent = textOrBlank(fields.designation.value);
  $("signatureBlock").classList.toggle("compact-signature", !fields.showSignatureLine.checked);

  saveDraft();
}

function draftData() {
  return Object.fromEntries(
    Object.entries(fields).map(([key, el]) => [key, el.type === "checkbox" ? el.checked : el.value])
  );
}

let saveTimer;
function saveDraft() {
  clearTimeout(saveTimer);
  $("saveState").textContent = "Saving…";
  saveTimer = setTimeout(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draftData()));
    $("saveState").textContent = "Draft saved";
  }, 180);
}

function loadDraft() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved) return false;
    Object.entries(fields).forEach(([key, el]) => {
      if (!(key in saved)) return;
      if (el.type === "checkbox") el.checked = Boolean(saved[key]);
      else el.value = saved[key];
    });
    return true;
  } catch {
    return false;
  }
}

function setToday() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  fields.letterDate.value = local.toISOString().slice(0, 10);
}

function freshLetter() {
  fields.letterNo.value = makeLetterNumber();
  setToday();
  fields.recipientName.value = "";
  fields.recipientCompany.value = "";
  fields.recipientAddress.value = "";
  fields.subject.value = "";
  fields.salutation.value = "Dear Sir/Madam,";
  fields.bodyText.value = "";
  fields.closing.value = "Yours faithfully,";
  fields.signatoryName.value = "Authorized Signatory";
  fields.designation.value = "Pawar Enterprises";
  fields.showSignatureLine.checked = true;
  localStorage.removeItem(STORAGE_KEY);
  render();
}

Object.values(fields).forEach((field) => {
  field.addEventListener("input", render);
  field.addEventListener("change", render);
});

$("regenerateId").addEventListener("click", () => {
  fields.letterNo.value = makeLetterNumber();
  render();
});

$("newBtn").addEventListener("click", () => {
  const hasContent = [fields.recipientName, fields.subject, fields.bodyText].some((el) => el.value.trim());
  if (!hasContent || window.confirm("Start a new letter? The current draft will be cleared.")) {
    freshLetter();
  }
});

$("printBtn").addEventListener("click", () => {
  render();
  window.print();
});

if (!loadDraft()) {
  freshLetter();
} else {
  if (!fields.letterNo.value) fields.letterNo.value = makeLetterNumber();
  if (!fields.letterDate.value) setToday();
  render();
}
