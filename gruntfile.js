module.exports = function (grunt) {

grunt.initConfig({
express: {
dev: {
options: {
script: './app.js'
}
}
},
        sass: {
        dist: {
        options: {
        style: 'compressed'
        },
                files: {
                'public/css/main.css': 'public/scss/main.scss',
                }
        }
        },
        watch: {
//            options: {
//                livereload: true,
//            },
//            html: {
//                files: ['public/index.html'],
//            },
//            js: {
//                files: ['public/js/**/*.js'],
//            },
        css: {
        files: ['public/scss/**/*.scss'],
                tasks: ['sass'],
        },
                express: {
                files: ['public/scss/*.scss', 'public/js/*.js', 'public/index.html', './app.js'], //Files to be watched
                        tasks: ['express'], //(Re)start the server
                        options: {            //Server options
                        spawn: false, //Must have for reload
                                livereload: true
                        }
                }
        }
});
//}
//});
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-sass');
        grunt.loadNpmTasks('grunt-express-server');
        grunt.registerTask('default', ['express', 'watch']);
        };

