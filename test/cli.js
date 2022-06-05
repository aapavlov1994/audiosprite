#!/usr/bin/env node

const fs = require('fs');
const winston = require('winston');
const { createSprite } = require('../build');
const argv = require('./getArgs');

const opts = { ...argv };

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  colorize: true,
  level: argv.log,
  handleExceptions: false,
});
winston.debug('Parsed arguments', argv);

opts.logger = winston;

opts.bitrate = parseInt(argv.bitrate, 10);
opts.rawparts = JSON.parse(argv.rawparts);
opts.samplerate = parseInt(argv.samplerate, 10);
opts.channels = parseInt(argv.channels, 10);
opts.gap = parseFloat(argv.gap);
opts.minlength = parseFloat(argv.minlength);
opts.vbr = parseInt(argv.vbr, 10);
opts['vbr:vorbis'] = parseInt(argv['vbr:vorbis'], 10);
opts.loop = argv.loop ? [].concat(argv.loop) : [];
opts.ignorerounding = parseInt(argv.ignorerounding, 10);

const files = [...new Set(argv._)];

if (argv.help || !files.length) {
  if (!argv.help) {
    winston.error('No input files specified.');
  }
  winston.info('Usage: audiosprite [options] file1.mp3 file2.mp3 *.wav');
  process.exit(1);
}

createSprite(files, opts)
  .then(
    (obj) => {
      console.log(obj);
      const jsonfile = `${opts.output}.json`;
      fs.writeFileSync(jsonfile, JSON.stringify(obj, null, 2));
      winston.info('Exported json OK', { file: jsonfile });
      winston.info('All done');
    },
    (err) => {
      winston.error(err);
      process.exit(0);
    },
  );
