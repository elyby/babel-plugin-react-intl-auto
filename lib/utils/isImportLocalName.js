"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isImportLocalName = void 0;

const isImportLocalName = (name, allowedNames, {
  file,
  opts: {
    moduleSourceName = 'react-intl'
  }
}) => {
  let isImported = false;

  if (file && file.path) {
    file.path.traverse({
      ImportDeclaration: {
        exit(path) {
          const specifiers = path.get('specifiers');
          isImported = path.node.source.value.includes(moduleSourceName) && specifiers.some(specifier => {
            return specifier.isImportSpecifier() && allowedNames.includes(specifier.node.imported.name) && (!name || specifier.node.local.name === name);
          });

          if (isImported) {
            path.stop();
          }
        }

      }
    });
  }

  return isImported;
};

exports.isImportLocalName = isImportLocalName;