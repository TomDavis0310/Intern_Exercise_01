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
            block: "start"
            });
        }
        });
    });

    // ===== Image Lazy Loading =====
    const lazyImages = document.querySelectorAll(".lazy-img");

    const imageObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
        const img = entry.target;

        img.classList.add("loaded");

        observer.unobserve(img);
        }
    });
    }, {
    threshold: 0.1
    });

    lazyImages.forEach(function (img) {
    imageObserver.observe(img);
    });

    // ===== Scroll animation =====
    const sections = document.querySelectorAll("main section");

    sections.forEach(function (section) {
        section.classList.add("fade-section");
    });

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
        });
    }, {
        threshold: 0.2
    });

    sections.forEach(function (section) {
        observer.observe(section);
    });

    // ===== Form validation =====
    const form = document.querySelector("#contactForm");
    const email = document.querySelector("#email");
    const phone = document.querySelector("#phone");
    const address = document.querySelector("#address");

    const emailError = document.querySelector("#emailError");
    const phoneError = document.querySelector("#phoneError");
    const addressError = document.querySelector("#addressError");

    function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function showError(input, errorElement, message) {
    input.classList.add("error");
    errorElement.textContent = message;
    }

    function clearError(input, errorElement) {
    input.classList.remove("error");
    errorElement.textContent = "";
    }

    form.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const addressValue = address.value.trim();

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

    if (!isValid) return;

    alert("Gửi thành công!");
    form.reset();
    });

        const themeToggle = document.querySelector("#themeToggle");

        themeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {
            themeToggle.textContent = "\u2600\uFE0F" ;
            } else {
            themeToggle.textContent = "\u{1F319}";
            }
        });

});