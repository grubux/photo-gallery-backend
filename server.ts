// @ts-nocheck
const fs = require("fs");
const path = require("path");
import express, { Response, Request, NextFunction } from "express";
import cors from "cors";
const asyncHandler = require("express-async-handler");
require("dotenv").config();

// import controller from "./src/controllers/controller";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// Controller
// @ts-nocheck

const controller = {
  getImages: async (req, res) => {
    var walk = function (dir, done) {
      var results = [];
      fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var i = 0;
        (function next() {
          var file = list[i++];
          if (!file) return done(null, results);
          file = path.resolve(dir, file);
          fs.stat(file, function (err, stat) {
            if (stat && stat.isDirectory()) {
              walk(file, function (err, res) {
                results = results.concat(res);
                next();
              });
            } else {
              results.push(file);
              next();
            }
          });
        })();
      });
    };

    const startingFolder =
      "/home/grubux/Documents/portfolio/laCasa/frontend/public/images";

    const customResponse = { imagesPaths: 0, pathStyled: 1 };

    await walk(startingFolder, function (err, results) {
      if (err) throw err;

      var re = new RegExp("/(images/.*)/[^/]+$");

      const pathStyled = results.map((result) => {
        console.log("regex: ", result.match(re)[0]);
        return result.match(re)[0];
      });

      console.log("pathStyled: ", pathStyled);

      console.log(results);

      customResponse.imagesPaths = results;
      customResponse.pathStyled = pathStyled;
      res.json(customResponse);
    });
  },
};

// Routes

app.get("/api", asyncHandler(controller.getImages));

app.get("*", (_, res) => {
  res.status(404);
  res.send({ success: false, message: "Wrong adress" });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  if (error.name === "MongoServerError" && error.code === 11000) {
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
