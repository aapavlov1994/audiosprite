const path = require('path');
const os = require('os');

const OUTPUT = `audiosprite-test-out${Math.trunc((Math.random() * 1e6))}`;
const TMPDIR = os.tmpdir() || '.';

const sounds = [
  path.join(__dirname, 'sounds/beep.mp3'),
  path.join(__dirname, 'sounds/boop.wav'),
];

module.exports = {
  OUTPUT,
  TMPDIR,
  sounds,
};
