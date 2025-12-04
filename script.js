function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

function showMessage() {
    document.getElementById("message").textContent =
        "Thanks for reaching out! We'll get back to you soon.";
}