module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			js: {
				src: [
					// 'application/src/js/libraries/*.js',
					//'application/src/js/libraries/**/*.js'
					//''
					'public/js/jquery-1.11.0.min.js',
					'public/js/jquery-migrate-1.2.1.min.js',

					'public/js/angular.min.js',
					'public/js/angular-route.min.js',
					'public/js/angular-cookies.min.js',
					'public/js/angular-animate.min.js',

					'public/app/app.js',
					'public/app/controllers/song.js',
					'public/app/controllers/betweenpages.js',
					'public/app/controllers/util.js',
					'public/app/controllers/modal.js',
					'public/app/controllers/tap.js',
					'public/app/controllers/shake.js',
					'public/app/controllers/diagnostics.js',
					'public/app/controllers/admin.js',
					'public/app/controllers.js',
					'public/app/factory.js',

					'public/js/screenfull.min.js'
				],
				dest: 'public/app/all.js'
			},
			css: {
				src: [
					'public/css/style.css',
					'public/css/animate.css'
				],
				dest: 'public/css/style.min.css',
			}
		},
		uglify: {
			build: {
				src: 'public/app/all.js',
				dest: 'public/app/all.min.js'
			}
		},
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'application/src/img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'application/static/img/'
				}]
			}
		},
		sass: {
			dist: {
				files: {
					'public/css/style.css': 'public/sass/style.scss',
				}
			}
		},
		watch: {
			css: {
				files: ['public/sass/*.scss'],
				tasks: ['sass', 'concat:css', 'notify:css'],
				options: {
					spawn: false,
				}
			}
		},

		notify: {
			css: {
				options: {
					message: "SASS compressed"
				}
			},
			js: {
				options: {
					message: "JS compressed"
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');

	// grunt.registerTask('w', ['watch', 'notify:watch', 'notify', 'concat:css', 'sass'])
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('js', ['concat:js', 'uglify', 'notify:js'])
	// grunt.registerTask('scss', ['concat:css', 'sass']);

};