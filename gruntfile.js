
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },

      build: ['Gruntfile.js', 'js/*.js']
    },

    less: {
      build: {
        files: {
          'css/style.css': 'css/style.less'
        }
      }
    },

    watch: {
      
      files: ['css/*.css', 'css/*.less'], 
      tasks: ['less'] ,

      scripts: { 
        files: 'js/*.js', tasks: ['jshint'] 
      } 
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');


};
