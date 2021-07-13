"use strict";
exports.__esModule = true;
var mixIn_1 = require("../object/mixIn");
var en_US_1 = require("./i18n/en-US");
// we also use mixIn to make sure we don't affect the original locale
var activeLocale = mixIn_1["default"]({}, en_US_1["default"], {
    // we expose a "set" method to allow overriding the global locale
    set: function (localeData) {
        mixIn_1["default"](activeLocale, localeData);
    }
});
exports["default"] = activeLocale;
