const currentPage = document.body.dataset.page || "home";

const navItems = [
  ["index.html", "Home", "home"],
  ["about.html", "Our Story", "about"],
  ["what-we-do.html", "What We Do", "what"],
  ["services.html", "Services", "services"],
  ["why-us.html", "Why Us", "why"],
  ["connect-events.html", "Ntuthuko Connects", "connect"],
  ["blogs-news.html", "Insights", "blogs"],
  ["case-studies.html", "Case Studies", "case-studies"],
  ["contact.html", "Contact Us", "contact"],
];

const socialLinks = [
  ["LinkedIn", "https://www.linkedin.com/search/results/all/?keywords=Ntuthuko%20Biz%20Connect", "M6 9v9M6 6.5v.1M10 18v-5c0-2 1.2-3.5 3.2-3.5S17 10.8 17 13v5M10 10v8"],
  ["Facebook", "https://www.facebook.com/profile.php?id=61552502910713", "M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9c0-.7.3-1 1-1Z"],
  ["Instagram", "https://www.instagram.com/ntuthuko_connects/", "M4 9c0-3 2-5 5-5h6c3 0 5 2 5 5v6c0 3-2 5-5 5H9c-3 0-5-2-5-5V9Zm8 6.2A3.2 3.2 0 1 0 12 8.8a3.2 3.2 0 0 0 0 6.4Zm5.1-7.8h.01"],
  ["TikTok", "https://www.tiktok.com/search?q=Ntuthuko%20Biz%20Connect", "M14 4v10.2a4.2 4.2 0 1 1-3.6-4.2M14 4c.6 2.5 2 4 4.5 4.6"],
  ["YouTube", "https://www.youtube.com/results?search_query=Ntuthuko+Biz+Connect", "M4 8.5c0-1.5 1-2.5 2.5-2.7 3.7-.4 7.3-.4 11 0C19 6 20 7 20 8.5v7c0 1.5-1 2.5-2.5 2.7-3.7.4-7.3.4-11 0C5 18 4 17 4 15.5v-7Zm7 1.5v4.5l4-2.3-4-2.2Z"],
  ["WhatsApp", "https://wa.me/27610503504", "M20 11.7a8 8 0 0 1-11.8 7L4 20l1.3-4.1A8 8 0 1 1 20 11.7ZM9 8.5c.5 2.8 2.2 4.5 5 5"],
  ["Google Business", "https://www.google.com/search?q=Ntuthuko+Biz+Connect", "M20 11.2v1.5A8 8 0 1 1 17.7 7M12 12h8"],
  ["Email", "mailto:support@ntuthukobiz.co.za", "M4 6h16v12H4V6Zm1.5 2 6.5 5 6.5-5"],
];

function socialMarkup(className = "social-links") {
  return `<div class="${className}" aria-label="Ntuthuko Biz Connect social links">
    ${socialLinks.map(([label, href, path]) => `<a href="${href}" aria-label="${label}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg></a>`).join("")}
  </div>`;
}

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
          <p>We help South African entrepreneurs understand where their business is, what is holding it back, and what practical step comes next.</p>
          ${socialMarkup()}
        </div>
        <div class="footer-col"><h3>Company</h3><a href="index.html">Home</a><a href="about.html">Our Story</a><a href="why-us.html">Why Us</a><a href="case-studies.html">Case Studies</a></div>
        <div class="footer-col"><h3>Lifecycle</h3><a href="what-we-do.html">What We Do</a><a href="services.html">Services</a><a href="connect-events.html">Ntuthuko Connects</a><a href="forms.html">Client Intake Forms</a></div>
        <div class="footer-col"><h3>Contact</h3><a href="mailto:hello@ntuthukobiz.co.za">hello@ntuthukobiz.co.za</a><a href="mailto:support@ntuthukobiz.co.za">support@ntuthukobiz.co.za</a><a href="mailto:accounts@ntuthukobiz.co.za">accounts@ntuthukobiz.co.za</a><a href="mailto:events@ntuthukobiz.co.za">events@ntuthukobiz.co.za</a></div>
        <div class="footer-col"><h3>Legal</h3><a href="privacy-policy.html">Privacy Policy</a><a href="popia-policy.html">POPIA Policy</a><a href="terms.html">Terms & Conditions</a><a href="disclaimers.html">Disclaimer</a><a href="cookie-policy.html">Cookie Policy</a></div>
      </div>
      <div class="footer-bottom">
        <div>061 050 3504 &middot; support@ntuthukobiz.co.za</div>
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

const motionAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (motionAllowed) {
  document.querySelectorAll(".card, .bundle-card, .blog-card, .case-card, .value-card, .industry-card, .programme-card, .service-card, .offer-main, .offer-side, .readiness-card").forEach(element => {
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

  document.querySelectorAll("main section, .card, .bundle-card, .blog-card, .case-card, .value-card, .industry-card").forEach(element => {
    element.classList.add("reveal");
    revealObserver.observe(element);
  });
}
