var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('reloadCSS', function(){
	return gulp.src('./app/buffor/styles/styles.css')
	.pipe(browserSync.stream());
});

gulp.task('watch', function(){
	
	browserSync.init({
		server: { 
			baseDir: "app"
		}
	});
	
	watch('./app/index.html',function () {
		console.log('HTML changed!');
		browserSync.reload();
	});	
	
	watch('./app/assets/scripts/**/*.js',function () {
		console.log('JAVA changed!');
		browserSync.reload();
	});	
	
	watch('./app/assets/styles/**/*.css', gulp.series("buildCSS", "reloadCSS", function () {
		console.log('CSS updated and browser refresh!');					
	}));	
		
});