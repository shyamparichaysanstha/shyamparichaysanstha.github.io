(function () {
  "use strict";
  const phone = "919424446398";
  const menuButton = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");
  if (menuButton && menu) {
    menuButton.addEventListener("click", function () {
      const open = menu.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.textContent = open ? "✕" : "☰";
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "☰";
      });
    });
  }
  document.querySelectorAll(".faq-question").forEach(function (button) {
    button.addEventListener("click", function () {
      const item = button.closest(".faq-item");
      const open = item.classList.toggle("open");
      button.setAttribute("aria-expanded", String(open));
    });
  });
  function openWhatsApp(message) {
    window.open("https://wa.me/" + phone + "?text=" + encodeURIComponent(message), "_blank", "noopener");
  }
  document.querySelectorAll("[data-whatsapp-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const heading = form.getAttribute("data-message-heading") || "वेबसाइट से संदेश";
      const lines = ["*" + heading + "*"];
      data.forEach(function (value, key) {
        if (String(value).trim()) lines.push(key + ": " + String(value).trim());
      });
      lines.push("कृपया आगे की प्रक्रिया बताएं।");
      openWhatsApp(lines.join("\n"));
      const status = form.querySelector(".status-message");
      if (status) status.textContent = "WhatsApp खुल गया है। कृपया वहाँ Send दबाएँ और फोटो अलग से भेजें।";
    });
  });
  const consentKey = "shyam-sangam-analytics-consent";
  const banner = document.querySelector("[data-consent-banner]");
  function loadAnalytics() {
    if (document.querySelector('script[data-ga4="true"]')) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", "G-0M56FJPRWJ", { anonymize_ip: true });
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-0M56FJPRWJ";
    script.dataset.ga4 = "true";
    document.head.appendChild(script);
  }
  const consent = localStorage.getItem(consentKey);
  if (consent === "accepted") loadAnalytics();
  if (!consent && banner) banner.classList.add("show");
  document.querySelectorAll("[data-consent]").forEach(function (button) {
    button.addEventListener("click", function () {
      const value = button.getAttribute("data-consent");
      localStorage.setItem(consentKey, value);
      if (banner) banner.classList.remove("show");
      if (value === "accepted") loadAnalytics();
    });
  });
})();
