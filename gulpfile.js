const gulp        = require('gulp')
    , sass        = require('gulp-sass')
    , sourcemaps  = require('gulp-sourcemaps')
    , cleancss    = require('gulp-clean-css')
    , rename      = require('gulp-rename')
    , postcss     = require('gulp-postcss')
    , prefixer    = require('postcss-prefixer')

// ----------------------------------------------------------------------------
// Definitions
// ----------------------------------------------------------------------------

const CSSBUILDPATH = './dist/css'
const PREFIXCONF = { 
    // Prefix name
    prefix: 'bs-', 
    ignore: [
        /#\w+/, 
        /^.swiper/, 
        /^.js/, 
        /^.is/, 
        /^.has/,
        /^.admin/,
        // Prefix name
        /^.bs/
    ]
}

sass.compiler = require('sass')

gulp.task('build:sass', taskBuildSass)
gulp.task('minify:css', taskMinifyCSS)
gulp.task('build:css', gulp.series(taskBuildSass, taskMinifyCSS))

// ----------------------------------------------------------------------------
// Tasks
// ----------------------------------------------------------------------------

/**
 * Task Build Sass
 * 
 * @return {Function}
 * @since 0.0.1
 */
function taskBuildSass () {
    const plugins = [prefixer(PREFIXCONF)]

    return gulp.src('./index.sass')
               .pipe(sass())
               .pipe(postcss(plugins))
               .pipe(gulp.dest(CSSBUILDPATH))
}

/**
 * Task Minify CSS
 * 
 * @return {Function}
 * @since 0.0.1
 */
 function taskMinifyCSS () {
    return gulp.src([`${CSSBUILDPATH}/index.css`])
               .pipe(gulp.dest(CSSBUILDPATH))
               .pipe(sourcemaps.init())
               .pipe(cleancss())
               .pipe(rename({ suffix: '.min' }))
               .pipe(sourcemaps.write('.'))
               .pipe(gulp.dest(CSSBUILDPATH))
}
