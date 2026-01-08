const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  message.textContent = "Logging in...";
  message.style.color = "#555";

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost/backend/api/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!data.success) {
      message.textContent = data.message;
      message.style.color = "red";
      return;
    }

    message.textContent = "Login successful 🎉";
    message.style.color = "green";

    // optional: store user
    localStorage.setItem("user", JSON.stringify(data.user));

    setTimeout(() => {
      window.location.href = "/"; // home page
    }, 1000);

  } catch (err) {
    message.textContent = "Server error — try again";
    message.style.color = "red";
  }
});
