var _    = require('underscore');
var cld2 = require('./build/Release/cld');

module.exports = {
  LANGUAGES          : cld2.LANGUAGES,
  DETECTED_LANGUAGES : cld2.DETECTED_LANGUAGES,
  ENCODINGS          : cld2.ENCODINGS,

  detect : function (text, options) { //
    if ( arguments.length < 1 ) {
      return;
    }
    if ( arguments.length < 2 ) {
      options = {};
    }

    if ( !_.isString(text) || text.length < 1 ) {
      return {error: 'Empty or invalid text'};
    }

    var defaults = {
      isHTML       : false,
      languageHint : '',
      encodingHint : '',
      tldHint      : '',
      httpHint     : ''
    };
    options = _.defaults(options, defaults);

    if ( !_.isBoolean(options.isHTML) ) {
      return {error: 'Invalid isHTML value'};
    }
    if ( !_.isString(options.languageHint) ) {
      return {error: 'Invalid languageHint'};
    }
    if ( !_.isString(options.encodingHint) ) {
      return {error: 'Invalid encodingHint'};
    }
    if ( !_.isString(options.tldHint) ) {
      return {error: 'Invalid tldHint'};
    }
    if ( !_.isString(options.httpHint) ) {
      return {error: 'Invalid httpHint'};
    }
    if ( options.encodingHint.length > 0 &&
      !~cld2.ENCODINGS.indexOf(options.encodingHint) ) {

      return {error: 'Invalid encodingHint, see ENCODINGS'};
    }
    if ( options.languageHint.length > 0 &&
      !~_.keys(cld2.LANGUAGES).indexOf(options.languageHint) &&
      !~_.values(cld2.LANGUAGES).indexOf(options.languageHint) ) {

      return {error: 'Invalid languageHint, see LANGUAGES'};
    }

    var result = cld2.detect(
      text,
      !options.isHTML,
      options.languageHint,
      options.encodingHint,
      options.tldHint,
      options.httpHint
    );

    if ( result.languages.length < 1 ) {
      return {error: 'Failed to identify language'};
    }
    return {error: false, result: result};
  }
};
