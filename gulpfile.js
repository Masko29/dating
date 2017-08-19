var gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sass         = require ('gulp-sass'),
    browserSync  = require('browser-sync');;

gulp.task('auto', function () {
    return gulp.src('app/css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 20 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css/'));
});

gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src('app/sass/**/*.scss') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
    gulp.watch('app/sass/**/*.scss', ['sass']); // Наблюдение за sass файлами
    gulp.watch('app/*.html', browserSync.reload);// Наблюдение за другими типами файлов
    gulp.watch('app/js/**/*.js', browserSync.reload);// Наблюдение за другими типами файлов
});