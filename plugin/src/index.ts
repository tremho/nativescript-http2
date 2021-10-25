
import {Http2} from "./http2"

// Note these should match values in plugin-package.json
const pluginName = '@tremho/nativescript-http2'
const pluginVersion = '1.0.0'

export function pluginId() {
    return `${pluginName} v${pluginVersion}`
}
export {Http2 as Http2}

