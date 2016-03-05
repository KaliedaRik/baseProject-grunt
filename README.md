# baseProject-grunt

REPO NOT INTENDED FOR SHARING - just a personal starter pack for my own learning and experimentation.

A very basic template repository for my personal projects. CSS can be written is SASS, and JavaScript files can include ECMA2015 syntactic sugar. Files are appropriately beautified and linted; JavaScript files are checked for complexity. Deployment files are appropriately minified.

## Structure

Repo comes with a 3 folder structure:

* 'source' - the development files, with separate folders for 'assets', 'css', 'es6' (ECMA2015 JavaScript files), 'js' and 'sass'
* 'construct' - an intermediate folder for processing files into their final form
* 'result' - the final, deployment files

## Development

__html__ - repo is set up to accept an html file structure in the source/ folder, with index.html in the folder root. Repo does not include templating infrastructure (moustache, etc) at this time. The result/ html files should mirror the source/ folder structure, minified.

__sass__ - css should be developed in the source/sass/ folder, with source/sass/app.scss acting as the primary file. The index.html page includes a link to css/app.css file. Style files are auto-prefixed and minified on their journey to the /result folder.

__css__ - additional css files can be placed in the source/css folder and should be similarly auto-prefixed and minified as they are processed. Links to these files will need to be added to html files.

__es6__ - the Grunt toolchain includes a Babel transpiler. JavaScript files using ECMA2015 features should be placed in the source/es6 folder with a .es6 (not .js) suffix. Transpiling will create a set of mirrored files in the source/js folder

__js__ - additional JavaScript files can be included in the source/js folder. The source/js/app.js file is overwritten as part of the processing of JavaScript files. All files in the source/js folder will be concatenated into app.js after beautify, lint and complexity checks. The result/ folder will include a minified version of the app.js file, which is referenced in html files. To avoid processing additional JS files, place them in sub-folders within the source/js/ folder and add copy instructions to the Grunt toolchain

The toolchain does not browserify files, and require-like JavaScript is not part of the repo.

Image manipulation functionality - for instance to create multiple versions of image files, or to compress images - has not yet been included in the Grunt toolchain.

Browser auto-refresh functionality continues to elude me.
