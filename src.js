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

function interpolate(value, start, end, rangeStart, rangeEnd) {
  // Clamp the value within the specified range
  value = Math.min(Math.max(value, rangeStart), rangeEnd);

  // Calculate the percentage of the value within the range
  var percent = (value - rangeStart) / (rangeEnd - rangeStart);

  // Interpolate between the start and end values
  return start + percent * (end - start);
}

function drawZigs() {
  //get all the content-rows
  let contentRows = document.querySelectorAll(".content-row");

  //do the first row first, because the top has a different offset than the others
  let canvas = contentRows[0].querySelector(".zigzag");
  let ctx = canvas.getContext("2d");
  let dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;

  //the width of the streaks
  let streakWidth = interpolate(window.innerWidth, 50, 150, 450, 1920) * dpr;

  console.log(dpr);

  //how far the streak starts offset to the left side of the canvas
  let offset = canvas.clientWidth / 4;
  let offsetCanvas = offset * dpr;

  //draw the blue streak first
  ctx.fillStyle = "#80a1d4";
  let vertices = [];
  vertices[0] = { x: 0 + offsetCanvas, y: 0 };
  vertices[1] = { x: streakWidth + offsetCanvas, y: 0 };
  vertices[2] = { x: canvas.width - streakWidth, y: canvas.height };
  vertices[3] = { x: canvas.width - streakWidth * 2, y: canvas.height };
  drawFilledPolygon(ctx, vertices);

  //draw the red streak
  ctx.fillStyle = "#c5283d";
  vertices = [];
  vertices[0] = { x: streakWidth + offsetCanvas, y: 0 };
  vertices[1] = { x: streakWidth * 2 + offsetCanvas, y: 0 };
  vertices[2] = { x: canvas.width, y: canvas.height };
  vertices[3] = { x: canvas.width - streakWidth, y: canvas.height };
  drawFilledPolygon(ctx, vertices);

  //calculate the height of the current streak for the use of the next streak
  let previousStreakHeight =
    (canvas.height * streakWidth) /
    (canvas.width - 2 * streakWidth - offsetCanvas);

  //iterate through all the content-rows
  for (let i = 1; i < contentRows.length; i++) {
    //get the canvas for this content row and adjust based on dpr
    let canvas = contentRows[i].querySelector(".zigzag");
    let ctx = canvas.getContext("2d");
    let dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;

    //get the height of the current streak
    let currentStreakHeight =
      (canvas.height * streakWidth) / (canvas.width - streakWidth);

    //for every other row
    if (i % 2 === 0) {
      //draw the blue streak
      ctx.fillStyle = "#80a1d4";
      let vertices = [];
      vertices[0] = { x: 0, y: 0 };
      vertices[1] = { x: 0, y: currentStreakHeight };
      vertices[2] = { x: canvas.width - streakWidth * 2, y: canvas.height };
      vertices[3] = { x: canvas.width - streakWidth, y: canvas.height };

      drawFilledPolygon(ctx, vertices);

      //draw the filling triangle for the blue streak
      if (previousStreakHeight > currentStreakHeight) {
        let trapezoidWidth =
          ((previousStreakHeight - currentStreakHeight) * streakWidth) /
          previousStreakHeight;
        vertices = [];
        vertices[0] = { x: streakWidth, y: 0 };
        vertices[1] = { x: streakWidth * 2, y: 0 };
        vertices[2] = {
          x: streakWidth + trapezoidWidth,
          y: currentStreakHeight,
        };
        vertices[3] = { x: streakWidth, y: currentStreakHeight };
      } else {
        vertices = [];
        vertices[0] = { x: streakWidth, y: 0 };
        vertices[1] = { x: streakWidth * 2, y: 0 };
        vertices[2] = {
          x: streakWidth,
          y: previousStreakHeight,
        };
      }

      drawFilledPolygon(ctx, vertices);

      //draw the red streak
      ctx.fillStyle = "#c5283d";
      vertices = [];
      vertices[0] = { x: 0, y: 0 };
      vertices[1] = { x: streakWidth, y: 0 };
      vertices[2] = { x: canvas.width, y: canvas.height };
      vertices[3] = { x: canvas.width - streakWidth, y: canvas.height };
      drawFilledPolygon(ctx, vertices);
    } else {
      //draw the blue streak
      ctx.fillStyle = "#80a1d4";
      let vertices = [];
      vertices[0] = { x: canvas.width, y: 0 };
      vertices[1] = { x: canvas.width, y: currentStreakHeight };
      vertices[2] = { x: streakWidth * 2, y: canvas.height };
      vertices[3] = { x: streakWidth, y: canvas.height };

      drawFilledPolygon(ctx, vertices);

      //draw the filling triangle for the blue streak
      if (previousStreakHeight > currentStreakHeight) {
        let trapezoidWidth =
          ((previousStreakHeight - currentStreakHeight) * streakWidth) /
          previousStreakHeight;
        vertices = [];
        vertices[0] = { x: canvas.width - streakWidth * 2, y: 0 };
        vertices[1] = {
          x: canvas.width - streakWidth - trapezoidWidth,
          y: currentStreakHeight,
        };
        vertices[2] = {
          x: canvas.width - streakWidth,
          y: currentStreakHeight,
        };
        vertices[3] = { x: canvas.width - streakWidth, y: 0 };
      } else {
        vertices = [];
        vertices[0] = { x: canvas.width - streakWidth * 2, y: 0 };
        vertices[1] = { x: canvas.width - streakWidth, y: 0 };
        vertices[2] = {
          x: canvas.width - streakWidth,
          y: previousStreakHeight,
        };
      }

      drawFilledPolygon(ctx, vertices);

      //draw the red streak
      ctx.fillStyle = "#c5283d";
      vertices = [];
      vertices[0] = { x: canvas.width, y: 0 };
      vertices[1] = { x: canvas.width - streakWidth, y: 0 };
      vertices[2] = { x: 0, y: canvas.height };
      vertices[3] = { x: streakWidth, y: canvas.height };

      drawFilledPolygon(ctx, vertices);
    }
    //set the previousStreakHeight for the use of the next row
    previousStreakHeight = currentStreakHeight;
  }

  //draw the flare elements
  let blueFlare = contentRows[0].querySelector(".blue-flare");
  let redFlare = contentRows[0].querySelector(".red-flare");

  let blueFlareBottom =
    contentRows[contentRows.length - 1].querySelector(".blue-flare-bottom");
  let redFlareBottom =
    contentRows[contentRows.length - 1].querySelector(".red-flare-bottom");

  let canvasStart = canvas.getBoundingClientRect().left;
  let canvasEnd = canvas.getBoundingClientRect().right;

  redFlare.style.left = `${canvasStart + offset + streakWidth / dpr}px`;
  redFlareBottom.style.left = `${canvasEnd - streakWidth / dpr}px`;

  redFlare.style.width = `${
    document.body.clientWidth - (canvasStart + offset + streakWidth / dpr)
  }px`;
  redFlareBottom.style.width = `${
    document.body.clientWidth - (canvasEnd - streakWidth / dpr)
  }px`;

  blueFlare.style.left = `${canvasStart + offset + streakWidth / dpr}px`;
  blueFlareBottom.style.left = `${canvasEnd - streakWidth / dpr}px`;

  blueFlare.style.width = `${canvasStart + offset + streakWidth / dpr}px`;
  blueFlareBottom.style.width = `${canvasEnd - streakWidth / dpr}px`;

  blueFlare.style.transition = "width 1s ease, left 1s ease";
  blueFlareBottom.style.transition = "width 1s ease, left 1s ease";

  requestAnimationFrame(() => {
    blueFlare.style.left = "0";
    blueFlareBottom.style.left = "0";
  });
}

window.addEventListener("load", function () {
  drawZigs();
});
