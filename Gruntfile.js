module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			js: {
				src: [
					'application/src/js/libraries/*.js',
					'application/src/js/libraries/**/*.js'
				]
				dest: 'application/static/js/all-lib.js'
			},
			css: {
				src: [
					'application/src/scss/reset.scss',
					'application/src/scss/base.scss',
					'application/src/scss/print.scss'
				],
				dest: 'application/static/css/screen.scss',
				options: {
					message: 'Concat css'
				}
			}
		},
		uglify: {
			build: {
				src: 'application/static/js/all-lib.js',
				dest: 'application/static/js/all-lib.min.js'
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
				options: {
					style: 'compressed',
				},
				files: {
					'application/static/css/screen.css': 'application/static/css/screen.scss',
				}
			}
		},
		watch: {
			scripts: {
				files: ['application/src/js/libraries/*.js', 'application/src/js/script.js'],
				tasks: ['concat:js', 'uglify', 'notify:js'],
				options: {
					spawn: false
				}
			},
			css: {
				files: ['application/src/scss/*.scss'],
				tasks: ['concat:css', 'sass', 'notify:css'],
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

	grunt.registerTask('w', ['watch', 'notify:watch', 'notify'])
	grunt.registerTask('default', ['concat', 'uglify', 'imagemin']);
	grunt.registerTask('scss', ['concat:css', 'sass']);
};