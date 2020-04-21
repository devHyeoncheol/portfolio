'use strict';
/*
 * gulp-nts-css-formatter
 * http://gitlab2.uit.nhncorp.com/gulp-plugins/gulp-nts-css-formatter
 *
 * Copyright (c) 2015 Keonjun Lee <ch4feel@nhn.com>
 * Licensed under the MIT license.
 */
var through = require('through2');
var gutil = require('gulp-util');

module.exports = function () {

    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-nts-css-formatter', 'Streaming not supported'));
            return cb();
        }

        var output = file.contents.toString();

        output = output.replace(/^\s*[\r\n]/gm, '')
                .replace(/ { /g, '{')
                .replace(/, /g, ',')
                .replace(/ : /g, ':')
                .replace(/: /g, ':')
                .replace(/; }/g, '}')
                .replace(/; /g, ';')
                .replace(/  /g, '\t')
                .replace(/px\)\{/g, 'px) {\n\t')
                .replace(/\} \}/g, '}\n}');

        file.contents = new Buffer(output);

        this.push(file);
        return cb();
    });
};
