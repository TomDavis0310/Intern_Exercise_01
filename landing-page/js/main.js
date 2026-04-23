document.addEventListener("DOMContentLoaded", function () {

    var sections = document.querySelectorAll("main section");
        sections.forEach(function (sec) {
            sec.classList.add("fade-section");
    });


    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, {
        threshold: 0.2
    });

    sections.forEach(function (sec) {
        observer.observe(sec);
    });


    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let address = document.getElementById("address");
    var btn = document.getElementById("btnSubmit");
    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    btn.addEventListener("click", function (e) {
        // e.preventDefault();
        

    if (email.value === "") {
        alert("Email không được để trống");
        return;
    }

    if (!isValidEmail(email.value)) {
        alert("Email không hợp lệ");
        return;
    }

    if (phone.value.length < 10) {
        alert("Số điện thoại phải có ít nhất 10 số");
        return;
    }

    if (!/^\d+$/.test(phone.value)) {
        alert("Số điện thoại phải là số");
        return;
    }
    if (phone.value === "") {
        alert("Số điện thoại không được để trống");
        return;
    }

    if (address.value === "") {
        alert("Địa chỉ không được để trống");
        return;
    }

    alert("Gửi thành công!");
    });
});