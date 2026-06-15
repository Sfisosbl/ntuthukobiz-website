const currentPage = document.body.dataset.page || "home";

const navItems = [
  ["index.html", "Home", "home"],
  ["about.html", "About", "about"],
  ["what-we-do.html", "What We Do", "what"],
  ["services.html", "Services", "services"],
  ["bundles.html", "Bundles", "bundles"],
  ["blogs-news.html", "Insights", "blogs"],
  ["faq.html", "FAQ", "faq"],
  ["connect-events.html", "Ntuthuko Connects", "connect"]
];

const header = `
  <header class="site-header">
    <div class="container nav">
      <a class="brand" href="index.html" aria-label="Ntuthuko Biz Connect home">
        <img class="brand-logo" src="assets/brand/logo-transparent.png" alt="Ntuthuko Biz Connect">
      </a>
      <nav class="nav-links" id="main-nav" aria-label="Main navigation">
        ${navItems.map(([href, label, key]) => `<a href="${href}" class="${currentPage === key ? "active" : ""}">${label}</a>`).join("")}
        <a class="btn" href="contact.html">Let's talk <span class="arrow">&nearr;</span></a>
      </nav>
      <button class="nav-toggle" aria-label="Open menu" aria-controls="main-nav" aria-expanded="false"><span></span><span></span></button>
    </div>
  </header>`;

const footer = `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <a class="brand" href="index.html">
            <img class="brand-logo" src="assets/brand/logo-transparent.png" alt="Ntuthuko Biz Connect">
          </a>
          <p>Practical business support for South African entrepreneurs who are ready to build properly and grow sustainably.</p>
          <div class="social-links" aria-label="Contact and social links">
            <a href="https://www.ntuthukobiz.co.za/" aria-label="Ntuthuko Biz Connect website"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4c2.3 2.2 3.5 4.9 3.5 8S14.3 17.8 12 20c-2.3-2.2-3.5-4.9-3.5-8S9.7 6.2 12 4Z"/></svg></a>
            <a href="https://www.google.com/search?q=Ntuthuko+Biz+Connect" aria-label="Find Ntuthuko Biz Connect on Google"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.2v1.5A8 8 0 1 1 17.7 7"/><path d="M12 12h8"/></svg></a>
            <a href="https://www.facebook.com/profile.php?id=61552502910713" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9c0-.7.3-1 1-1Z"/></svg></a>
            <a href="https://www.instagram.com/ntuthuko_connects/" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.5"/><path d="M17.5 6.5h.01"/></svg></a>
            <a href="https://www.linkedin.com/search/results/all/?keywords=Ntuthuko%20Biz%20Connect" aria-label="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9v9M6 6.5v.1M10 18v-5c0-2 1.2-3.5 3.2-3.5S17 10.8 17 13v5M10 10v8"/></svg></a>
            <a href="https://x.com/" aria-label="X"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 4 14 16M19 4 5 20"/></svg></a>
            <a href="https://wa.me/27610503504" aria-label="WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.7a8 8 0 0 1-11.8 7L4 20l1.3-4.1A8 8 0 1 1 20 11.7Z"/><path d="M9 8.5c.5 2.8 2.2 4.5 5 5"/></svg></a>
          </div>
        </div>
        <div class="footer-col"><h3>Company</h3><a href="index.html">Home</a><a href="about.html">About Us</a><a href="why-us.html">Why Us</a><a href="testimonials.html">Sample Stories</a></div>
        <div class="footer-col"><h3>Services</h3><a href="what-we-do.html">What We Do</a><a href="services.html">Our Services</a><a href="bundles.html">Bundles</a><a href="connect-events.html">Ntuthuko Connects</a></div>
        <div class="footer-col"><h3>Resources</h3><a href="blogs-news.html">Blogs & News</a><a href="faq.html">FAQs</a><a href="forms.html">Client Intake Forms</a><a href="vacancies.html">Vacancies</a><a href="contact.html">Contact Us</a></div>
        <div class="footer-col"><h3>Legal</h3><a href="privacy-policy.html">Privacy Policy</a><a href="terms.html">Terms & Conditions</a><a href="disclaimers.html">Disclaimers</a></div>
      </div>
      <div class="footer-bottom">
        <div>support@ntuthukobiz.co.za &middot; 061 050 3504</div>
        <span>&copy; ${new Date().getFullYear()} Ntuthuko Biz Connect. South Africa.</span>
      </div>
    </div>
  </footer>
  <a class="whatsapp-float" href="https://wa.me/27610503504" aria-label="Talk to us on WhatsApp">WA</a>`;

document.getElementById("site-header").innerHTML = header;
document.getElementById("site-footer").innerHTML = footer;

const siteHeader = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav-links");

window.addEventListener("scroll", () => siteHeader.classList.toggle("scrolled", window.scrollY > 20));
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  document.body.classList.toggle("menu-open", open);
  toggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".service-card").forEach(card => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

const contactForm = document.querySelector("[data-contact-form]");
if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const subject = encodeURIComponent(`Website enquiry: ${data.get("category")}`);
    const body = encodeURIComponent(`Name: ${data.get("name")}\nPhone: ${data.get("phone")}\n\n${data.get("message")}`);
    window.location.href = `mailto:support@ntuthukobiz.co.za?subject=${subject}&body=${body}`;
  });
}

const programmeForm = document.querySelector("[data-programme-form]");
if (programmeForm) {
  const programmeField = programmeForm.querySelector("[name='programme']");
  const requestedProgramme = new URLSearchParams(window.location.search).get("programme");
  if (requestedProgramme && programmeField) programmeField.value = requestedProgramme;

  programmeForm.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(programmeForm);
    const subject = encodeURIComponent(`Programme registration: ${data.get("programme")}`);
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nBusiness: ${data.get("business")}\nPhone: ${data.get("phone")}\nEmail: ${data.get("email")}\nProvince: ${data.get("province")}\nProgramme: ${data.get("programme")}\n\nGoals and support needed:\n${data.get("message")}`
    );
    window.location.href = `mailto:support@ntuthukobiz.co.za?subject=${subject}&body=${body}`;
  });
}

const motionAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (motionAllowed) {
  document.querySelectorAll(".card, .bundle-card, .blog-card, .testimonial-card, .offer-main, .offer-side, .readiness-card").forEach(element => {
    element.classList.add("motion-surface");
    element.addEventListener("pointermove", event => {
      const rect = element.getBoundingClientRect();
      element.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      element.style.setProperty("--my", `${event.clientY - rect.top}px`);
    });
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });

  document.querySelectorAll("main section, .card, .bundle-card, .blog-card, .testimonial-card").forEach(element => {
    element.classList.add("reveal");
    revealObserver.observe(element);
  });
}

