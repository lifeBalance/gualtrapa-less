# A gulp kit for Bootstrap LESS.
Basic kit for setting up a frontend workflow using Bootstrap LESS. Especially useful for those situations when I come up with some ideas I want to put fast in a design.

## Installation.
Just clone away:
```bash
$ git clone https://github.com/lifeBalance/gualtrapa-less
```
Install the packages:
```bash
$ cd gualtrapa-less
$ npm install
```
Run Gulp:
```bash
$ gulp
```
Start designing.

## Usage.
The `index.html` file in the `dist` is watched and livereloaded. The `bootstrap-theme` and the `main` styles are commented out:
```html
	<!-- Bootstrap, Bootstrap-theme, and main. -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <!-- <link href="css/bootstrap.theme.min.css" rel="stylesheet"> -->
    <!-- <link href="css/main.min.css" rel="stylesheet"> -->
```
But they may be enabled if necessary. The `main.min.css` contains all the bootstrap styles, plus any customization or mixin that we drop in it. If you enable it, don't forget to disable `bootstrap.min.css` since those styles are already included in `main`.

## How I built it.
For those people interested in what I did, very basic stuff:

1. Downloaded the Bootstrap Source Code:
```bash
$ git clone https://github.com/twbs/bootstrap.git
```
2. Deleted about everything except the `LESS`, `fonts` and `JavaScript` folders inside the `source` directory.

## This is what I kept
Inside the `bootstrap/fonts` folder we have:
```
$ cd bootstrap
$ tree fonts
fonts
├── glyphicons-halflings-regular.eot
├── glyphicons-halflings-regular.svg
├── glyphicons-halflings-regular.ttf
├── glyphicons-halflings-regular.woff
└── glyphicons-halflings-regular.woff2
```

Inside the `bootstrap/js` directory:
```
$ cd bootstrap
$ tree js
js
├── affix.js
├── alert.js
├── button.js
├── carousel.js
├── collapse.js
├── dropdown.js
├── modal.js
├── popover.js
├── scrollspy.js
├── tab.js
├── tooltip.js
└── transition.js
```
And inside the `less` folder:
```
$ cd bootstrap
$ tree less
less
├── alerts.less
├── badges.less
├── bootstrap.less
├── breadcrumbs.less
├── button-groups.less
├── buttons.less
├── carousel.less
├── close.less
├── code.less
├── component-animations.less
├── dropdowns.less
├── forms.less
├── glyphicons.less
├── grid.less
├── input-groups.less
├── jumbotron.less
├── labels.less
├── list-group.less
├── media.less
├── mixins
│   ├── alerts.less
│   ├── background-variant.less
│   ├── border-radius.less
│   ├── buttons.less
│   ├── center-block.less
│   ├── clearfix.less
│   ├── forms.less
│   ├── gradients.less
│   ├── grid-framework.less
│   ├── grid.less
│   ├── hide-text.less
│   ├── image.less
│   ├── labels.less
│   ├── list-group.less
│   ├── nav-divider.less
│   ├── nav-vertical-align.less
│   ├── opacity.less
│   ├── pagination.less
│   ├── panels.less
│   ├── progress-bar.less
│   ├── reset-filter.less
│   ├── reset-text.less
│   ├── resize.less
│   ├── responsive-visibility.less
│   ├── size.less
│   ├── tab-focus.less
│   ├── table-row.less
│   ├── text-emphasis.less
│   ├── text-overflow.less
│   └── vendor-prefixes.less
├── mixins.less
├── modals.less
├── navbar.less
├── navs.less
├── normalize.less
├── pager.less
├── pagination.less
├── panels.less
├── popovers.less
├── print.less
├── progress-bars.less
├── responsive-embed.less
├── responsive-utilities.less
├── scaffolding.less
├── tables.less
├── theme.less
├── thumbnails.less
├── tooltip.less
├── type.less
├── utilities.less
├── variables.less
└── wells.less
```
Inside the `less` directory the most important file is the one named `bootstrap`: it imports all of the other `.less` files in the proper order.

## Resulting project structure
Then I created two folders: `src` for all the LESS and JavaScript source files before any processing, and `dist` for the resulting compiled and minified files. Inside this folder I also added the basic HTML template that you can find in the [Bootstrap's officcial site](http://getbootstrap.com/getting-started/#template):
```bash
$ tree -L 2 gualtrapa
gualtrapa
├── README.md
├── dist
│   ├── fonts
│   └── index.html
└── src
    ├── js
    └── less
```
## Used packages
For creating the Gulp workflow I used the following packages:
* [gulp](https://www.npmjs.com/package/gulp) itself, obviously. No introductions required.
* [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer), plugin that adds vendor prefixes automatically when needed.
* [gulp-concat](https://www.npmjs.com/package/gulp-concat), to concatenate files, mainly our JavaScripts.
* [gulp-connect](https://www.npmjs.com/package/gulp-connect), it runs a webserver with **livereload**.
* [gulp-less](https://www.npmjs.com/package/gulp-less) for compiling our LESS to CSS.
* [gulp-load-plugins](https://www.npmjs.com/package/gulp-load-plugins), it loads automatically any plugin listed in our `package.json` file, no need of requiring it in our `gulpfile.js`.
* [gulp-minify-css](https://www.npmjs.com/package/gulp-minify-css), to minify CSS, using [clean-css](https://github.com/jakubpawlowicz/clean-css)
* [gulp-rename](https://www.npmjs.com/package/gulp-rename), plugin to rename files easily.
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify), to minify our JavaScripts using [UglifyJS](https://github.com/mishoo/UglifyJS)
* [gulp-util](https://www.npmjs.com/package/gulp-util), it does interesting stuff like colouring our logs, making very easy to spot errors(they will appear in red).
* [gulp-plumber](https://www.npmjs.com/package/gulp-plumber) This plugin is very important, since it prevents pipe breaking caused by errors from gulp plugins.

## LICENSE
	DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
	                Version 2, December 2004

	Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

	Everyone is permitted to copy and distribute verbatim or modified
	copies of this license document, and changing it is allowed as long
	as the name is changed.

	        DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
	TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

	0. You just DO WHAT THE FUCK YOU WANT TO.
