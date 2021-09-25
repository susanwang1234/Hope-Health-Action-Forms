'use strict';

import express from "express";

// Constants
const PORT = 8080;
const app = express();

// Sample GET request
app.get("/", (req, res) => {
    res.send( "Ceres" );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
