'use strict';

var request = require('request');

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-apidoc');

    grunt.initConfig({
        apidoc: {
            <%= name %>: {
                src: "/",
                dest: "./apidocs/"
            }
        },
        pkg: grunt.file.readJSON('package.json'),
        // Watch for changes in live edit
        watch: {
            controllers: {
                files: ['controllers/**/*.js'],
                tasks: "apidoc",
            },
        },
    });


    //default for watching
    grunt.registerTask('default', [
        'watch'
    ]);
};
