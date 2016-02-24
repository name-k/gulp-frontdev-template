'use strict';

const 
  path   = require('path'),
  mkpath = require('mkpath'),
  fs     = require('fs');

module.exports  = function(options) {
  return function(callback) {
    return new Promise(function(resolve, reject) {
      fs.readdir(options.dir, function(err, files) {
        if(err) {
          reject(err);
        } else {
          resolve(files);
        }
      });
    })
      .then((dirs) => {
        let includes = '';
        dirs.forEach((path) => {
          if(/^(?!_)/.test(path)) {
            includes += 'include ' + path.replace(/\.jade/, '') + '\n';
          }
        });

        mkpath.sync(path.dirname(options.outputFile));

        return fs.writeFile(
          path.resolve(options.outputFile), 
          includes, 
          (err) => {
            if(err) {
              console.error(err);
            }
          });
      })
      .catch(err => {
        console.log(err);
        throw new Error(err);
      });
  };
};
