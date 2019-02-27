
var assert = require('assert');
var exists = require('fs').existsSync;
var Metalsmith = require('metalsmith');
var metadata = require('..');

describe('metalsmith-metadata', function(){
  it('should error for malformed data', function(done){
    var m = Metalsmith('test/fixtures').use(metadata({ file: 'test/fixtures/malformed/data.json' }));
    m.build(function(err){
      assert(err);
      assert.equal(err.message, 'Err: SyntaxError: Unexpected token \n in JSON at position 8. File: test/fixtures/malformed/data.json');
      done();
    });
  });

  it('should parse JSON', function(done){
    var m = Metalsmith('test/fixtures').use(metadata({ file: 'test/fixtures/json/data.json' }));
    m.build(function(err){
      if (err) return done(err);
      assert.deepEqual(m.metadata().file, { string: 'string' });
      done();
    });
  });

  it('should parse a multiple files for the same key overwriting earlier loaded variables', function(done){
    var m = Metalsmith('test/fixtures')
      .use(metadata({ file: 'test/fixtures/duplicate/data.json' }))
      .use(metadata({ file: 'test/fixtures/duplicate/data2.json' }));
    m.build(function(err){
      if (err) return done(err);
      assert.deepEqual(m.metadata().file, { string: 'string2', data: true, data2: true });
      done();
    });
  });

  it('should parse YAML', function(done){
    var m = Metalsmith('test/fixtures').use(metadata({ file: 'test/fixtures/yaml/data.yaml' }));
    m.build(function(err){
      if (err) return done(err);
      assert.deepEqual(m.metadata().file, { string: 'string' });
      done();
    });
  });

  it('should parse nested path', function(done){
    var m = Metalsmith('test/fixtures').use(metadata({ file: 'test/fixtures/nested/path/data.yaml' }));
    m.build(function(err){
      if (err) return done(err);
      assert.deepEqual(m.metadata().file, { string: 'string' });
      done();
    });
  });

  it('should parse nested path with backslash', function(done){
    var m = Metalsmith('test/fixtures').use(metadata({ file: 'test/fixtures/nested/path\\data.yaml' }));
    m.build(function(err){
      if (err) return done(err);
      assert.deepEqual(m.metadata().file, { string: 'string' });
      done();
    });
  });

  it('should parse deep nested path', function(done){
    var m = Metalsmith('test/fixtures').use(metadata({ file: 'test/fixtures/deep-nested/path/path/data.yaml' }));
    m.build(function(err){
      if (err) return done(err);
      assert.deepEqual(m.metadata().file, { string: 'string' });
      done();
    });
  });
});
