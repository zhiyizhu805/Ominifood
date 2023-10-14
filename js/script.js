///////////////////////////////////////////////////////////
// Make the mobile navigation work

const header = document.querySelector(".header");
header.addEventListener("click", function (e) {
  const target = e.target;
  if (target.classList.contains("icon-mobile-nav")) {
    header.classList.toggle("nav-open");
  }
});

///////////////////////////////////////////////////////////
// Implementing smooth scrolling using morden way:

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const id = link.getAttribute("href");
    const idDomElemnt = document.querySelector(id);
    idDomElemnt.scrollIntoView({ behavior: "smooth" });
  });
});

///////////////////////////////////////////////////////////
// Implementing sticky navigation bar
// 1. header element selected above
// 2.calculate header contgainer's height dynamically
const headerHeight = header.getBoundingClientRect().height;
const sectionHero = document.querySelector("#section-hero");
// 3. callback function for the observer
const stickyNav = function (entries) {
  entries.forEach((entry) => {
    // console.log(entry);
    if (!entry.isIntersecting) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });
};

// 4. options
const options = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
});

const observer = new IntersectionObserver(stickyNav, options);
observer.observe(sectionHero);

///////////////////////////////////////////////////////////
// reaveal sections on scroll
const hiddenSections = document.querySelectorAll(".hidden-section");
// 3.call-back
const reavealSection = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("hidden");
};
// 1. create observer
const observerReveal = new IntersectionObserver(reavealSection, {
  root: null,
  threshold: [0.15],
});
// 2.use the observer to observe each section
hiddenSections.forEach(function (section) {
  section.classList.add("hidden");
  observerReveal.observe(section);
});

///////////////////////////////////////////////////////////
// Image lazy loading

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/*
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/
