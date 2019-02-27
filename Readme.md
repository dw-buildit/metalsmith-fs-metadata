
# metalsmith-fs-metadata

  A metalsmith plugin to load global metadata from files.

  Supports `.json` and `.yaml` data.

## Installation

    $ npm install metalsmith-fs-metadata

## CLI Usage

  Install via npm and then add the `metalsmith-fs-metadata` key to your `metalsmith.json` plugins. Each key in the dictionary of options will be the key mixed into the global metadata, like so:

```json
{
  "plugins": {
    "metalsmith-fs-metadata": {
      "authors": "./path/to/authors.json",
      "categories": "./path/to/categories.yaml"
    }
  }
}
```

## Javascript Usage

  Pass the options to `Metalsmith#use`:

```js
var metadata = require('metalsmith-fs-metadata');

metalsmith.use(metadata({
  authors: './path/to/authors.json',
  categories: './path/to/categories.yaml'
}));
```

## License

  MIT
