const assert = require('assert');
const path = require('path');
const fs = require('fs');
const winston = require('winston');
const { createSprite } = require('../build');

const {
  OUTPUT, TMPDIR, sounds,
} = require('./consts');

function checkOutput() {
  let file; let
    stat;

  const jsonFile = path.join(TMPDIR, `${OUTPUT}.json`);
  assert.ok(fs.existsSync(jsonFile), 'JSON file does not exist');

  let json;
  assert.doesNotThrow(() => {
    json = JSON.parse(fs.readFileSync(jsonFile));
  }, 'invalid json');

  console.log(json);

  // Test resources array.

  assert.ok(json.resources, 'no resources list');
  assert.ok(json.resources.length >= 4, 'not enough resources');

  json.resources.forEach((resource) => {
    file = path.join(TMPDIR, resource);
    assert.ok(fs.existsSync(file), `File not found: ${resource}`);
    stat = fs.statSync(file);
    assert.ok(stat.size > 9000, `File too small${resource}`);
  });

  // Test spritemap.

  assert.ok(json.spritemap.beep, 'beep not found in sprite');
  assert.strictEqual(json.spritemap.beep.start, 0, 'beep start time not 0');
  assert.ok(Math.abs(1.75 - json.spritemap.beep.end) < 0.05, 'beep end time not 1.77');
  assert.strictEqual(json.spritemap.beep.loop, false, 'beep should not be looping');

  assert.ok(json.spritemap.boop, 'boop not found in sprite');
  assert.strictEqual(json.spritemap.boop.start, 3, 'boop start time not 3');
  assert.ok(Math.abs(4.25 - json.spritemap.boop.end) < 0.05, 'boop end time not 4.27');
  assert.strictEqual(json.spritemap.boop.loop, true, 'boop should not be looping');

  assert.strictEqual(json.autoplay, 'boop', 'boop is not set as autoplay');

  // Test rawparts.

  file = path.join(TMPDIR, `${OUTPUT}_0.mp3`);
  assert.ok(fs.existsSync(file), 'no beep raw part file found');
  stat = fs.statSync(file);
  assert.ok(stat.size > 10000, 'beep raw part too small');

  file = path.join(TMPDIR, `${OUTPUT}_1.mp3`);
  assert.ok(fs.existsSync(file), 'no boop raw part file found');
  stat = fs.statSync(file);
  assert.ok(stat.size > 10000, 'boop raw part too small');
}

function cleanTmpDir() {
  fs.readdirSync(TMPDIR).forEach((file) => {
    if (/^audiosprite/.test(file)) {
      fs.unlinkSync(path.join(TMPDIR, file));
    }
  });
}

function defaultTest() {
  this.timeout(100000);
  process.chdir(TMPDIR);
  winston.remove(winston.transports.Console);
  winston.add(winston.transports.Console, {
    colorize: true,
    level: 'debug',
    handleExceptions: false,
  });

  return createSprite(sounds, {
    rawparts: ['mp3'],
    output: OUTPUT,
    autoplay: 'boop',
    logger: winston,
  }).then(
    (data) => {
      const jsonfile = `${OUTPUT}.json`;
      fs.writeFileSync(jsonfile, JSON.stringify(data));
      winston.info('Exported json OK', { file: jsonfile });
      winston.info('All done');
      checkOutput();
    },
    (err) => {
      assert.fail(`audiosprite returned with error code. debug = ${err}`);
    },
  );
}

module.exports = {
  cleanTmpDir,
  defaultTest,
};
