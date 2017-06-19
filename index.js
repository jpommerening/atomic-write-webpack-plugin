'use strict';

const atomicWrite = require('atomic-write');
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
      const atomicWriteFileSystem = new atomicWrite.Context();
      this.writeFile = atomicWriteFileSystem.writeFile.bind(atomicWriteFileSystem);
    }
    else {
      this.writeFile = fs.writeFile;
    }
  }
}

module.exports = class AtomicWritePlugin {
  apply(compiler) {
    compiler.plugin('after-environment', () => {
      compiler.outputFileSystem = new AtomicOutputFileSystem(fs);
    });
  }
};
