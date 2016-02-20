module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'js/PaperPlane.js',
                dest: 'build/PaperPlane.min.js'
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'css/style.min.css': ['css/style.css']
                }
            }
        },
        jshint: {
            all: ['js/*.js']
        },
        watch: {
            scripts: {
                files: ['build/*.js'],
                tasks: ['jshint', 'uglify'],
                options: {
                    spawn: false,
                }
            },
            styles: {
                files: ['scss/*.scss'],
                tasks: ['compass','cssmin'],
                options: {
                    spawn: false,
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'css/*.min.css',
                        'js/*.min.js',
                        '*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    proxy: 'http://localhost:8888/paperplane/angle/parallax-slider/'
                }
            }
        },
        compass: {                  // Task
            dev: {                    // target
                options: {
                    sassDir: 'scss',
                    cssDir: 'css'
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);
    grunt.registerTask( 'w', ['browserSync', 'watch']);

};