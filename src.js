document.addEventListener("DOMContentLoaded", function () {
  let stripeContainer = document.querySelector(".stripe-container");

  function onScroll() {
    var scrollPosition = window.scrollY || document.documentElement.scrollTop;

    // Calculate a value between 0 and 1 based on the scroll position
    var scrollPercentage = Math.min(
      scrollPosition / (document.body.scrollHeight - window.innerHeight),
      1
    );

    console.log(scrollPercentage);
    // Gradually change the background color based on scroll position
    stripeContainer.style.height = `${scrollPercentage * 100}%`;

    console.log(stripeContainer.style.height);
  }

  // Attach the onScroll function to the scroll event
  window.addEventListener("scroll", onScroll);
});
