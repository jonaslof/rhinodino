module.exports = function (grunt) {

	grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

		options: {

			publish: 'public',
			assets: '<%= options.publish %>/assets',

			clean: {
				css: ['<%= options.css.concat %>', '<%= options.css.min %>', '<%= options.less.compiled %>'],
				js: ['<%= options.js.concat %>', '<%= options.js.min %>'],
				concat: ['<%= options.css.concat %>', '<%= options.js.concat %>']
			},

			css: {
				base: '<%= options.assets %>/css',
				files: ['<%= options.publish %>/sprites.css', '<%= options.css.base %>/*.css'],
				concat: '<%= options.css.base %>/concat.css',
				min: '<%= options.publish %>/styles.min.css'
			},

			js: {
				base: '<%= options.assets %>/js',
				files: ['<%= options.js.base %>/*.js'],
				concat: '<%= options.js.base %>/concat.js',
				min: '<%= options.publish %>/scripts.min.js'
			},

			less: {
				base: '<%= options.assets %>/less',
				file: '<%= options.less.base %>/custom.less',
				compiled: '<%= options.css.base %>/styles.css'
			},

			legacssy: {
				file: '<%= options.publish %>/styles.min.css',
				compiled: '<%= options.publish %>/styles.ie.css'
			},

			svg: {
				dir: '<%= options.assets %>/img/svg',
				files: ['<%= options.svg.dir %>/*.svg'],
				min: '<%= options.assets %>/img/sprites',
				css: '<%= options.publish %>'
			}
		},

		clean: {
			css: {
				src: '<%= options.clean.css %>'
			},
			js: {
				src: '<%= options.clean.js %>'
			},
			concat: {
				src: '<%= options.clean.concat %>'
			}
		},

		concat: {
			css: {
				files: {
					'<%= options.css.concat %>' : ['<%= options.css.files %>']
				}
			},
			js: {
				options: {
					block: true,
					line: true,
					stripBanners: true
				},
				files: {
					'<%= options.js.concat %>' : ['<%= options.js.files %>'],
				}
			}
		},

		cssmin: {
			minify: {
	       		src: '<%= options.css.concat %>',
	        	dest: '<%= options.css.min %>'
			}
		},

		jshint: {
			files: ['<%= options.js.files %>'],
			options: {
				curly: true,
				indent: 4,
				trailing: true,
				devel: true,
				globals: {
					jQuery: true
				}
			}
		},

		less: {
			main: {
				options: {
					yuicompress: true,
					ieCompat: true
				},
				files: {
					'<%= options.less.compiled %>': '<%= options.less.file %>'
				}
			}
		},

		uglify: {
			options: {
				preserveComments: false
			},
			files: {
				src: '<%= options.js.concat %>',
				dest: '<%= options.js.min %>'
			}
		},

		'svg-sprites': {
			options: {
				paths: {
					spriteElements: '<%= options.svg.dir %>',
					sprites: '<%= options.svg.min %>',
					css: '<%= options.svg.css %>',
				},
				sizes: {
					large: 25,
					medium: 15,
					small: 13
				},
				refSize: 25
			}
		},

		legacssy: {
            ie8: {
                files: {
                    '<%= options.legacssy.compiled %>': ['<%= options.legacssy.file %>'],
                }
            }
        },

		watch: {
			svg: {
				files: ['<%= options.svg.files %>'],
				tasks: ['svg']
			},
			css: {
				files: ['<%= options.less.base %>/*.less', '!<%= options.less.compiled %>', '!<%= options.css.base %>/concat.css'],
				tasks: ['css']
			},
			js: {
				files: ['<%= options.js.files %>', '!<%= options.js.base %>/concat.js', '!<%= options.js.min %>'],
				tasks: ['js']
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('dr-grunt-svg-sprites');
	grunt.loadNpmTasks('grunt-legacssy');

	grunt.registerTask('default', 'watch');
	grunt.registerTask('svg', ['svg-sprites']);
	grunt.registerTask('css', ['clean:css', 'less', 'concat:css', 'cssmin', 'legacssy', 'clean:concat']);
	grunt.registerTask('js', ['clean:js', 'concat:js', 'uglify', 'clean:concat']);
}