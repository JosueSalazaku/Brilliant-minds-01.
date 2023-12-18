const express = require("express");
const app = express();
/** TODO:

have a new database brilliant_minds
Inside that database a table "ideas" with the columns:
title (VARCHAR(255))
description (TEXT)
created_at (Timestamp)
Create a route for:
the new idea page (create)
the landing page (read)
the delete button (delete)
Make a database connection in express
Tip: Only use one JS file for now. */

const PORT = 3000;

app.get("/", function (req, res) {
  res.send("Hello wold");
});

app.listen(PORT, () =>
  console.log(`Server started: http://localhost:${PORT}/`)
);
