// ---- Edit these: WhatsApp number (international format, no +) and your email ----
window.ODMVILLE = {
  whatsapp: "2348132263555",
  email: "geetrendpromotions@gmail.com",
};

const logoPreload = document.createElement("link");
logoPreload.rel = "preload";
logoPreload.as = "image";
logoPreload.href = "images/odm-ville-logo.webp";
logoPreload.fetchPriority = "high";
document.head.append(logoPreload);

document.addEventListener("DOMContentLoaded", () => {
  [{ sizes: "32x32" }, { sizes: "16x16" }].forEach(({ sizes }) => {
    const icon = document.createElement("link");
    icon.rel = "icon";
    icon.type = "image/png";
    icon.sizes = sizes;
    icon.href = "images/favicon.png";
    document.head.append(icon);
  });

  document.querySelectorAll("a.logo").forEach((logo) => {
    const image = document.createElement("img");
    image.src = "images/odm-ville-logo.webp";
    image.alt = "ODM Ville";
    image.width = 400;
    image.height = 200;
    image.decoding = "async";
    image.fetchPriority = "high";
    logo.setAttribute("aria-label", "ODM Ville home");
    logo.replaceChildren(image);
  });

  const duplicateBrandName = "ODM Ville · ODM Ville";
  const textWalker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (node.parentElement.closest("a, script, style, textarea")) {
          return NodeFilter.FILTER_REJECT;
        }
        return node.nodeValue.includes(duplicateBrandName)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    },
  );
  const duplicateBrandNodes = [];
  while (textWalker.nextNode())
    duplicateBrandNodes.push(textWalker.currentNode);

  duplicateBrandNodes.forEach((node) => {
    const fragment = document.createDocumentFragment();
    node.nodeValue.split(duplicateBrandName).forEach((part, index) => {
      if (index > 0) {
        const link = document.createElement("a");
        link.className = "brand-mark";
        link.href = "index.html";
        link.setAttribute("aria-label", "ODM Ville home");
        const image = document.createElement("img");
        image.src = "images/odm-ville-logo.webp";
        image.alt = "ODM Ville";
        image.width = 400;
        image.height = 200;
        image.decoding = "async";
        image.fetchPriority = "high";
        link.append(image);
        fragment.append(link);
        fragment.append(" · ODM Ville");
      }
      fragment.append(part);
    });
    node.replaceWith(fragment);
  });

  document.querySelectorAll("[data-wa]").forEach((a) => {
    a.href =
      "https://wa.me/" +
      ODMVILLE.whatsapp +
      "?text=" +
      encodeURIComponent(a.dataset.wa);
    a.target = "_blank";
    a.rel = "noopener";
  });

  document.querySelectorAll("footer .social-links").forEach((socialLinks) => {
    const whatsappLink = socialLinks.parentElement.querySelector(
      "a[data-wa]:not(.social-link)",
    );
    if (!whatsappLink) return;
    whatsappLink.classList.add("social-link");
    whatsappLink.setAttribute("aria-label", "WhatsApp");
    whatsappLink.replaceChildren();
    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("viewBox", "0 0 24 24");
    icon.setAttribute("aria-hidden", "true");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 2a8 8 0 0 1 0 16 8 8 0 0 1-4.1-1.1l-.5-.3-3 .8.8-2.9-.3-.5A8 8 0 1 1 12 4zm4.4 10.8c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.7-.7.8-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.1 7.1 0 0 1-1.3-1.6c-.1-.2 0-.3.1-.4l.4-.4.2-.4v-.4c0-.1-.5-1.3-.7-1.8-.2-.4-.4-.4-.5-.4h-.4c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 2s.8 2.3.9 2.5c.1.2 1.6 2.5 3.8 3.5.5.2.9.4 1.3.5.5.2 1 .1 1.4.1.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1 0-.1-.2-.2-.4-.3z",
    );
    icon.append(path);
    whatsappLink.append(icon);
    socialLinks.append(whatsappLink);
  });

  const f = document.getElementById("enquiry");
  if (!f) return;
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("fmsg").replaceChildren();
    if (f.website.value) return; // honeypot
    let ok = true;
    f.querySelectorAll("[required]").forEach((i) => {
      const m = i.closest("div").querySelector(".err");
      let bad = !i.value.trim();
      if (i.type === "email" && i.value && !/^\S+@\S+\.\S+$/.test(i.value))
        bad = true;
      m.textContent = bad ? "Please fill in this field correctly." : "";
      if (bad) ok = false;
    });
    if (!ok) return;
    const d = Object.fromEntries(new FormData(f));
    const msg = `New enquiry for ODM Ville\nName: ${d.name}\nCompany: ${d.company || "-"}\nEmail: ${d.email}\nPhone: ${d.phone}\nService: ${d.service}\nBudget: ${d.budget || "-"}\nProject: ${d.details}`;
    const whatsappUrl =
      "https://wa.me/" + ODMVILLE.whatsapp + "?text=" + encodeURIComponent(msg);
    const whatsappLink = document.createElement("a");
    whatsappLink.href = whatsappUrl;
    whatsappLink.target = "_blank";
    whatsappLink.rel = "noopener";
    whatsappLink.textContent = "WhatsApp";

    const emailLink = document.createElement("a");
    emailLink.href =
      "mailto:" +
      ODMVILLE.email +
      "?subject=" +
      encodeURIComponent("Enquiry: " + d.service) +
      "&body=" +
      encodeURIComponent(msg);
    emailLink.textContent = "email";

    const status = document.getElementById("fmsg");
    status.replaceChildren(
      document.createTextNode("Your enquiry is ready. Continue to "),
      whatsappLink,
      document.createTextNode(" to send it, or use "),
      emailLink,
      document.createTextNode("."),
    );
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-campaign-track]").forEach((track) => {
    const group = track.querySelector(".campaign-track__group");
    if (!group) return;
    const duplicate = group.cloneNode(true);
    duplicate.classList.add("campaign-track__duplicate");
    duplicate.setAttribute("aria-hidden", "true");
    duplicate.querySelectorAll("img").forEach((image) => (image.alt = ""));
    track.append(duplicate);
    track.classList.add("is-looping");
  });

  const b = document.querySelector(".burger"),
    u = document.querySelector("header nav ul");
  b &&
    b.addEventListener("click", () => {
      const o = u.classList.toggle("open");
      b.setAttribute("aria-expanded", o);
    });
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.1 },
  );
  document
    .querySelectorAll(
      "main section h2,.card,.stile,.tile,.steps li,.stats>div,.split>*,.phead .wrap",
    )
    .forEach((e) => {
      e.classList.add("rv");
      io.observe(e);
    });
  document
    .querySelectorAll(".yr")
    .forEach((e) => (e.textContent = new Date().getFullYear()));

  const carousel = document.querySelector(".photo-carousel");
  if (carousel) {
    const dots = carousel.querySelector(".photo-dots");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let slides = Array.from(carousel.querySelectorAll(".photo-slide"));
    let activeIndex = Math.max(
      slides.findIndex((slide) => slide.classList.contains("is-active")),
      0,
    );
    let timer;

    const render = () => {
      slides.forEach((slide, index) => {
        const active = index === activeIndex;
        slide.classList.toggle("is-active", active);
        const button = dots.children[index];
        button.setAttribute("aria-pressed", active);
      });
    };

    const show = (index) => {
      activeIndex = index;
      render();
    };

    const start = () => {
      clearInterval(timer);
      if (
        slides.length > 1 &&
        !reducedMotion.matches &&
        !carousel.matches(":hover") &&
        !carousel.contains(document.activeElement)
      ) {
        timer = setInterval(
          () => show((activeIndex + 1) % slides.length),
          5000,
        );
      }
    };

    const buildDots = () => {
      dots.replaceChildren(
        ...slides.map((slide, index) => {
          const button = document.createElement("button");
          button.type = "button";
          button.setAttribute("aria-label", `Show photo ${index + 1}`);
          button.setAttribute("aria-pressed", "false");
          button.addEventListener("click", () => {
            show(index);
            start();
          });
          return button;
        }),
      );
      if (slides.length < 2) dots.hidden = true;
      render();
    };

    carousel.addEventListener(
      "error",
      (event) => {
        if (!(event.target instanceof HTMLImageElement)) return;
        if (event.target.hasAttribute("data-placeholder")) return;
        const failedSlide = event.target.closest(".photo-slide");
        const failedIndex = slides.indexOf(failedSlide);
        if (failedIndex < 0) return;
        failedSlide.remove();
        slides = Array.from(carousel.querySelectorAll(".photo-slide"));
        if (failedIndex < activeIndex) activeIndex--;
        if (activeIndex >= slides.length) activeIndex = 0;
        buildDots();
        start();
      },
      true,
    );

    carousel.addEventListener("mouseenter", () => clearInterval(timer));
    carousel.addEventListener("mouseleave", start);
    carousel.addEventListener("focusin", () => clearInterval(timer));
    carousel.addEventListener("focusout", (event) => {
      if (!carousel.contains(event.relatedTarget)) start();
    });
    reducedMotion.addEventListener("change", start);
    buildDots();
    start();
  }
});
