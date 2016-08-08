  // Gruntfile.js
  module.exports = function(grunt) {

      grunt.initConfig({

          pkg: grunt.file.readJSON('package.json'), // get the configuration info from package.json 

          jshint: { // configure jshint to validate js files 
              options: {
                  reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
              },

              build: ['Gruntfile.js', '*.js'] // when this task is run, lint the Gruntfile and all js files in src
          },

          watch: { // configure watch to auto update

              scripts: {
                  files: '*.js',
                  tasks: ['jshint']
              }
          }

      });

      // load grunt plugins
      grunt.loadNpmTasks('grunt-contrib-jshint');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-express');

  };
