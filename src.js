function onScroll() {
  let stripeContainer = document.querySelector(".stripe-container");
  var scrollPosition = window.scrollY || document.documentElement.scrollTop;

  // Calculate a value between 0 and 1 based on the scroll position
  var scrollPercentage = Math.min(
    scrollPosition / (document.body.scrollHeight - window.innerHeight),
    1
  );

  // Gradually change the background color based on scroll position
  stripeContainer.style.height = `${scrollPercentage * 100}%`;
}

function drawFilledPolygon(ctx, vertices) {
  if (vertices.length < 3) {
    // Need at least 3 vertices to form a polygon
    console.error("At least 3 vertices are required.");
    return;
  }

  ctx.beginPath();
  ctx.moveTo(vertices[0].x, vertices[0].y);

  for (var i = 1; i < vertices.length; i++) {
    ctx.lineTo(vertices[i].x, vertices[i].y);
  }

  // Close the path to complete the polygon
  ctx.closePath();

  // Fill the polygon
  ctx.fill();
}

function drawStreaks() {
  let canvas = document.querySelector(".zigzag");
  let ctx = canvas.getContext("2d");
  let dpr = window.devicePixelRatio || 1;

  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;

  let zigs = 4;
  ctx.fillStyle = "#a5180e";
  let streakWidth = 200;

  let vertices = [];
  for (let i = 0; i <= zigs; i++) {
    if (i % 2 === 0) {
      vertices[i] = { x: 0, y: (i / zigs) * canvas.height };
      vertices[zigs * 2 + 1 - i] = {
        x: streakWidth,
        y: (i / zigs) * canvas.height,
      };
    } else {
      vertices[i] = {
        x: canvas.width - streakWidth,
        y: (i / zigs) * canvas.height,
      };
      vertices[zigs * 2 + 1 - i] = {
        x: canvas.width,
        y: (i / zigs) * canvas.height,
      };
    }
  }

  // Draw the filled polygon
  drawFilledPolygon(ctx, vertices);
}

document.addEventListener("DOMContentLoaded", function () {
  // Attach the onScroll function to the scroll event
  window.addEventListener("scroll", onScroll);

  drawStreaks();
});
