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
// Implementing sticky navigation bar
// 1. header element selected above
// 2.calculate header contgainer's height dynamically
const headerHeight = header.getBoundingClientRect().height;
console.log("headerHeight", headerHeight);
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
  threshold: [0],
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
// Implementing smooth scrolling using morden way:

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    console.log(e.target);
    e.preventDefault();
    const id = link.getAttribute("href");
    const idDomElemnt = document.querySelector(id);

    // offset not available
    idDomElemnt.scrollIntoView({
      behavior: "smooth",
    });
    // Close mobile navigation after clicking
    if (link.classList.contains("main-nav-link"))
      header.classList.toggle("nav-open");
  });
});

///////////////////////////////////////////////////////////
// Image Optimization: always make sure the image you upload is dobule the size of the image you need!
// compress the image to make it smaller e.g. webp type
// use picture tag to provide different image types for different browsers

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
