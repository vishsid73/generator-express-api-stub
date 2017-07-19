var fs       = require('fs-extra');
var path     = require('path');

var source_folder = './apidoc-ms/';
var destination_folder = './apidoc-ms/api_data.js';

var data = [];
fs.readdirSync(source_folder)
    .forEach(function(file) {
        if(file.indexOf('_ms.json') !== -1){
            var d = JSON.parse(fs.readFileSync(source_folder+file, 'utf8'));
            if(Array.isArray(d)){
                data = data.concat(d);
            }
        }
    });
fs.writeFileSync(destination_folder, 'define({ "api": ' + JSON.stringify(data) + ' });' + '\n');
console.log(data);


