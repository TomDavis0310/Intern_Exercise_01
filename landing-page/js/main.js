document.addEventListener("DOMContentLoaded", function () {
  // ===== Smooth scroll =====
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // ===== Image Lazy Loading =====
  const lazyImages = document.querySelectorAll(".lazy-img");

  const imageObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        const img = entry.target;
        const realSrc = img.getAttribute("data-src");

        if (realSrc) {
          img.setAttribute("src", realSrc);
        }

        img.addEventListener("load", function () {
          img.classList.add("loaded");
        });

        observer.unobserve(img);
      });
    },
    {
      threshold: 0.1,
    },
  );

  lazyImages.forEach(function (img) {
    imageObserver.observe(img);
  });

  // ===== Scroll animation =====
  const sections = document.querySelectorAll("main section");

  sections.forEach(function (section) {
    section.classList.add("fade-section");
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.4,
    },
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });

  // ===== Form validation =====
  const form = document.querySelector("#contactForm");
  // Input elements will be resolved from the submit event (e.target)

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function showError(input, errorElement, message) {
    if (input) input.classList.add("error");
    if (errorElement) errorElement.textContent = message;
  }

  function clearError(input, errorElement) {
    if (input) input.classList.remove("error");
    if (errorElement) errorElement.textContent = "";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formEl = e.target;

    // Lấy giá trị từ FormData (theo yêu cầu: lấy giá trị form)
    const formData = new FormData(formEl);
    const emailValue = (formData.get("email") || "").trim();
    const phoneValue = (formData.get("phone") || "").trim();
    const addressValue = (formData.get("address") || "").trim();

    // Lấy phần tử DOM để thao tác UI theo id
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const address = document.getElementById("address");

    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");
    const addressError = document.getElementById("addressError");

    // Clear UI errors trước khi validate
    clearError(email, emailError);
    clearError(phone, phoneError);
    clearError(address, addressError);

    let isValid = true;

    if (emailValue === "") {
      showError(email, emailError, "Email không được để trống");
      isValid = false;
    } else if (!isValidEmail(emailValue)) {
      showError(email, emailError, "Email không hợp lệ");
      isValid = false;
    }

    if (phoneValue === "") {
      showError(phone, phoneError, "Số điện thoại không được để trống");
      isValid = false;
    } else if (!/^\d+$/.test(phoneValue)) {
      showError(phone, phoneError, "Số điện thoại phải là số");
      isValid = false;
    } else if (phoneValue.length < 10) {
      showError(phone, phoneError, "Số điện thoại phải có ít nhất 10 số");
      isValid = false;
    }

    if (addressValue === "") {
      showError(address, addressError, "Địa chỉ không được để trống");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    alert("Gửi thành công!");
    formEl.reset();
  });
  // =========== Theme toggle ===========
  const themeToggle = document.querySelector("#themeToggle");

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
});
