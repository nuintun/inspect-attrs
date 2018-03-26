/**
 * @module index
 * @license MIT
 * @version 2018/03/26
 */

import typpy from './lib/typpy';

/**
 * @function formatMessage
 * @param {any} message
 * @param {string} keys
 * @returns {string|null}
 */
function formatMessage(message, keys) {
  return typpy(message, String) ? message.replace(/%s/g, keys) : null;
}

/**
 * @function checkTypesOK
 * @param {Array} types
 * @param {any} value
 * @returns {boolean}
 */
function checkTypesOK(types, value) {
  return types.some(type => typpy(value, type));
}

/**
 * @function matchRules
 * @param {any} source
 * @param {string} sourceKey
 * @param {Object} rules
 * @param {string} ruleKey
 */
function matchRules(source, sourceKey, rules, ruleKey) {
  // Get rule
  const rule = rules[ruleKey];

  // If has rule
  if (rule) {
    // If has Required
    if (rule.required && !source.hasOwnProperty(sourceKey)) {
      throw new Error(formatMessage(rule.onRequired, ruleKey) || `Attr ${ruleKey} is required!`);
    }

    // If has type
    if (rule.hasOwnProperty('type')) {
      // Get current
      const current = source[sourceKey];
      // Get types
      const types = Array.isArray(rule.type) ? rule.type : [rule.type];

      // Not passed
      if (!checkTypesOK(types, current)) {
        // Not has default value throw error
        if (!rule.hasOwnProperty('default')) {
          throw new TypeError(formatMessage(rule.onTypeError, ruleKey) || `Attr ${ruleKey} is invalid!`);
        }

        // Has default value
        source[sourceKey] = rule.default;
      }
    }
  }
}

/**
 * @function inspectAttrs
 * @param {Object} source
 * @param {Object} rules
 * @returns {Object}
 */
export default function inspectAttrs(source, rules) {
  // Visit cache
  const visited = new Set();

  // Visit rules
  Object.keys(rules).forEach(key => {
    if (typpy(key, String)) {
      let current = source;
      const attrs = key.split('.');

      // Visit attrs
      return attrs.reduce((attrs, key) => {
        // Add key
        attrs.push(key);

        // Get keys
        const keys = attrs.join('.');

        // Hit cache
        if (!visited.has(keys)) {
          // Add cache
          visited.add(keys);
          // Match rules
          matchRules(current, key, rules, keys);
        }

        // Move current cursor
        current = current[key];

        // Return attrs
        return attrs;
      }, []);
    }

    // Rule key not a string
    matchRules(source, key, rules, key);
  });

  return source;
}

// Export typpy
inspectAttrs.typpy = typpy;
