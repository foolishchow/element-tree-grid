## 2.1.0 (2016-10-18)

- Added: Use css being imported with `addDepedencyTo`
- Added: `resolve` option to override resolving paths
- Updated: Improve ability to resolve npm modules

## 2.0.0 (2016-07-01)

- Added: Imports look in node_modules, bower_components, etc
- Added: `dirs` lets imports look in user specified directories
- Added: `plugins` lets PostCSS plugins run over individual partials
- Removed: Caching (for now)
- Updated: Complete rewrite of the plugin
- Updated: `extension` now includes the dot (e.g. `.css`)

## 1.3.0 (2015-09-14)

- Added: Support for generating imported files
- Updated: Switched to `fs-promise` from `fs` and `mkdirp`
- Updated: Switched to `assign` from `_extend`

## 1.2.0 (2015-09-09)

- Added: Support for media queries
- Added: Support for caching sources

## 1.1.1 (2015-09-08)

- Fixed: Plugins no longer run on imports

## 1.1.0 (2015-09-08)

- Updated: Refactored code
- Removed: `root` option

## 1.0.1 (2015-09-08)

- Fixed: Package dependencies
- Fixed: Documented syntax

## 1.0.0 (2015-09-07)

- Added: Initial release
