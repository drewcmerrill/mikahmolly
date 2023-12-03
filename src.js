function onScroll() {
  let stripeContainer = document.querySelector(".stripe-container");
  let studContainer = document.querySelector(".stud-container");
  var scrollPosition = window.scrollY || document.documentElement.scrollTop;

  // Calculate a value between 0 and 1 based on the scroll position
  var scrollPercentage = Math.min(
    scrollPosition / (document.body.scrollHeight - window.innerHeight),
    1
  );
  // Gradually change the background color based on scroll position
  stripeContainer.style.height = `${
    scrollPercentage * studContainer.clientHeight
  }px`;
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
  let studContainer = document.querySelector(".stud-container");
  let stripeContainer = document.querySelector(".stripe-container");
  stripeContainer.style.height = "400px";
  canvas.style.height = studContainer.clientHeight;
  let ctx = canvas.getContext("2d");
  let dpr = window.devicePixelRatio || 1;

  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;

  let zigs = 4;
  let buffer = 5;

  ctx.fillStyle = "#1a1eba";
  let streakWidth = 175;
  let streakHeight =
    streakWidth *
    Math.tan(Math.PI / 2 - Math.atan((canvas.width * zigs) / canvas.height));

  console.log(streakHeight);

  for (let i = 0; i < zigs; i++) {
    let streak = [];
    if (i % 2 === 0) {
      if (i === 0) {
        streak[0] = {
          x: streakWidth * 0.9,
          y: (i / zigs) * canvas.height,
        };
        streak[1] = { x: 0, y: (i / zigs) * canvas.height };
      } else {
        streak[0] = { x: 0 + buffer, y: (i / zigs) * canvas.height };
        streak[1] = {
          x: 0 + buffer,
          y: (i / zigs) * canvas.height + streakHeight,
        };
      }

      streak[2] = {
        x: canvas.width - streakWidth - buffer,
        y: ((i + 1) / zigs) * canvas.height + streakHeight,
      };
      streak[3] = {
        x: canvas.width - streakWidth - buffer,
        y: ((i + 1) / zigs) * canvas.height,
      };
    } else {
      streak[0] = { x: canvas.width - buffer, y: (i / zigs) * canvas.height };
      streak[1] = {
        x: canvas.width - buffer,
        y: (i / zigs) * canvas.height + streakHeight,
      };
      streak[2] = {
        x: streakWidth + buffer,
        y: ((i + 1) / zigs) * canvas.height + streakHeight,
      };
      streak[3] = {
        x: streakWidth + buffer,
        y: ((i + 1) / zigs) * canvas.height,
      };
    }
    drawFilledPolygon(ctx, streak);
  }

  ctx.fillStyle = "#a5180e";

  let vertices = [];
  for (let i = 0; i <= zigs; i++) {
    if (i % 2 === 0) {
      if (i === 0) {
        vertices[i] = {
          x: streakWidth * 0.9,
          y: (i / zigs) * canvas.height,
        };
        vertices[zigs * 2 + 1 - i] = {
          x: streakWidth * 2 * 0.9,
          y: (i / zigs) * canvas.height,
        };
      } else {
        vertices[i] = { x: 0 + buffer, y: (i / zigs) * canvas.height };
        vertices[zigs * 2 + 1 - i] = {
          x: streakWidth + buffer,
          y: (i / zigs) * canvas.height,
        };
      }
    } else {
      vertices[i] = {
        x: canvas.width - streakWidth - buffer,
        y: (i / zigs) * canvas.height,
      };
      vertices[zigs * 2 + 1 - i] = {
        x: canvas.width - buffer,
        y: (i / zigs) * canvas.height,
      };
    }
  }

  // Draw the filled polygon
  drawFilledPolygon(ctx, vertices);
}

window.addEventListener("load", function () {
  // Attach the onScroll function to the scroll event
  window.addEventListener("scroll", onScroll);

  drawStreaks();
});
