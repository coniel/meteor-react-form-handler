Utils = {
    cleanNulls: function cleanNulls(doc, isArray, keepEmptyStrings) {
        var newDoc = isArray ? [] : {};
        _.each(doc, function(val, key) {
            if (!_.isArray(val) && isBasicObject(val)) {
                val = cleanNulls(val, false, keepEmptyStrings); //recurse into plain objects
                if (!_.isEmpty(val)) {
                    newDoc[key] = val;
                }
            } else if (_.isArray(val)) {
                val = cleanNulls(val, true, keepEmptyStrings); //recurse into non-typed arrays
                if (!_.isEmpty(val)) {
                    newDoc[key] = val;
                }
            } else if (!Utils.isNullUndefinedOrEmptyString(val)) {
                newDoc[key] = val;
            } else if (keepEmptyStrings && typeof val === "string" && val.length === 0) {
                newDoc[key] = val;
            }
        });
        return newDoc;
    },
    /**
     * @method Util.isNullUndefinedOrEmptyString
     * @private
     * @param  {Any} val
     * @return {Boolean}
     *
     * Returns `true` if the value is null, undefined, or an empty string
     */
    isNullUndefinedOrEmptyString: function isNullUndefinedOrEmptyString(val) {
        return (val === void 0 || val === null || (typeof val === "string" && val.length === 0));
    }
};

// getPrototypeOf polyfill
if (typeof Object.getPrototypeOf !== "function") {
    if (typeof "".__proto__ === "object") {
        Object.getPrototypeOf = function(object) {
            return object.__proto__;
        };
    } else {
        Object.getPrototypeOf = function(object) {
            // May break if the constructor has been tampered with
            return object.constructor.prototype;
        };
    }
}

/* Tests whether "obj" is an Object as opposed to
 * something that inherits from Object
 *
 * @param {any} obj
 * @returns {Boolean}
 */
var isBasicObject = function(obj) {
    return _.isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype;
};

/*
 * Extend SS for now; TODO put this in SS package
 */
if (typeof SimpleSchema.prototype.getAllowedValuesForKey !== 'function') {
    SimpleSchema.prototype.getAllowedValuesForKey = function (key) {
        var defs = this.getDefinition(key, ['type', 'allowedValues']);

        // For array fields, `allowedValues` is on the array item definition
        if (defs.type === Array) {
            defs = this.getDefinition(key+".$", ['allowedValues']);
        }

        return defs.allowedValues;
    };
}