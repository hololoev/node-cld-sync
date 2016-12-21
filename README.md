# node-cld-sync

Synchronously Language detection for Javascript. Originally based on async node cld (https://github.com/dachev/node-cld) library.

## Installation

```bash
$ npm install cld-sync
```

Linux users, make sure you have g++ >= 4.8. If this is not an option, you should be able to install node-cld 2.4.4 even with an older g++ build.

## Examples
### Simple
```js
 console.log( require('cld').detect('This is a language recognition example') );
```

### Advanced
```js
var text    = 'Това е пример за разпознаване на Български език';
var options = {
  isHTML       : false,
  languageHint : 'BULGARIAN',
  encodingHint : 'ISO_8859_5',
  tldHint      : 'bg',
  httpHint     : 'bg'
};
var cld = require('cld');
console.log( cld.detect(text, options) );
```

## Options

#### isHTML

Set to true if the string contains HTML tags

#### languageHint

Pass a LANGUAGES key or value as a hint

#### encodingHint

Pass an ENCODINGS value as a hint

#### tldHint

Pass top level domain as a hint

#### httpHint

Pass an HTTP "Content-Encoding" value as a hint

## Warning
Once the module has been installed, the underlying C source will remain in the ```deps/cld``` folder and continue to occupy considerable space. If you are under severe constraints you can delete this folder and reclam >100M

## Copyright
Copyright 2016, Ilya Yurchenko.

## License
Apache 2
