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

function drawZigs() {
  //get all the content-rows
  let contentRows = document.querySelectorAll(".content-row");

  //the width of the streaks
  let streakWidth = 300;

  //do the first row first, because the top has a different offset than the others
  let canvas = contentRows[0].querySelector(".zigzag");
  let ctx = canvas.getContext("2d");
  let dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;

  let offset = 0;

  ctx.fillStyle = "#80a1d4";
  let vertices = [];
  vertices[0] = { x: 0 + offset, y: 0 };
  vertices[1] = { x: streakWidth + offset, y: 0 };
  vertices[2] = { x: canvas.width - streakWidth, y: canvas.height };
  vertices[3] = { x: canvas.width - streakWidth * 2, y: canvas.height };
  drawFilledPolygon(ctx, vertices);

  ctx.fillStyle = "#c5283d";
  vertices = [];
  vertices[0] = { x: streakWidth + offset, y: 0 };
  vertices[1] = { x: streakWidth * 2 + offset, y: 0 };
  vertices[2] = { x: canvas.width, y: canvas.height };
  vertices[3] = { x: canvas.width - streakWidth, y: canvas.height };
  drawFilledPolygon(ctx, vertices);

  let previousStreakHeight =
    (canvas.height * streakWidth) / (canvas.width - 2 * streakWidth - offset);

  //iterate through all the content-rows
  for (let i = 1; i < contentRows.length; i++) {
    //get the canvas for this content row and adjust based on dpr
    let canvas = contentRows[i].querySelector(".zigzag");
    let ctx = canvas.getContext("2d");
    let dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;

    let currentStreakHeight =
      (canvas.height * streakWidth) / (canvas.width - streakWidth);

    if (i % 2 === 0) {
      ctx.fillStyle = "#80a1d4";
      let vertices = [];
      vertices[0] = { x: 0, y: 0 };
      vertices[1] = { x: 0, y: currentStreakHeight };
      vertices[2] = { x: canvas.width - streakWidth * 2, y: canvas.height };
      vertices[3] = { x: canvas.width - streakWidth, y: canvas.height };

      drawFilledPolygon(ctx, vertices);

      vertices = [];
      vertices[0] = { x: streakWidth, y: 0 };
      vertices[1] = { x: streakWidth * 2, y: 0 };
      vertices[2] = {
        x: streakWidth,
        y: previousStreakHeight,
      };

      drawFilledPolygon(ctx, vertices);

      ctx.fillStyle = "#c5283d";
      vertices = [];
      vertices[0] = { x: 0, y: 0 };
      vertices[1] = { x: streakWidth, y: 0 };
      vertices[2] = { x: canvas.width, y: canvas.height };
      vertices[3] = { x: canvas.width - streakWidth, y: canvas.height };
      drawFilledPolygon(ctx, vertices);
    } else {
      ctx.fillStyle = "#80a1d4";
      let vertices = [];
      vertices[0] = { x: canvas.width, y: 0 };
      vertices[1] = { x: canvas.width, y: currentStreakHeight };
      vertices[2] = { x: streakWidth * 2, y: canvas.height };
      vertices[3] = { x: streakWidth, y: canvas.height };

      drawFilledPolygon(ctx, vertices);

      vertices = [];
      vertices[0] = { x: canvas.width - streakWidth * 2, y: 0 };
      vertices[1] = { x: canvas.width - streakWidth, y: 0 };
      vertices[2] = {
        x: canvas.width - streakWidth,
        y: previousStreakHeight,
      };

      drawFilledPolygon(ctx, vertices);

      ctx.fillStyle = "#c5283d";
      vertices = [];
      vertices[0] = { x: canvas.width, y: 0 };
      vertices[1] = { x: canvas.width - streakWidth, y: 0 };
      vertices[2] = { x: 0, y: canvas.height };
      vertices[3] = { x: streakWidth, y: canvas.height };

      drawFilledPolygon(ctx, vertices);
    }
    previousStreakHeight =
      (canvas.height * streakWidth) / (canvas.width - streakWidth);
  }
}

function drawStreaks() {
  let canvas = document.querySelector(".zigzag");
  let studContainer = document.querySelector(".stud-container");
  // stripeContainer.style.height = "400px";
  canvas.style.height = studContainer.clientHeight;
  let ctx = canvas.getContext("2d");
  let dpr = window.devicePixelRatio || 1;

  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  // if (dpr > 1) {
  //   canvas.width = canvas.clientWidth * 1.2;
  //   canvas.height = canvas.clientHeight * 1.2;
  // }

  let deviceWidth = window.innerWidth;
  console.log(deviceWidth);

  let zigs = document.querySelectorAll(".content-row").length;
  let buffer = 5;

  ctx.fillStyle = "#80a1d4";
  let streakWidth = Math.min(175, (175 * deviceWidth) / 1920 + 30);
  let streakHeight =
    streakWidth *
    Math.tan(Math.PI / 2 - Math.atan((canvas.width * zigs) / canvas.height));

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

  ctx.fillStyle = "#c5283d";

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
  // window.addEventListener("scroll", onScroll);

  // drawStreaks();
  drawZigs();
});
