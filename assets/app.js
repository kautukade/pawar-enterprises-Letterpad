const $ = (id) => document.getElementById(id);

const fields = {
  templateSelect: $("templateSelect"),
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

const STORAGE_KEY = "pawar_enterprises_letterpad_draft_v2";

const templates = {
  custom: {
    label: "Custom / Blank Letter",
    hint: "Start with a blank business letter and write your own content.",
    subject: "",
    body: "",
    salutation: "Dear Sir/Madam,",
    closing: "Yours faithfully,",
    designation: "Pawar Enterprises"
  },
  quotation_estimate: {
    label: "Quotation / Estimate Letter",
    hint: "Send an indicative or final commercial quotation for proposed work.",
    subject: "Quotation / Estimate for [Service / Project Name]",
    body: `Thank you for giving Pawar Enterprises the opportunity to submit our quotation for [Service / Project Name] at [Project Location].\n\nBased on the site requirement and discussion, our proposed scope includes [Scope of Work]. The estimated project value is ₹[Amount], subject to final measurement, material selection and site conditions.\n\nCommercial Terms:\n• Advance: [Advance % / Amount]\n• Balance Payment: [Payment Terms]\n• Estimated Completion: [Timeline]\n• Quotation Validity: [Validity Period]\n\nAny additional work outside the agreed scope will be charged separately after approval. We look forward to delivering the work with quality, safety and timely execution.`,
    salutation: "Dear Sir/Madam,",
    closing: "Yours faithfully,",
    designation: "Authorized Signatory, Pawar Enterprises"
  },
  work_order: {
    label: "Work Order",
    hint: "Issue or confirm a formal work order with scope, value and timeline.",
    subject: "Work Order – [Project / Service Name]",
    body: `This letter confirms the work order for [Project / Service Name] at [Project Location].\n\nScope of Work:\n[Detailed Scope of Work]\n\nWork Order Value: ₹[Amount]\nStart Date: [Start Date]\nExpected Completion: [Completion Date / Timeline]\nPayment Terms: [Payment Terms]\n\nThe work shall be carried out as per the agreed specifications, approved material standards and site instructions. Any variation or additional work shall be undertaken only after mutual approval.\n\nPlease treat this letter as the formal confirmation of the above work order.`,
    salutation: "Dear Sir/Madam,",
    closing: "For Pawar Enterprises,",
    designation: "Authorized Signatory"
  },
  project_confirmation: {
    label: "Project Confirmation Letter",
    hint: "Confirm project acceptance, agreed scope and execution schedule.",
    subject: "Confirmation of [Project Name]",
    body: `We are pleased to confirm acceptance of the project for [Project Name] at [Project Location].\n\nAs discussed, Pawar Enterprises will execute the agreed work covering [Scope of Work]. The tentative start date is [Start Date] and the expected completion period is [Timeline].\n\nProject Value: ₹[Amount]\nAdvance Received / Payable: ₹[Advance Amount]\nBalance Terms: [Payment Terms]\n\nOur team will coordinate site execution, progress updates and quality checks throughout the project. We appreciate your trust in Pawar Enterprises and look forward to successful completion of the work.`,
    salutation: "Dear Sir/Madam,",
    closing: "Yours faithfully,",
    designation: "Authorized Signatory, Pawar Enterprises"
  },
  work_completion_certificate: {
    label: "Work Completion Certificate",
    hint: "Certify that the assigned project or service has been completed.",
    subject: "Work Completion Certificate – [Project Name]",
    body: `This is to certify that Pawar Enterprises has completed the work of [Service / Project Name] at [Project Location] for [Client Name / Organization].\n\nThe work covered [Scope of Work] and was carried out during the period from [Start Date] to [Completion Date].\n\nTo the best of our records, the agreed scope has been completed and the project has been handed over on [Handover Date], subject to any mutually recorded snag or warranty obligations.\n\nThis certificate is issued on request for official and record purposes.`,
    salutation: "To Whom It May Concern,",
    closing: "For Pawar Enterprises,",
    designation: "Authorized Signatory"
  },
  client_agreement_confirmation: {
    label: "Client Agreement / Confirmation",
    hint: "Record the principal commercial and execution terms agreed with a client.",
    subject: "Confirmation of Agreed Terms – [Project Name]",
    body: `This letter records the mutually agreed terms for [Project Name] at [Project Location].\n\nAgreed Scope: [Scope of Work]\nTotal Value: ₹[Amount]\nAdvance: ₹[Advance Amount]\nPayment Schedule: [Payment Schedule]\nTimeline: [Timeline]\nMaterial / Brand Specification: [Material Details]\nWarranty, if applicable: [Warranty Terms]\n\nAny change in scope, quantity, specification or site condition may result in a revised cost and timeline, which will be communicated for approval before execution.\n\nKindly confirm acceptance of the above terms so that work can proceed accordingly.`,
    salutation: "Dear Sir/Madam,",
    closing: "Yours faithfully,",
    designation: "Authorized Signatory, Pawar Enterprises"
  },
  service_confirmation: {
    label: "Service Confirmation Letter",
    hint: "Confirm a booked service, scope, schedule and commercial terms.",
    subject: "Service Confirmation – [Service Name]",
    body: `We confirm your booking for [Service Name] at [Service Location].\n\nScheduled Date: [Date]\nScheduled Time: [Time]\nService Scope: [Service Details]\nEstimated / Agreed Charges: ₹[Amount]\n\nPlease ensure reasonable access to the work area and availability of required site permissions, electricity and water where applicable. Any additional requirement identified at site will be discussed before proceeding.\n\nThank you for choosing Pawar Enterprises.`,
    salutation: "Dear Sir/Madam,",
    closing: "Yours faithfully,",
    designation: "Customer Service / Authorized Signatory"
  },
  site_visit_confirmation: {
    label: "Site Visit Confirmation",
    hint: "Confirm the date, time and purpose of an inspection or estimation visit.",
    subject: "Site Visit Confirmation – [Location / Project]",
    body: `This is to confirm the site visit by Pawar Enterprises for [Purpose / Service] at [Site Address].\n\nVisit Date: [Date]\nVisit Time: [Time]\nContact Person: [Client / Site Contact]\nPurpose: [Inspection / Measurement / Quotation / Review]\n\nOur representative will inspect the relevant area, understand the requirements and record measurements or observations required for the next stage.\n\nKindly ensure access to the site at the scheduled time.`,
    salutation: "Dear Sir/Madam,",
    closing: "Regards,",
    designation: "Pawar Enterprises"
  },
  material_requirement: {
    label: "Material Requirement Letter",
    hint: "List materials needed for a project or request client/vendor arrangement.",
    subject: "Material Requirement for [Project Name]",
    body: `With reference to the ongoing / proposed work at [Project Location], the following materials are required for execution:\n\n1. [Material 1] – [Quantity]\n2. [Material 2] – [Quantity]\n3. [Material 3] – [Quantity]\n4. [Material 4] – [Quantity]\n\nRequired By: [Date]\nPreferred Brand / Specification: [Details]\nDelivery Location: [Site / Address]\n\nKindly arrange / approve the above materials to avoid delay in the project schedule. Any substitution should be confirmed before procurement or use.`,
    salutation: "Dear Sir/Madam,",
    closing: "Regards,",
    designation: "Project Coordinator, Pawar Enterprises"
  },
  payment_reminder: {
    label: "Payment Reminder Letter",
    hint: "Send a polite reminder for an upcoming or overdue payment.",
    subject: "Payment Reminder – ₹[Pending Amount]",
    body: `This is a friendly reminder regarding the pending payment of ₹[Pending Amount] against [Invoice / Quotation / Project Reference].\n\nTotal Project / Invoice Value: ₹[Total Amount]\nAmount Received: ₹[Received Amount]\nPending Amount: ₹[Pending Amount]\nDue Date: [Due Date]\n\nWe request you to kindly arrange the pending payment at the earliest so that accounts can be updated and project / service formalities can continue without interruption.\n\nIf the payment has already been made, please share the transaction details and kindly disregard this reminder.`,
    salutation: "Dear Sir/Madam,",
    closing: "Thank you,",
    designation: "Accounts, Pawar Enterprises"
  },
  pending_payment_notice: {
    label: "Pending Payment Notice",
    hint: "Use a firmer notice when payment remains outstanding after reminders.",
    subject: "Notice for Outstanding Payment – ₹[Pending Amount]",
    body: `Despite our previous communication, an amount of ₹[Pending Amount] remains outstanding against [Project / Invoice Reference].\n\nOriginal Due Date: [Due Date]\nOutstanding Since: [Number of Days / Date]\nPending Amount: ₹[Pending Amount]\n\nWe request that the outstanding amount be cleared within [Number] days from the date of this notice. Continued non-payment may require us to pause pending work, withhold further services or take other steps available under the agreed commercial terms.\n\nWe would prefer to resolve the matter amicably and request your immediate attention.`,
    salutation: "Dear Sir/Madam,",
    closing: "For Pawar Enterprises,",
    designation: "Accounts / Authorized Signatory"
  },
  advance_payment_request: {
    label: "Advance Payment Request",
    hint: "Request advance payment before procurement or work commencement.",
    subject: "Request for Advance Payment – [Project Name]",
    body: `With reference to the confirmed work for [Project Name], we request release of the agreed advance payment to initiate procurement and project mobilization.\n\nProject Value: ₹[Total Amount]\nAdvance Required: ₹[Advance Amount]\nAdvance Percentage: [Advance %]\nRequested By: [Date]\n\nThe advance will be adjusted against the total project value as per the agreed payment schedule. Work / procurement will be initiated after confirmation of payment, subject to site readiness.\n\nKindly arrange the payment and share transaction details for our records.`,
    salutation: "Dear Sir/Madam,",
    closing: "Thank you,",
    designation: "Accounts / Project Team, Pawar Enterprises"
  },
  vendor_supplier: {
    label: "Vendor / Supplier Letter",
    hint: "Request rates, material supply, delivery confirmation or vendor support.",
    subject: "Requirement / Supply Request – [Material / Service]",
    body: `Pawar Enterprises requires the following material / service for our project at [Project Location]:\n\nRequirement: [Material / Service Details]\nQuantity: [Quantity]\nSpecification / Brand: [Specification]\nRequired Delivery Date: [Date]\nDelivery Location: [Address]\n\nKindly share your best commercial offer including rate, taxes, transportation, payment terms, warranty (if applicable) and delivery commitment.\n\nPlease also confirm stock availability and expected dispatch schedule.`,
    salutation: "Dear Sir/Madam,",
    closing: "Regards,",
    designation: "Procurement, Pawar Enterprises"
  },
  authorization_letter: {
    label: "Authorization Letter",
    hint: "Authorize a named person to represent Pawar Enterprises for a specific purpose.",
    subject: "Authorization Letter for [Purpose]",
    body: `This is to authorize Mr./Ms. [Authorized Person Name], bearing [ID / Employee ID, if applicable], to represent Pawar Enterprises for the purpose of [Purpose].\n\nThe authorized person is permitted to [Specific Authorized Actions] in connection with [Project / Client / Department] from [Start Date] until [End Date / Completion of Purpose].\n\nThis authorization is limited to the purpose stated above and does not extend to commitments outside the approved scope without written approval from Pawar Enterprises.\n\nKindly extend the necessary cooperation to the authorized representative.`,
    salutation: "To Whom It May Concern,",
    closing: "For Pawar Enterprises,",
    designation: "Authorized Signatory"
  },
  noc: {
    label: "No Objection Certificate (NOC)",
    hint: "Issue a general no-objection confirmation for a defined purpose.",
    subject: "No Objection Certificate – [Purpose]",
    body: `This is to certify that Pawar Enterprises has no objection to [Person / Organization Name] for [Purpose / Activity], subject to the applicable terms, permissions and legal requirements.\n\nReference / Project: [Reference]\nLocation: [Location]\nValidity / Period: [Period]\n\nThis NOC is issued upon request for the stated purpose only. It shall not be interpreted as approval for any activity beyond the scope described above.`,
    salutation: "To Whom It May Concern,",
    closing: "For Pawar Enterprises,",
    designation: "Authorized Signatory"
  },
  complaint_request: {
    label: "Complaint / Request Letter",
    hint: "Raise a professional complaint or formal request to a vendor, authority or service provider.",
    subject: "Request / Complaint Regarding [Issue]",
    body: `We wish to bring to your attention the following matter regarding [Issue / Service / Reference]:\n\n[Describe the issue clearly, including relevant dates, reference numbers and previous communication.]\n\nThe matter has affected [Project / Service / Business Operation] by [Impact]. We request you to kindly take the following action: [Requested Resolution].\n\nWe request resolution by [Expected Date], or an update on the action being taken. Relevant supporting documents can be provided if required.\n\nWe look forward to your prompt assistance.`,
    salutation: "Dear Sir/Madam,",
    closing: "Yours faithfully,",
    designation: "Authorized Signatory, Pawar Enterprises"
  },
  offer_letter: {
    label: "Offer Letter",
    hint: "Issue a basic employment offer with role, compensation and joining terms.",
    subject: "Offer of Employment – [Designation]",
    body: `We are pleased to offer you the position of [Designation] with Pawar Enterprises, subject to the terms stated in this letter and completion of joining formalities.\n\nDate of Joining: [Joining Date]\nWork Location: [Location]\nMonthly / Annual Compensation: ₹[Compensation]\nProbation, if applicable: [Probation Period]\nReporting To: [Reporting Manager / Role]\n\nYour duties will include responsibilities assigned for your role and any reasonable work related to company operations. You will be expected to maintain professional conduct, confidentiality and compliance with company policies.\n\nPlease confirm your acceptance of this offer by [Acceptance Date]. We look forward to welcoming you to Pawar Enterprises.`,
    salutation: "Dear [Candidate Name],",
    closing: "For Pawar Enterprises,",
    designation: "HR / Authorized Signatory"
  },
  appointment_letter: {
    label: "Appointment Letter",
    hint: "Confirm formal appointment after selection and acceptance.",
    subject: "Appointment as [Designation]",
    body: `With reference to your selection, we are pleased to appoint you as [Designation] with Pawar Enterprises effective from [Joining Date].\n\nWork Location: [Location]\nCompensation: ₹[Compensation]\nProbation: [Probation Period]\nWorking Hours: [Working Hours]\nReporting To: [Reporting Manager / Role]\n\nYour employment will be governed by the policies, attendance requirements, confidentiality obligations, performance expectations and lawful instructions of the company. Detailed role responsibilities may be communicated separately and may be updated according to business requirements.\n\nPlease sign / acknowledge this appointment as confirmation of your acceptance.`,
    salutation: "Dear [Employee Name],",
    closing: "For Pawar Enterprises,",
    designation: "HR / Authorized Signatory"
  },
  experience_letter: {
    label: "Experience Letter",
    hint: "Confirm an employee’s tenure, designation and work experience.",
    subject: "Experience Certificate – [Employee Name]",
    body: `This is to certify that Mr./Ms. [Employee Name] was associated with Pawar Enterprises from [Joining Date] to [Last Working Date] as [Designation].\n\nDuring the period of employment, the employee was involved in [Key Responsibilities / Department] and carried out assigned responsibilities as part of company operations.\n\nBased on our records, the employee’s conduct and professional association during the stated period were [Satisfactory / Good / As Applicable].\n\nWe wish [Employee Name] success in future endeavors.`,
    salutation: "To Whom It May Concern,",
    closing: "For Pawar Enterprises,",
    designation: "HR / Authorized Signatory"
  },
  salary_certificate: {
    label: "Salary Certificate",
    hint: "Certify an employee’s employment and salary for official use.",
    subject: "Salary Certificate – [Employee Name]",
    body: `This is to certify that Mr./Ms. [Employee Name], working with Pawar Enterprises as [Designation], has been employed with us since [Joining Date].\n\nAs per company records, the employee’s current gross monthly salary is ₹[Monthly Salary] ([Amount in Words] only), subject to applicable deductions and company policies.\n\nThis certificate is issued at the employee’s request for [Purpose – Bank / Loan / Visa / Personal Record] without any liability on the company beyond the facts stated above.`,
    salutation: "To Whom It May Concern,",
    closing: "For Pawar Enterprises,",
    designation: "HR / Authorized Signatory"
  },
  warning_letter: {
    label: "Warning Letter",
    hint: "Document a formal employee warning for conduct, attendance or performance.",
    subject: "Formal Warning Regarding [Issue]",
    body: `This letter serves as a formal warning regarding [Issue – Attendance / Conduct / Performance / Policy Violation].\n\nIt has been observed that [Describe the concern with relevant dates / incidents]. The matter has affected [Work / Team / Client / Operations] and requires immediate correction.\n\nYou are instructed to improve / rectify the issue by [Expected Action and Date]. Any repetition or failure to demonstrate required improvement may lead to further disciplinary action as per company policy and applicable terms of employment.\n\nYou may submit a written explanation, if any, by [Date].`,
    salutation: "Dear [Employee Name],",
    closing: "For Pawar Enterprises,",
    designation: "HR / Authorized Signatory"
  },
  relieving_letter: {
    label: "Relieving Letter",
    hint: "Confirm that an employee has been relieved from duties after separation.",
    subject: "Relieving Letter – [Employee Name]",
    body: `This is to confirm that Mr./Ms. [Employee Name], who worked with Pawar Enterprises as [Designation], has been relieved from duties effective [Last Working Date].\n\nThe employee was associated with the company from [Joining Date] to [Last Working Date]. The separation has been processed subject to completion of applicable handover, asset return, account settlement and other company formalities.\n\nWe thank [Employee Name] for the association with Pawar Enterprises and wish success in future endeavors.`,
    salutation: "Dear [Employee Name],",
    closing: "For Pawar Enterprises,",
    designation: "HR / Authorized Signatory"
  },
  leave_approval: {
    label: "Leave Approval Letter",
    hint: "Confirm approval of an employee’s requested leave period.",
    subject: "Leave Approval – [Employee Name]",
    body: `With reference to your leave request, your leave has been approved for the following period:\n\nLeave From: [Start Date]\nLeave To: [End Date]\nTotal Days: [Number of Days]\nReason: [Reason, if recorded]\n\nYou are requested to complete the necessary work handover before proceeding on leave and report back on [Rejoining Date]. Any change in the approved leave period should be communicated and approved in advance.`,
    salutation: "Dear [Employee Name],",
    closing: "Regards,",
    designation: "HR / Authorized Signatory"
  },
  general_business: {
    label: "General Business Letter",
    hint: "Professional all-purpose format for any business communication.",
    subject: "Regarding [Topic / Reference]",
    body: `We are writing with reference to [Topic / Previous Communication / Project].\n\n[Write the main purpose of the letter here. Include the relevant facts, dates, amounts, project details or action required.]\n\nWe request / confirm that [Required Action / Decision / Next Step]. Kindly acknowledge this communication and let us know if any additional information or document is required from our side.\n\nThank you for your cooperation and continued association with Pawar Enterprises.`,
    salutation: "Dear Sir/Madam,",
    closing: "Yours faithfully,",
    designation: "Authorized Signatory, Pawar Enterprises"
  }
};

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

  const template = templates[fields.templateSelect.value] || templates.custom;
  $("templateHint").textContent = template.hint;
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

function applyTemplate(templateKey) {
  const template = templates[templateKey] || templates.custom;
  fields.subject.value = template.subject || "";
  fields.salutation.value = template.salutation || "Dear Sir/Madam,";
  fields.bodyText.value = template.body || "";
  fields.closing.value = template.closing || "Yours faithfully,";
  fields.signatoryName.value = "Authorized Signatory";
  fields.designation.value = template.designation || "Pawar Enterprises";
  fields.showSignatureLine.checked = true;
  render();
}

function freshLetter() {
  fields.templateSelect.value = "custom";
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

Object.entries(fields).forEach(([key, field]) => {
  if (key === "templateSelect") return;
  field.addEventListener("input", render);
  field.addEventListener("change", render);
});

fields.templateSelect.addEventListener("change", () => {
  const chosen = fields.templateSelect.value;
  const hasContent = fields.subject.value.trim() || fields.bodyText.value.trim();
  if (hasContent && chosen !== "custom") {
    const ok = window.confirm("Load this template? Current subject and letter body will be replaced.");
    if (!ok) {
      fields.templateSelect.value = "custom";
      render();
      return;
    }
  }
  applyTemplate(chosen);
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
  if (!templates[fields.templateSelect.value]) fields.templateSelect.value = "custom";
  if (!fields.letterNo.value) fields.letterNo.value = makeLetterNumber();
  if (!fields.letterDate.value) setToday();
  render();
}
