**1.0.3**
- Bugfixes:
  - package.json `main` field was set wrong

**1.0.2**
- Bugfixes:
  - createElement function would render attributes like `className` as it is under some circumstances
  - `getValues()` method was not working on the types `checkbox`, `radio`, and `select-multiple`
- Enhancements:
  - Added `libraryExport`: `default` in webpack config
  - `getElements()` is now available on single pages and the whole form
  - `getValues()` is now available on single pages and the whole form 

**1.0.1**
- Bugfixes: 
  - Fixed an error where importing the library from node_modules was not possible
- Enhancements: 
  - Added amd, umd, esm and cjs versions
- Code Quality:
  - Fixed some TypeScript Errors

**1.0.0**
- Initial release
