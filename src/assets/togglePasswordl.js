console.log("hi");
let togglePassword = document.querySelector("#togglePassword");
let password = document.querySelector("#password");

togglePassword.addEventListener("click", function () {
    // toggle the type attribute
    let type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    
    // toggle the icon
    this.classList.toggle("fa-eye");
});
