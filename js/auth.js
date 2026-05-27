document.addEventListener("DOMContentLoaded", function () {
  const protectedPages = [
    "",
    "index.html",
    "packages.html",
    "booking.html",
    "contact.html"
  ];

  const currentPage = window.location.pathname.split("/").pop();

  if (protectedPages.includes(currentPage)) {
    const loggedIn = localStorage.getItem("travelUserLoggedIn");

    if (!loggedIn) {
      window.location.href = "auth.html";
    }
  }
});
