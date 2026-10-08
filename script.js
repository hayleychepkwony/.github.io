/* ------------------------------------------------------------------
   EDIT YOUR PROJECTS HERE.
   Each project follows: Objective → Approach → Tools → Results → Deliverable
   `kind` should always say honestly what the work was
   (e.g. "Personal project", "Lab environment", "Sample deliverable").
   The text below is a starting draft: change it so it matches
   what you actually built and did.
------------------------------------------------------------------- */
const PROJECTS = [
  {
    title: "SafeSense — Phishing Detection System",
    kind: "Personal project",
    short: "A tool that checks emails and links for phishing signs and explains why something looks suspicious.",
    tags: ["Phishing", "Email security", "Web app"],
    note: "Personal build, not deployed for a client.",
    objective: "Help non-technical users decide whether an email or link is safe, and understand the reasons, instead of just getting a yes/no score.",
    approach: [
      "Listed the common warning signs: look-alike domains, mismatched sender and reply-to, urgent language, shortened links and unexpected attachments.",
      "Turned each sign into a check that adds to a simple risk rating.",
      "Wrote plain-language explanations so every flag tells the user what to look at.",
      "Tested against a set of sample phishing and legitimate messages and adjusted the checks."
    ],
    tools: ["HTML / CSS / JavaScript", "Python", "Sample email datasets", "Git & GitHub"],
    results: [
      "Working prototype that flags suspicious messages and lists the reasons.",
      "Clear risk levels (low / medium / high) that non-technical users can understand.",
      "Documented limitations, including what it cannot detect."
    ],
    deliverable: "Source code, a short user guide, and a one-page write-up of how the checks work."
  },
  {
    title: "Web Application Security Assessment",
    kind: "Lab environment",
    short: "A structured basic security review of a deliberately vulnerable practice app, with a findings report.",
    tags: ["Vulnerability assessment", "OWASP", "Reporting"],
    note: "Performed only on an intentionally vulnerable practice application in a lab, never on systems I don't have permission to test.",
    objective: "Practise a repeatable method for finding and reporting common web security weaknesses, and present the results so a non-specialist could act on them.",
    approach: [
      "Defined scope and rules of engagement before starting.",
      "Checked for common issues from the OWASP Top 10, such as input handling, authentication and session settings, and security headers.",
      "Recorded each finding with steps to reproduce, impact and a suggested fix.",
      "Ranked findings by severity so the most important fixes come first."
    ],
    tools: ["OWASP Top 10", "Browser developer tools", "Burp Suite Community", "Practice lab app"],
    results: [
      "A prioritised list of findings with plain-English explanations.",
      "Clear remediation guidance for each issue.",
      "A reusable assessment checklist for future work."
    ],
    deliverable: "Findings report (PDF) with an executive summary, detailed findings and a fix checklist."
  },
  {
    title: "Cybersecurity Research & Threat Analysis",
    kind: "Self-directed research",
    short: "Research briefs on current threats, written for business owners rather than security teams.",
    tags: ["Threat research", "Briefings", "Awareness"],
    note: "Based on publicly available sources, which are cited in each brief.",
    objective: "Turn technical threat information into short briefs that a small business owner can read in five minutes and act on.",
    approach: [
      "Selected a topic (for example a common phishing technique or a recent type of attack).",
      "Gathered information from reputable public sources and cross-checked claims.",
      "Summarised what happened, who is at risk and what simple steps reduce the risk.",
      "Added a short checklist at the end of each brief."
    ],
    tools: ["Public threat reports & advisories", "MITRE ATT&CK (reference)", "Notion / Google Docs", "Spreadsheet tracker"],
    results: [
      "Briefs with a consistent format: summary, risk, actions.",
      "Source list with each brief so claims can be verified.",
      "A tracker of topics, sources and dates."
    ],
    deliverable: "Sample threat briefs and a security-awareness one-pager."
  },
  {
    title: "Technical VA Research & Data Management",
    kind: "Sample deliverable",
    short: "A sample research task: compare tools, collect the data, and deliver a clean, checked spreadsheet.",
    tags: ["Research", "Spreadsheets", "Data entry"],
    note: "Sample task created to show my working process. Data is illustrative.",
    objective: "Show how I handle an open-ended research request, from vague question to organised, verified result.",
    approach: [
      "Clarified the question and the decision the research needed to support.",
      "Collected options and details from official sources and recorded where each came from.",
      "Built a structured spreadsheet with consistent columns, validation and a summary tab.",
      "Double-checked entries against sources before delivery."
    ],
    tools: ["Google Sheets / Excel", "Data validation & formulas", "Web research", "Source log"],
    results: [
      "A clean comparison sheet with a recommendation tab.",
      "Every figure traceable to a source.",
      "Reusable template for similar requests."
    ],
    deliverable: "Spreadsheet with comparison, summary and source log."
  },
  {
    title: "Business Operations & SOP Documentation",
    kind: "Sample deliverable",
    short: "Step-by-step procedures for everyday tasks, written so anyone can follow them without asking questions.",
    tags: ["SOPs", "Documentation", "Operations"],
    note: "Sample SOPs written for typical small-business processes.",
    objective: "Make recurring tasks easy to hand over by writing them down clearly, including the security steps that are often forgotten.",
    approach: [
      "Walked through each process and noted every step, decision and tool involved.",
      "Wrote numbered steps with screenshots or examples where useful.",
      "Added security checks, such as access, sharing settings and who to contact if something looks wrong.",
      "Tested each SOP by following it exactly as written."
    ],
    tools: ["Google Docs / Notion", "Screenshots & screen recording", "Flowchart tool", "Checklists"],
    results: [
      "SOPs that a new team member can follow on day one.",
      "Consistent template across all procedures.",
      "A short onboarding and offboarding checklist with access steps."
    ],
    deliverable: "SOP pack: onboarding, inbox triage, meeting notes and account-access checklist."
  }
];

/* ------------------------------------------------------------------ */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* Render project list */
const list = $('#projList');
PROJECTS.forEach((p, i) => {
  const b = document.createElement('button');
  b.className = 'proj reveal';
  b.type = 'button';
  b.setAttribute('aria-haspopup', 'dialog');
  b.innerHTML = `
    <span class="proj-n">${String(i + 1).padStart(2, '0')}</span>
    <span>
      <h3>${p.title}</h3>
      <p>${p.short}</p>
      <span class="tags"><span class="tag kind">${p.kind}</span>${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</span>
    </span>
    <span class="proj-arrow" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M2 8h12M9 3l5 5-5 5"/></svg></span>`;
  b.addEventListener('click', () => openCase(i));
  list.appendChild(b);
});

/* Case-study dialog */
const dlg = $('#dlg'), dlgBody = $('#dlgBody');
let lastFocus = null;

function openCase(i) {
  const p = PROJECTS[i];
  lastFocus = document.activeElement;
  dlgBody.innerHTML = `
    <article class="cs">
      <span class="tag kind">${p.kind}</span>
      <h2 id="dlgTitle">${p.title}</h2>
      <p class="intro">${p.short}</p>
      <p class="note"><b>Please note:</b> ${p.note}</p>
      <section class="cs-sec"><h4>Objective</h4><p>${p.objective}</p></section>
      <section class="cs-sec"><h4>Approach</h4><ul>${p.approach.map(x => `<li>${x}</li>`).join('')}</ul></section>
      <section class="cs-sec"><h4>Tools</h4><div class="chips">${p.tools.map(x => `<span>${x}</span>`).join('')}</div></section>
      <section class="cs-sec"><h4>Results</h4><ul>${p.results.map(x => `<li>${x}</li>`).join('')}</ul></section>
      <section class="cs-sec"><h4>Deliverable</h4><p>${p.deliverable}</p></section>
    </article>`;
  dlg.showModal();
  dlg.querySelector('.dlg-inner').scrollTop = 0;
  document.documentElement.style.overflow = 'hidden';
}
function closeCase() { dlg.close(); }
$('#dlgClose').addEventListener('click', closeCase);
dlg.addEventListener('click', e => { if (e.target === dlg) closeCase(); });
dlg.addEventListener('close', () => {
  document.documentElement.style.overflow = '';
  if (lastFocus) lastFocus.focus();
});

/* Nav: scrolled state + mobile menu */
const nav = $('#nav'), toggle = $('.nav-toggle'), links = $('#navlinks');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
$$('a', links).forEach(a => a.addEventListener('click', () => {
  links.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

/* Scroll reveal */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
$$('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (el.closest('.hero') ? i * 70 : 0) + 'ms';
  io.observe(el);
});

/* One quiet glitch on the name after load */
setTimeout(() => {
  const h = $('#name');
  h.classList.add('glitch');
  setTimeout(() => h.classList.remove('glitch'), 700);
}, 900);

/* Contact form: sends straight to your inbox via Web3Forms (free).
   1. Go to https://web3forms.com, enter hayleychepkwony@gmail.com, and they email you an Access Key.
   2. Paste that key below. (It is safe to be public; it can only send to your email.) */
const WEB3FORMS_KEY = 'a5ce87a5-db45-4854-9aa8-2fb538d30999';
const EMAIL = 'hayleychepkwony@gmail.com'; // fallback if the key is not set yet

$('#contactForm').addEventListener('submit', async e => {
  e.preventDefault();
  const f = e.target, note = $('#formNote'), btn = $('button[type=submit]', f);
  note.className = 'form-note';
  if (f.botcheck.value) return; // spam bot filled the hidden field

  let ok = true;
  ['name', 'email', 'message'].forEach(n => {
    const el = f.elements[n];
    const bad = !el.value.trim() || (n === 'email' && !/^\S+@\S+\.\S+$/.test(el.value));
    el.classList.toggle('bad', bad);
    if (bad) ok = false;
  });
  if (!ok) { note.textContent = 'Please fill in the highlighted fields.'; note.classList.add('err'); return; }

  // Fallback until the key is added: open the email app like before
  if (WEB3FORMS_KEY.startsWith('PASTE_')) {
    const subject = encodeURIComponent(`${f.topic.value} — enquiry from ${f.name.value}`);
    const body = encodeURIComponent(`${f.message.value}\n\n— ${f.name.value}\n${f.email.value}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    return;
  }

  const label = btn.textContent;
  btn.disabled = true; btn.textContent = 'Sending…';
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `Portfolio enquiry: ${f.topic.value} (${f.name.value})`,
        from_name: 'Portfolio website',
        name: f.name.value,
        email: f.email.value,
        topic: f.topic.value,
        message: f.message.value
      })
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed');
    f.reset();
    note.textContent = 'Thank you! Your message has been sent. I will reply within one business day.';
    note.classList.add('ok');
  } catch (err) {
    note.textContent = `Sorry, that didn't send. Please email me directly at ${EMAIL}.`;
    note.classList.add('err');
  } finally {
    btn.disabled = false; btn.textContent = label;
  }
});

$('#yr').textContent = new Date().getFullYear();
