module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg:grunt.file.readJSON('package.json'),

    watch: {
      toolchain_js: {
        files: ['source/js/*.js'],
        tasks: ['newer:jshint', 'newer:jsbeautifier:jsfiles', 'newer:complexity:generic', 'concat:js', 'copy:js', 'uglify:app_js'],
        options: {
          spawn: false
        }
      },
      toolchain_es6: {
        files: ['source/es6/*.es6'],
        tasks: ['newer:babel:translate', 'replace:babel_fix', 'newer:complexity:generic'],
        options: {
          spawn: false
        }
      },
      toolchain_sass: {
        files: ['source/sass/*.scss'],
        tasks: ['sass:compile', 'autoprefixer:target', 'copy:css', 'cssmin:target'],
        options: {
          spawn: true
        }
      },
      toolchain_html: {
        files: ['source/*.html'],
        tasks: ['newer:jsbeautifier:htmlfiles', 'copy:html', 'htmlmin:htmlfiles'],
        options: {
          spawn: false
        }
      }
    },

    sass: {
      options: {
        sourceMap: true
      },
      compile: {
        files: [{
          src: 'source/sass/app.scss',
          dest: 'source/css/app.css'
        }]
      }
    },

    cssmin: {
      target: {
        files: [{
          src: 'construct/css/app.css',
          dest: 'result/css/app.css'
        }]
      }
    },

    autoprefixer: {
      target: {
        files: [{
          src: 'source/css/app.css',
          dest: 'source/css/app.css'
        }]
      }
    },

    htmlmin: {
      htmlfiles: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'construct/',
          src: '*.html',
          dest: 'result/'
        }]
      }
    },

    babel: {
      options: {
        presets: ['es2015']
      },
      translate: {
        files: [{
          expand: true,
          cwd: 'source/es6/',
          src: '*.es6',
          dest: 'source/js/',
          ext: '.js'
        }]
      }
    },

    replace: {
      babel_fix: {
        src: ['source/js/*.js'],
        overwrite: true,
        replacements: [{
          from: /^'use strict';/,
          to: "// 'use strict';"
        }]
      }
    },

    jsbeautifier: {
      options: {
        html: {
          indentSize: 2,
        },
        js: {
          braceStyle: "end-expand",
          indentWithTabs: true,
          keepArrayIndentation: true,
          keepFunctionIndentation: true,
          spaceBeforeConditional: true,
          spaceInParen: false,
        }
      },
      htmlfiles: {
        src: ['source/*.html']
      },
      jsfiles: {
        src: ['source/js/*.js']
      }
    },

    concat: {
      options: {
        banner: '/* Warning: file regenerated automatically on each file save */\n\n'
      },
      js: {
        src: ['source/js/*.js', '!source/js/app.js'],
        dest: 'source/js/app.js'
      }
    },

    jshint: {
      all: ['source/js/*.js']
    },

    uglify: {
      app_js: {
        files: [{
          src: 'construct/js/app.js',
          dest: 'result/js/app.js'
        }]
      }
    },

    copy: {
      js: {
        expand: true,
        cwd: 'source/js/',
        src: 'app.js',
        dest: 'construct/js/'
      },
      css: {
        expand: true,
        cwd: 'source/css/',
        src: '*.*',
        dest: 'construct/css/'
      },
      html: {
        expand: true,
        cwd: 'source/',
        src: '*.html',
        dest: 'construct/'
      }
    },

    complexity: {
      generic: {
        src: ['source/js/*.js'],
        exclude: [],
        options: {
          breakOnErrors: true,
          errorsOnly: false,               // show only maintainability errors
          cyclomatic: [3, 7, 12],          // or optionally a single value, like 3
          halstead: [8, 13, 20],           // or optionally a single value, like 8
          maintainability: 100,
          hideComplexFunctions: false,     // only display maintainability
          broadcast: false                 // broadcast data over event-bus
        }
      }
    },

    connect: {
      source: {
        options: {
          hostname: 'localhost',
          port: 9001,
          base: './source',
          open: true
        }
      },
      test: {
        options: {
          hostname: 'localhost',
          port: 9001,
          base: './construct',
          open: true
        }
      },
      prod: {
        options: {
          hostname: 'localhost',
          port: 9001,
          base: './result',
          open: true
        }
      }
    }
  });

  grunt.registerTask('source_server', ['connect:source', 'watch']);
  grunt.registerTask('test_server', ['connect:test', 'watch']);
  grunt.registerTask('server', ['connect:prod', 'watch']);

};
