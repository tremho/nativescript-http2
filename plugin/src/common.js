"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientHttp2Stream = exports.SessionRequestOptions = exports.ClientHttp2Session = exports.Http2Settings = exports.http2 = exports.Http2ConnectOptions = exports.Http2Base = void 0;
/**
 * This is the base class for the Http2 implementation.
 * It defines the public API and any common implementation between platforms
 *
 * See http2.android.ts and http2.ios.ts for platform implementation code
 *
 * This API is modeled after the Node http2 API, and many of the class structure and constants defined here
 * were copied from the Node docs.  However, implementation is limited to the immediate needs of this plugin
 * for its original use, and therefore many of the options described here may be unimplemented in early versions.
 *
 */
class Http2Base {
    connect(authority, options, listener) {
        console.log('Http2Base connect returns empty session');
        return new ClientHttp2Session();
    }
}
exports.Http2Base = Http2Base;
class Http2ConnectOptions {
    constructor() {
        this.maxDeflateDynamicTableSize = 4096; //Sets the maximum dynamic table size for deflating header fields. Default: 4Kib.
        this.maxSettings = 32; //Sets the maximum number of settings entries per SETTINGS frame. The minimum value allowed is 1. Default: 32.
        this.maxSessionMemory = 10; // Sets the maximum memory that the Http2Session is permitted to use. The value is expressed in terms of number of megabytes, e.g. 1 equal 1 megabyte. The minimum value allowed is 1. This is a credit based limit, existing Http2Streams may cause this limit to be exceeded, but new Http2Stream instances will be rejected while this limit is exceeded. The current number of Http2Stream sessions, the current memory use of the header compression tables, current data queued to be sent, and unacknowledged PING and SETTINGS frames are all counted towards the current limit. Default: 10.
        this.maxHeaderListPairs = 128; // Sets the maximum number of header entries. This is similar to http.Server#maxHeadersCount or http.ClientRequest#maxHeadersCount. The minimum value is 1. Default: 128.
        this.maxOutstandingPings = 10; //Sets the maximum number of outstanding, unacknowledged pings. Default: 10.
        this.maxReservedRemoteStreams = 200; // Sets the maximum number of reserved push streams the client will accept at any given time. Once the current number of currently reserved push streams exceeds reaches this limit, new push streams sent by the server will be automatically rejected. The minimum allowed value is 0. The maximum allowed value is 2232-1. A negative value sets this option to the maximum allowed value. Default: 200.
        this.paddingStrategy = 0; //Strategy used for determining the amount of padding to use for HEADERS and DATA frames.
        // Default: http2.constants.PADDING_STRATEGY_NONE. Value may be one of:
        // http2.constants.PADDING_STRATEGY_NONE: No padding is applied.
        // http2.constants.PADDING_STRATEGY_MAX: The maximum amount of padding, determined by the internal implementation, is applied.
        // http2.constants.PADDING_STRATEGY_ALIGNED: Attempts to apply enough padding to ensure that the total frame length, including the 9-byte header, is a multiple of 8. For each frame, there is a maximum allowed number of padding bytes that is determined by current flow control state and settings. If this maximum is less than the calculated amount needed to ensure alignment, the maximum is used and the total frame length is not necessarily aligned at 8 bytes.
        this.peerMaxConcurrentStreams = 100; // Sets the maximum number of concurrent streams for the remote peer as if a SETTINGS frame had been received. Will be overridden if the remote peer sets its own value for maxConcurrentStreams. Default: 100.
        this.protocol = 'https:'; // The protocol to connect with, if not set in the authority. Value may be either 'http:' or 'https:'. Default: 'https:'
        this.unknownProtocolTimeout = 10000; // Specifies a timeout in milliseconds that a server should wait when an 'unknownProtocol' event is emitted. If the socket has not been destroyed by that time the server will destroy it. Default: 10000.
        // ... Any net.connect() or tls.connect() options can be provided.
    }
}
exports.Http2ConnectOptions = Http2ConnectOptions;
exports.http2 = {
    constants: {
        NO_ERROR: 0,
        PROTOCOL_ERROR: 1,
        INTERNAL_ERROR: 2,
        FLOW_CONTROL_ERROR: 3,
        SETTINGS_TIMEOUT: 4,
        STREAM_CLOSED: 5,
        FRAME_SIZE_ERROR: 6,
        REFUSED_STREAM: 7,
        CANCEL: 8,
        COMPRESSION_ERROR: 9,
        CONNECT_ERROR: 10,
        ENHANCE_YOUR_CALM: 11,
        INADEQUATE_SECURITY: 12,
        HTTP_1_1_REQUIRED: 13,
        // TODO: Not sure of these values; can't find values in node docs
        PADDING_STRATEGY_NONE: 0,
        PADDING_STRATEGY_MAX: 1,
        PADDING_STRATEGY_ALIGNED: 2,
    }
};
class Http2Settings {
    constructor() {
        this.headerTableSize = 4096; //Specifies the maximum number of bytes used for header compression. The minimum allowed value is 0. The maximum allowed value is 2232-1. Default: 4096.
        this.enablePush = true; //  Specifies true if HTTP/2 Push Streams are to be permitted on the Http2Session instances. Default: true.
        this.initialWindowSize = 65535; // Specifies the sender's initial window size in bytes for stream-level flow control. The minimum allowed value is 0. The maximum allowed value is 232-1. Default: 65535.
        this.maxFrameSize = 16384; //Specifies the size in bytes of the largest frame payload. The minimum allowed value is 16,384. The maximum allowed value is 2224-1. Default: 16384.
        this.maxConcurrentStreams = 4294967295; //Specifies the maximum number of concurrent streams permitted on an Http2Session. There is no default value which implies, at least theoretically, 232-1 streams may be open concurrently at any given time in an Http2Session. The minimum value is 0. The maximum allowed value is 232-1. Default: 4294967295.
        this.maxHeaderListSize = 65535; // Specifies the maximum size (uncompressed octets) of header list that will be accepted. The minimum allowed value is 0. The maximum allowed value is 2232-1. Default: 65535.
        this.enableConnectProtocol = false; //Specifies true if the "Extended Connect Protocol" defined by RFC 8441 is to be enabled. This setting is only meaningful if sent by the server. Once the enableConnectProtocol setting has been enabled for a given Http2Session, it cannot be disabled. Default: false.
    }
}
exports.Http2Settings = Http2Settings;
class ClientHttp2Session {
    request(headers, options) {
        console.log('Base version of ClientHttp2Session returns empty stream');
        return new ClientHttp2Stream();
    }
}
exports.ClientHttp2Session = ClientHttp2Session;
class SessionRequestOptions {
}
exports.SessionRequestOptions = SessionRequestOptions;
class ClientHttp2Stream {
    constructor() {
        this.eventHandler = {};
    }
    on(event, callback) {
        this.eventHandler[event] = callback;
        console.log('eventhandler for ' + event + ' registered', this.eventHandler);
    }
    handleEvent(event, eventData) {
        const fn = this.eventHandler[event];
        // console.log('handling event for ',event, fn)
        if (fn)
            fn(eventData);
    }
}
exports.ClientHttp2Stream = ClientHttp2Stream;
