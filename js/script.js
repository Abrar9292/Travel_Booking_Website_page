document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".travel-filter-btn");
  const travelItems = document.querySelectorAll(".travel-item");
  const bookingForm = document.getElementById("bookingForm");
  const contactForm = document.getElementById("contactForm");
  const searchInput = document.getElementById("travelSearch");
  const themeToggle = document.getElementById("themeToggle");
  const backToTop = document.getElementById("backToTop");

  setTimeout(() => {
    const preloader = document.getElementById("preloader");
    if (preloader) preloader.style.display = "none";
  }, 700);

  function showToast(message) {
    const toastBox = document.getElementById("toastBox");
    if (!toastBox) return;

    const toast = document.createElement("div");
    toast.className = "custom-toast";
    toast.innerText = message;
    toastBox.appendChild(toast);

    setTimeout(() => toast.remove(), 2500);
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      travelItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");

        if (filterValue === "all" || filterValue === itemCategory) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  if (searchInput) {
    searchInput.addEventListener("keyup", function () {
      const value = searchInput.value.toLowerCase();

      travelItems.forEach((item) => {
        const title = item.querySelector("h5").innerText.toLowerCase();

        if (title.includes(value)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  }

  document.querySelectorAll(".destination-card").forEach((card) => {
    if (!card.querySelector(".wishlist-btn")) {
      const wishBtn = document.createElement("button");
      wishBtn.className = "wishlist-btn";
      wishBtn.innerHTML = `<i class="fa-regular fa-heart"></i>`;
      card.appendChild(wishBtn);

      wishBtn.addEventListener("click", function () {
        wishBtn.classList.toggle("active");

        if (wishBtn.classList.contains("active")) {
          wishBtn.innerHTML = `<i class="fa-solid fa-heart"></i>`;
          showToast("Trip Added To Wishlist");
        } else {
          wishBtn.innerHTML = `<i class="fa-regular fa-heart"></i>`;
          showToast("Trip Removed From Wishlist");
        }
      });
    }
  });

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const destination = document.getElementById("destination").value;

      if (fullName === "" || email === "" || phone === "" || destination === "") {
        showToast("Please fill all required fields");
      } else if (phone.length < 10) {
        showToast("Please enter valid phone number");
      } else {
        showToast("Booking request submitted successfully");
        bookingForm.reset();
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      showToast("Message sent successfully");
      contactForm.reset();
    });
  }

  if (themeToggle) {
    if (localStorage.getItem("travelTheme") === "dark") {
      document.body.classList.add("dark-travel");
      themeToggle.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    }

    themeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark-travel");

      if (document.body.classList.contains("dark-travel")) {
        localStorage.setItem("travelTheme", "dark");
        themeToggle.innerHTML = `<i class="fa-solid fa-sun"></i>`;
      } else {
        localStorage.setItem("travelTheme", "light");
        themeToggle.innerHTML = `<i class="fa-solid fa-moon"></i>`;
      }
    });
  }

  window.addEventListener("scroll", function () {
    if (!backToTop) return;

    if (window.scrollY > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});