"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Http2 = exports.pluginId = void 0;
const http2_1 = require("./http2");
Object.defineProperty(exports, "Http2", { enumerable: true, get: function () { return http2_1.Http2; } });
// Note these should match values in plugin-package.json
const pluginName = '@tremho/nativescript-http2';
const pluginVersion = '1.0.0';
function pluginId() {
    return `${pluginName} v${pluginVersion}`;
}
exports.pluginId = pluginId;
