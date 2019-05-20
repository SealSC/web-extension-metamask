module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      metamask: {
        files: {
          'dist/sealsc-web-extension-metamask.js': [ 'src/extension.js' ]
        },

        options: {
          transform: [["babelify"]],
          browserifyOptions: {
            standalone: 'sealsc-web-extension-metamask'
          }
        }
      },
    },
    uglify: {
      options: {
        sourceMap: true
      },
      metamask: {
        files:{
          'dist/sealsc-web-extension-metamask.min.js': [ 'dist/sealsc-web-extension-metamask.js' ],
        }
      },
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');

  grunt.registerTask('build', ['browserify', 'uglify']);
};
