// Wait for DOM to load completely
document.addEventListener("DOMContentLoaded", function () {
  // Navigation menu toggle for mobile
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  // Toggle navigation menu
  burger.addEventListener("click", () => {
    // Toggle navigation
    nav.classList.toggle("nav-active");

    // Animate links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.3
        }s`;
      }
    });

    // Burger animation
    burger.classList.toggle("toggle");
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Adjust for header height
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (nav.classList.contains("nav-active")) {
          nav.classList.remove("nav-active");
          burger.classList.remove("toggle");
          navLinks.forEach((link) => {
            link.style.animation = "";
          });
        }
      }
    });
  });

  // Contact form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Here you would typically send the form data to a server
      // For now, we'll just log it and show a success message
      console.log("Form submitted:", { name, email, subject, message });

      // Show success message (you can customize this)
      alert("Thank you for your message! I will get back to you soon.");

      // Reset form
      contactForm.reset();
    });
  }

  // Animate skill bars on scroll
  const skillSection = document.querySelector(".skills");
  const skillLevels = document.querySelectorAll(".skill-level");

  if (skillSection && skillLevels.length > 0) {
    // Initially set width to 0
    skillLevels.forEach((level) => {
      level.style.width = "0";
    });

    // Function to check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    }

    // Function to animate skill bars
    function animateSkills() {
      if (isInViewport(skillSection)) {
        skillLevels.forEach((level) => {
          // Get the original width from the inline style in HTML
          const originalWidth =
            level.parentElement.nextElementSibling.textContent;
          level.style.width = originalWidth;
        });
        // Remove scroll listener once animated
        window.removeEventListener("scroll", animateSkills);
      }
    }

    // Add scroll event listener
    window.addEventListener("scroll", animateSkills);
    // Check on initial load
    animateSkills();
  }
});
