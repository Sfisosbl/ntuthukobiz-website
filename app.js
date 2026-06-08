const currentPage = document.body.dataset.page || "home";

const navItems = [
  ["index.html", "Home", "home"],
  ["about.html", "About", "about"],
  ["what-we-do.html", "What We Do", "what"],
  ["services.html", "Services", "services"],
  ["bundles.html", "Bundles", "bundles"],
  ["blogs-news.html", "Insights", "blogs"],
  ["faq.html", "FAQ", "faq"],
  ["testimonials.html", "Stories", "testimonials"]
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
        </div>
        <div class="footer-col"><h3>Company</h3><a href="index.html">Home</a><a href="about.html">About Us</a><a href="why-us.html">Why Us</a><a href="testimonials.html">Client Stories</a></div>
        <div class="footer-col"><h3>Services</h3><a href="what-we-do.html">What We Do</a><a href="services.html">Our Services</a><a href="bundles.html">Bundles</a><a href="connect-events.html">Connect & Events</a></div>
        <div class="footer-col"><h3>Resources</h3><a href="blogs-news.html">Blogs & News</a><a href="faq.html">FAQs</a><a href="vacancies.html">Vacancies</a><a href="contact.html">Contact Us</a></div>
        <div class="footer-col"><h3>Legal</h3><a href="privacy-policy.html">Privacy Policy</a><a href="terms.html">Terms & Conditions</a><a href="disclaimers.html">Disclaimers</a></div>
      </div>
      <div class="footer-bottom">
        <div>hello@ntuthukobiz.co.za &middot; 061 050 3504</div>
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
    window.location.href = `mailto:hello@ntuthukobiz.co.za?subject=${subject}&body=${body}`;
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

