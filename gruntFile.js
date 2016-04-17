module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['browserify']);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      bundle1: {
        src: 'js/app.js',
        dest: 'js/app-bundle.js'
      },
      bundle2: {
        src: 'js/app2.js',
        dest: 'js/app-bundle-2.js'
      },
      bundle3: {
        src: 'js/app3.js',
        dest: 'js/app-bundle-3.js'
      }
    },
    watch: {
      files: 'js/*',
      tasks: ['default']
    }
  });
}
