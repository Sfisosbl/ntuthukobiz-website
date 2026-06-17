const intakeServices = window.NTUTHUKO_INTAKE_SERVICES || [];

function getService(slug) {
  return intakeServices.find(service => service.slug === slug);
}

function renderIntakeHub() {
  const list = document.querySelector("[data-intake-list]");
  if (!list) return;

  const search = document.querySelector("[data-intake-search]");
  const filters = document.querySelector("[data-intake-filters]");
  const categories = ["All", ...new Set(intakeServices.map(service => service.category))];
  let activeCategory = "All";

  filters.innerHTML = categories.map(category => `<button class="filter-btn${category === "All" ? " active" : ""}" type="button" data-category="${category}">${category}</button>`).join("");

  function paint() {
    const query = (search.value || "").trim().toLowerCase();
    const matches = intakeServices.filter(service => {
      const categoryMatch = activeCategory === "All" || service.category === activeCategory;
      const searchMatch = !query || `${service.name} ${service.category}`.toLowerCase().includes(query);
      return categoryMatch && searchMatch;
    });

    list.innerHTML = matches.map(service => `
      <article class="intake-service-card">
        <span>${service.category}</span>
        <h3>${service.name}</h3>
        <p>Tell us about your business, current position and the support you need.</p>
        <a class="card-link" href="intake-${service.slug}.html">Open secure intake form &rarr;</a>
      </article>`).join("") || `<p class="lead">No forms match that search. Try a broader service name.</p>`;
  }

  search.addEventListener("input", paint);
  filters.addEventListener("click", event => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    filters.querySelectorAll("button").forEach(item => item.classList.toggle("active", item === button));
    paint();
  });
  paint();
}

function renderServiceIntake() {
  const form = document.querySelector("[data-service-intake]");
  if (!form) return;

  const slug = document.body.dataset.service;
  const service = getService(slug);
  if (!service) {
    document.querySelector("[data-intake-shell]").innerHTML = `<div class="form-status error">This service form could not be found. Please return to the <a href="forms.html">client intake hub</a>.</div>`;
    return;
  }

  document.title = `${service.name} Client Intake | Ntuthuko Biz Connect`;
  document.querySelectorAll("[data-service-name]").forEach(node => { node.textContent = service.name; });
  document.querySelectorAll("[data-service-category]").forEach(node => { node.textContent = service.category; });
  document.querySelector("[data-doc-guidance]").textContent = service.docs;
  form.elements.service_slug.value = service.slug;
  form.elements.service_name.value = service.name;
  form.elements.service_category.value = service.category;

  form.addEventListener("submit", async event => {
    event.preventDefault();
    const status = document.querySelector("[data-form-status]");
    const submit = form.querySelector("[type='submit']");
    if (!form.reportValidity()) return;

    status.className = "form-status";
    status.textContent = "Submitting securely...";
    submit.disabled = true;

    try {
      const response = await fetch("/api/intake", { method: "POST", body: new FormData(form) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || "We could not save your form right now. Please try again, or contact support@ntuthukobiz.co.za.");
      form.reset();
      status.className = "form-status success";
      status.textContent = `Thank you. Your reference is ${result.reference}. Ntuthuko Biz Connect will review your information and contact you.`;
      status.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (error) {
      status.className = "form-status error";
      status.textContent = `${error.message} You can still contact support@ntuthukobiz.co.za or WhatsApp 061 050 3504.`;
    } finally {
      submit.disabled = false;
    }
  });
}

renderIntakeHub();
renderServiceIntake();
