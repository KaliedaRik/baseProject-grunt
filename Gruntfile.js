module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg:grunt.file.readJSON('package.json'),

    watch: {
      options: {
        // livereload: true,
      },
      toolchain_js: {
        files: ['web_local/js/*.js'],
        tasks: ['newer:complexity:generic', 'newer:jshint', 'newer:jsbeautifier:jsfiles', 'concat:js', 'copy:js', 'uglify:app_js'],
        options: {
          spawn: false
        }
      },
      toolchain_es6: {
        files: ['web_local/es6/*.es6'],
        tasks: ['newer:babel:translate', 'replace:babel_fix', 'newer:complexity:generic', 'newer:jshint', 'newer:jsbeautifier:jsfiles', 'concat:js', 'copy:js', 'uglify:app_js'],
        options: {
          spawn: false
        }
      },
      toolchain_sass: {
        files: ['web_local/sass/*.scss'],
        tasks: ['sass:compile', 'autoprefixer:target', 'copy:css', 'cssmin:target'],
        options: {
          spawn: false
        }
      },
      toolchain_html: {
        files: ['web_local/*.html'],
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
          src: 'web_local/sass/app.scss',
          dest: 'web_local/css/app.css'
        }]
      }
    },

    cssmin: {
      target: {
        files: [{
          src: 'web_stage/css/app.css',
          dest: 'web_prod/css/app.css'
        }]
      }
    },

    autoprefixer: {
      target: {
        files: [{
          src: 'web_local/css/app.css',
          dest: 'web_local/css/app.css'
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
          cwd: 'web_stage/',
          src: '*.html',
          dest: 'web_prod/'
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
          cwd: 'web_local/es6/',
          src: '*.es6',
          dest: 'web_local/js/',
          ext: '.js'
        }]
      }
    },

    replace: {
      babel_fix: {
        src: ['web_local/js/*.js'],
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
        src: ['web_local/*.html']
      },
      jsfiles: {
        src: ['web_local/js/*.js']
      }
    },

    concat: {
      options: {
        banner: '/* Warning: file regenerated automatically on each file save */\n\n'
      },
      js: {
        src: ['web_local/js/*.js', '!web_local/js/app.js'],
        dest: 'web_local/js/app.js'
      }
    },

    jshint: {
      all: ['web_local/js/*.js']
    },

    uglify: {
      app_js: {
        files: [{
          src: 'web_stage/js/app.js',
          dest: 'web_prod/js/app.js'
        }]
      }
    },

    copy: {
      js: {
        expand: true,
        cwd: 'web_local/js/',
        src: 'app.js',
        dest: 'web_stage/js/'
      },
      css: {
        expand: true,
        cwd: 'web_local/css/',
        src: '*.*',
        dest: 'web_stage/css/'
      },
      html: {
        expand: true,
        cwd: 'web_local/',
        src: '*.html',
        dest: 'web_stage/'
      }
    },

    complexity: {
      generic: {
        src: ['web_local/js/*.js'],
        exclude: [],
        options: {
          breakOnErrors: true,
          jsLintXML: 'report.xml',         // create XML JSLint-like report
          checkstyleXML: 'checkstyle.xml', // create checkstyle report
          pmdXML: 'pmd.xml',               // create pmd report
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
      server_local: {
        options: {
          port: 9001,
          base: './web_local',
          open: true,
          livereload: true
        }
      },
      server_stage: {
        options: {
          port: 9001,
          base: './web_stage',
          open: true,
          livereload: true
        }
      },
      server_prod: {
        options: {
          port: 9001,
          base: './web_prod',
          open: true,
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('local_server', ['connect:server_local', 'watch']);
  grunt.registerTask('stage_server', ['connect:server_stage', 'watch']);
  grunt.registerTask('prod_server', ['connect:server_prod', 'watch']);

};
