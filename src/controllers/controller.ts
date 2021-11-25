// @ts-nocheck

const fs = require("fs");
const path = require("path");

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

    const startingFolder = "";

    walk(startingFolder, function (err, results) {
      if (err) throw err;

      var re = new RegExp("/(images/.*)/[^/]+$");

      const pathStyled = results.map((result) => {
        console.log("regex: ", result.match(re)[0]);
      });

      console.log(results);
    });

    // res.JSON({ imagesPaths: results, pathStyled: pathStyled });
  },
};

export default controller;
