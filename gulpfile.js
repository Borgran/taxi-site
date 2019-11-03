var gulp = require('gulp'),
watch = require('gulp-watch'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested');

function defaultTask(task_name){
	task_name();
}
exports.default = defaultTask;

gulp.task('watch',function(){
	watch('./app/index.html',function () {
		console.log('HTML changed!');
	});	
	watch('./app/assets/styles/**/*.css',function () {
		console.log('CSS changed!');
		return gulp.src('./app/assets/styles/styles.css')
		.pipe(postcss([autoprefixer, cssvars, nested]))
		.pipe(gulp.dest('./app/temp/styles'));
		
	});	
});

