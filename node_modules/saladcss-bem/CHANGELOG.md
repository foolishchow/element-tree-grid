0.4.1 (2015-12-15)
  - Fix deprecation warnings (#10, #11)

0.4.0 (2015-10-26)
  - Update postcss to v5.0.8 (#8)

0.3.2 (2015-09-24)
  - Parse modifiers inside of descendents (#6)
  - Remove node@0.10 and add node@4.0.0 and node@4.1.1 to .travis.yml

0.3.1 (2015-08-24)
  - Allow overriding separators (#3)

0.3.0 (2015-06-11)
  - Rename `@namespace` to `@component-namespace` (#2)
  - Add BEM support (#2)

0.2.0 (2015-06-10)
  - Separate utility name in `@utility` rules from variant by space instead of
      comma
  - Allow using multiple utility names in `@utility` rules
  - Fix multiple bugs concerning the parent of nodes
  - Make `@when` rules usable inside any rule
  - `@utility` now throws when no names are supplied
