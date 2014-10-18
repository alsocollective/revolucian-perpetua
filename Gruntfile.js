module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			js: {
				src: [
					'application/src/js/libraries/*.js',
					'application/src/js/libraries/**/*.js'
				],
				dest: 'application/static/js/all-lib.js'
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
				files: {
					'public/css/style.css': 'public/sass/*.scss',
				}
			}
		},
		watch: {
			/*scripts: {
				files: ['public/js/*.js', 'application/src/js/script.js'],
				tasks: ['concat:js', 'uglify', 'notify:js'],
				options: {
					spawn: false
				}
			},*/
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
	// grunt.registerTask('scss', ['concat:css', 'sass']);

};