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

  //the width of the streaks
  let streakWidth = interpolate(window.innerWidth, 125, 250, 450, 1720); //* (window.innerWidth / 1710);

  //do the first row first, because the top has a different offset than the others
  let canvas = contentRows[0].querySelector(".zigzag");
  let ctx = canvas.getContext("2d");
  let dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;

  //draw the flare element
  let flare = contentRows[0].querySelector(".flare");
  let canvasStart = canvas.getBoundingClientRect().left;

  //how far the streak starts offset to the left side of the canvas
  let offset = canvas.clientWidth / 4;

  flare.style.background = `linear-gradient(to right, #80a1d4, #80a1d4 ${
    canvasStart + offset
  }px, #c5283d ${canvasStart + offset}px, #c5283d )`;

  //draw the blue streak first
  ctx.fillStyle = "#80a1d4";
  let vertices = [];
  vertices[0] = { x: 0 + offset, y: 0 };
  vertices[1] = { x: streakWidth + offset, y: 0 };
  vertices[2] = { x: canvas.width - streakWidth, y: canvas.height };
  vertices[3] = { x: canvas.width - streakWidth * 2, y: canvas.height };
  drawFilledPolygon(ctx, vertices);

  //draw the red streak
  ctx.fillStyle = "#c5283d";
  vertices = [];
  vertices[0] = { x: streakWidth + offset, y: 0 };
  vertices[1] = { x: streakWidth * 2 + offset, y: 0 };
  vertices[2] = { x: canvas.width, y: canvas.height };
  vertices[3] = { x: canvas.width - streakWidth, y: canvas.height };
  drawFilledPolygon(ctx, vertices);

  //calculate the height of the current streak for the use of the next streak
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
      vertices = [];
      vertices[0] = { x: streakWidth, y: 0 };
      vertices[1] = { x: streakWidth * 2, y: 0 };
      vertices[2] = {
        x: streakWidth,
        y: previousStreakHeight,
      };

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
      vertices = [];
      vertices[0] = { x: canvas.width - streakWidth * 2, y: 0 };
      vertices[1] = { x: canvas.width - streakWidth, y: 0 };
      vertices[2] = {
        x: canvas.width - streakWidth,
        y: previousStreakHeight,
      };

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
}

window.addEventListener("load", function () {
  drawZigs();
});
