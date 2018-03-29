/**
 * @module inspect-attrs
 * @author nuintun
 * @license MIT
 * @version 0.3.3
 * @description An object attributes inspect tool.
 * @see https://github.com/nuintun/inspect-attrs#readme
 */

'use strict';

/**
 * @module typpy
 * @license MIT
 * @version 2018/03/26
 * @see https://github.com/IonicaBizau/typpy
 */

/**
 * @function typpy
 * @description Gets the type of the input value or compares it with a provided type
 * @param {Anything} input The input value
 * @param {Constructor|String} target The target type
 * @returns {String|Boolean}
 */
function typpy(input, target) {
  // If only one arguments, return string type
  if (arguments.length === 1) return typpy.typeof(input, false);

  // If input is NaN, use special check
  if (input !== input) return target !== target || target === 'nan';

  // Other
  return typpy.typeof(input, typpy.typeof(target, true) !== String) === target;
}

/**
 * @function typeof
 * @description Gets the type of the input value. This is used internally
 * @param {Anything} input The input value
 * @param {Boolean} ctor A flag to indicate if the return value should be a string or not
 * @returns {Constructor|String}
 */
typpy.typeof = function(input, ctor) {
  // NaN
  if (input !== input) return ctor ? NaN : 'nan';
  // Null
  if (null === input) return ctor ? null : 'null';
  // Undefined
  if (undefined === input) return ctor ? undefined : 'undefined';

  // Other
  return ctor ? input.constructor : input.constructor.name.toLowerCase();
};

/**
 * @module index
 * @license MIT
 * @version 2018/03/26
 */

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
function inspectAttrs(source, rules) {
  // Visit cache
  const visited = new Set();

  // Visit rules
  Object.keys(rules).forEach(key => {
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
  });

  return source;
}

// Export typpy
inspectAttrs.typpy = typpy;

module.exports = inspectAttrs;
