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

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const emailValue = email.value.trim();
        const phoneValue = phone.value.trim();
        const addressValue = address.value.trim();

        if (emailValue === "" || !isValidEmail(emailValue)) {
        let msg = "";

        if (emailValue === "") {
            msg = "Email không được để trống";
        } else {
            msg = "Email không hợp lệ";
        }

        alert(msg);
        return;
        }

        if (phoneValue === "" || phoneValue.length < 10 || !/^\d+$/.test(phoneValue)) {
        let msg = "";

        if (phoneValue === "") {
            msg = "Số điện thoại không được để trống";
        } else if (!/^\d+$/.test(phoneValue)) {
            msg = "Số điện thoại phải là số";
        } else {
            msg = "Số điện thoại phải có ít nhất 10 số";
        }

        alert(msg);
        return;
        }

        if (addressValue === "") {
        alert("Địa chỉ không được để trống");
        return;
        }

        alert("Gửi thành công!");
        form.reset();
    });

        const themeToggle = document.querySelector("#themeToggle");

        themeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {
            themeToggle.textContent = "Light Mode";
            } else {
            themeToggle.textContent = "Dark Mode";
            }
        });

});