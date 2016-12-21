#!/usr/bin/env node

var cld    = require('../index');
var data   = require('./data');
var assert = require('assert');
var _      = require('underscore');

function runCoreTests(detected) {
  _.each(data.all, function(val, key) {
    var result = cld.detect(val.sample);
    assert.equal(result.error, false);
    assert.equal(_.isArray(result.result.languages), true);
    assert.equal(result.result.languages.length > 0, true);
    assert.equal(val.name, result.result.languages[0].name);

    detected[val.name] = true;
  });
}

function runChunkTests() {
  _.each(data.all, function(val, key) {
    var result = cld.detect(val.sample);
    assert.equal(result.result.textBytes > 0, true);
    if (val.sample == data.frEnLatn) {
      assert.equal(_.isArray(result.result.chunks), true);
      assert.equal(result.result.chunks.length, 3);

      var chunkCodes = _.pluck(result.result.chunks, 'code');
      assert.deepEqual(chunkCodes, ['en', 'fr', 'en'])
    }
  });
}

function runEncodingHintTests() {
  _.each(data.all, function(item, idx) {
    _.each(cld.ENCODINGS, function(encoding, idx) {
      var result = cld.detect(item.sample, {encodingHint:encoding});
      assert.equal(result.error, false);
      assert.equal(_.isArray(result.result.languages), true);
      assert.equal(result.result.languages.length > 0, true);
    });
  });

  var result = cld.detect(data.all[0].sample, {encodingHint:'p'});
  assert.equal(result.error, 'Invalid encodingHint, see ENCODINGS');
}

function runLanguageHintTests() {
  _.each(data.all, function(item, idx) {
    _.each(_.keys(cld.LANGUAGES), function(name, idx) {
      var result =  cld.detect(item.sample, {languageHint:name});
      if (result.error) {
        assert.equal(result.error, 'Failed to identify language');
      }
      else {
        assert.equal(result.error, false);
        assert.equal(_.isArray(result.result.languages), true);
      }
    });
    _.each(_.values(cld.LANGUAGES), function(code, idx) {
      var result = cld.detect(item.sample, {languageHint:code});
      if (result.error) {
        assert.equal(result.error, 'Failed to identify language');
      }
      else {
        assert.equal(result.error, false);
        assert.equal(_.isArray(result.result.languages), true);
      }
    });
  });

  var result = cld.detect(data.all[0].sample, {languageHint:'foo-bar-bas'});
  assert.equal(result.error, 'Invalid languageHint, see LANGUAGES');
}

function runTldHintTests() {
  _.each(data.all, function(item, idx) {
    var result =  cld.detect(item.sample, {tldHint:'edu'});
    assert.equal(result.error, false);
    assert.equal(_.isArray(result.result.languages), true);
    assert.equal(result.result.languages.length > 0, true);
    
    result = cld.detect(item.sample, {tldHint:'com'});
    assert.equal(result.error, false);
    assert.equal(_.isArray(result.result.languages), true);
    assert.equal(result.result.languages.length > 0, true);
    
    result = cld.detect(item.sample, {tldHint:'id'});
    assert.equal(result.error, false);
    assert.equal(_.isArray(result.result.languages), true);
    assert.equal(result.result.languages.length > 0, true);
  });
}

function runHttpHintTests() {
  _.each(data.all, function(item, idx) {
    var result = cld.detect(item.sample, {httpHint:'mi,en'});
    if (result.error) {
      assert.equal(result.error, 'Failed to identify language');
    } else {
      assert.equal(result.error, false);
      assert.equal(_.isArray(result.result.languages), true);
    }
  });
}

function runUnreliableTests() {
  var result = cld.detect('interaktive infografik \xc3\xbcber videospielkonsolen');
  assert.equal(result.error, 'Failed to identify language');
}

function runCrossCheckTests(detected) {
  // Confirm that we didn't detect languages that are not listed in DETECTED_LANGUAGES
  _.each(_.values(cld.DETECTED_LANGUAGES), function(val, key) {
    delete detected[val];
  });

  assert.equal(_.keys(detected), 0);
}


var detected = {};

runCoreTests(detected);
runChunkTests();
runEncodingHintTests();
runLanguageHintTests();
runTldHintTests();
runHttpHintTests();
runUnreliableTests();
runCrossCheckTests(detected);


