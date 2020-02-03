// TODO: replace min version in html

// TODO: upload to s3 bucket

const path = require('path');
const fs = require('fs');

const uglify = require('uglify-js');

function copyFileSync(source, target) {
  let targetFile = target;

  //if target is a directory a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source, target) {
  let files = [];

  //check if folder needs to be created or integrated
  let targetFolder = path.join(target, path.basename(source));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  //copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file) {
      let curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory())
        copyFolderRecursiveSync(curSource, targetFolder);
      else
        copyFileSync(curSource, targetFolder);
    });
  }
}

const srcDir = path.join(__dirname, '../public/');
const outputDir = path.join(__dirname, '../build_new/');

// Creating output directories
console.log('Creating output directories');
fs.mkdirSync(outputDir);
fs.mkdirSync(path.join(outputDir, '/scripts/'));
fs.mkdirSync(path.join(outputDir, '/styles/'));

// Copy images
console.log('Copying images...');
copyFolderRecursiveSync(path.join(srcDir, 'images'), outputDir);

// build css
console.log('Building css');
const css = {
  reset: fs.readFileSync(path.join(srcDir, 'styles/reset.css')).toString(),
  main: fs.readFileSync(path.join(srcDir, 'styles/main.css')).toString(),
  trees: fs.readFileSync(path.join(srcDir, 'styles/trees.css')).toString(),
  flickity: fs.readFileSync(path.join(srcDir, 'scripts/3rdparty/flickity/flickity.min.css')).toString()
};
const newCss = `${css['reset']}\n\n${css['main']}\n\n${css['trees']}\n\n${css['flickity']}`;
fs.writeFileSync(path.join(outputDir, 'styles/main.css'), newCss);

// build js
console.log('Building js');
const js = [
  fs.readFileSync(path.join(srcDir, 'scripts/3rdparty/jquery-3.1.1.min.js')).toString(),
  fs.readFileSync(path.join(srcDir, 'scripts/3rdparty/flickity/flickity.min.js')).toString(),
  fs.readFileSync(path.join(srcDir, 'scripts/3rdparty/jTinder/js/jquery.transform2d.js')).toString(),
  fs.readFileSync(path.join(srcDir, 'scripts/3rdparty/jTinder/js/jquery.jTinder.js')).toString(),
  fs.readFileSync(path.join(srcDir, 'scripts/main.js')).toString()
];
const newJs = uglify.minify(js);
fs.writeFileSync(path.join(outputDir, 'scripts/main.js'), newJs.code);

// copy index.html and replace tags

