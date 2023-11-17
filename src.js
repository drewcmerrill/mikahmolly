function onScroll() {
  let stripeContainer = document.querySelector(".stripe-container");
  var scrollPosition = window.scrollY || document.documentElement.scrollTop;

  // Calculate a value between 0 and 1 based on the scroll position
  var scrollPercentage = Math.min(
    scrollPosition / (document.body.scrollHeight - window.innerHeight),
    1
  );

  // Gradually change the background color based on scroll position
  stripeContainer.style.height = `${scrollPercentage * 100 + 10}%`;
}

function drawStreaks() {
  let studContainer = document.querySelector(".stud-container");
  let stripeContainer = document.querySelector(".stripe-container");
  let canvas = document.querySelector(".zigzag");
  let ctx = canvas.getContext("2d");
  let dpr = window.devicePixelRatio || 1;

  canvas.width = studContainer.clientWidth;
  canvas.height = studContainer.clientHeight;

  let zigs = 4;
  ctx.lineWidth = 40;

  let angle = Math.atan((canvas.clientWidth * zigs) / canvas.clientHeight);
  let horizontalWidth = ctx.lineWidth / Math.cos(angle) + 5;
  let verticalHeight = Math.tan(Math.PI / 2 - angle) * (horizontalWidth / 2);
  console.log(verticalHeight);

  ctx.strokeStyle = "#191dba";

  ctx.beginPath();
  ctx.moveTo(0, -verticalHeight);
  for (let i = 1; i <= zigs; i++) {
    if (i % 2 == 1) {
      ctx.lineTo(
        canvas.width - horizontalWidth * 2,
        (i / zigs) * canvas.height
      );
    } else {
      ctx.lineTo(horizontalWidth / 2, (i / zigs) * canvas.height);
    }
  }
  ctx.stroke();

  ctx.strokeStyle = "#a5170d";

  ctx.beginPath();
  ctx.moveTo(horizontalWidth, -verticalHeight);
  for (let i = 1; i <= zigs; i++) {
    if (i % 2 == 1) {
      if (i === zigs) {
        ctx.lineTo(canvas.width, (i / zigs) * canvas.height + verticalHeight);
      } else {
        ctx.lineTo(
          canvas.width - horizontalWidth / 2,
          (i / zigs) * canvas.height
        );
      }
    } else {
      if (i === zigs) {
        ctx.lineTo(0, (i / zigs) * canvas.height + verticalHeight);
      } else {
        ctx.lineTo(horizontalWidth / 2, (i / zigs) * canvas.height);
      }
    }
  }

  ctx.stroke();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(0, 0);
  for (let i = 1; i <= zigs; i++) {
    if (i % 2 == 1) {
      ctx.lineTo(canvas.width, (i / zigs) * canvas.height);
    } else {
      ctx.lineTo(0, (i / zigs) * canvas.height);
    }
  }
  ctx.stroke();

  stripeContainer.style.height = "10%";
  // stripeContainer.style.transition = "height 1s ease";
}

document.addEventListener("DOMContentLoaded", function () {
  // Attach the onScroll function to the scroll event
  window.addEventListener("scroll", onScroll);

  drawStreaks();
});
