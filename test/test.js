const { cleanTmpDir, defaultTest } = require('./utils');
/* global describe, beforeEach, afterEach, it */

describe('Test for audiosprite is running', () => {
  beforeEach(cleanTmpDir);
  afterEach(cleanTmpDir);
  it('generates audiosprite files', defaultTest);
});
