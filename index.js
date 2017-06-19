'use strict';

const NodeOutputFileSystem = require('webpack/lib/node/NodeOutputFileSystem');

class AtomicOutputFileSystem {
  constructor(fs) {
    this.mkdirp = fs.mkdirp;
    this.mkdir = fs.mkdir;
    this.rmdir = fs.rmdir;
    this.unlink = fs.unlink;
    this.writeFile = fs.writeFile;
    this.join = fs.join;

    if (fs instanceof NodeOutputFileSystem) {
      this.writeFile = require('atomic-write').writeFile;
    }
    else {
      this.writeFile = fs.writeFile;
    }
  }
}

module.exports = class AtomicWritePlugin {
  apply(compiler) {
    compiler.plugin("after-environment", () => {
      compiler.outputFileSystem = new AtomicWritePlugin(fs);
    });
  }
};
