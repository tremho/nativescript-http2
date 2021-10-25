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
export class Http2Base {

    connect(authority:string, options:Http2ConnectOptions, listener:any):ClientHttp2Session {
        console.log('Http2Base connect returns empty session')
        return new ClientHttp2Session()
    }
}

export class Http2ConnectOptions {
    maxDeflateDynamicTableSize: number = 4096 //Sets the maximum dynamic table size for deflating header fields. Default: 4Kib.
    maxSettings: number = 32 //Sets the maximum number of settings entries per SETTINGS frame. The minimum value allowed is 1. Default: 32.
    maxSessionMemory: number = 10 // Sets the maximum memory that the Http2Session is permitted to use. The value is expressed in terms of number of megabytes, e.g. 1 equal 1 megabyte. The minimum value allowed is 1. This is a credit based limit, existing Http2Streams may cause this limit to be exceeded, but new Http2Stream instances will be rejected while this limit is exceeded. The current number of Http2Stream sessions, the current memory use of the header compression tables, current data queued to be sent, and unacknowledged PING and SETTINGS frames are all counted towards the current limit. Default: 10.
    maxHeaderListPairs: number = 128 // Sets the maximum number of header entries. This is similar to http.Server#maxHeadersCount or http.ClientRequest#maxHeadersCount. The minimum value is 1. Default: 128.
    maxOutstandingPings: number = 10 //Sets the maximum number of outstanding, unacknowledged pings. Default: 10.
    maxReservedRemoteStreams: number = 200 // Sets the maximum number of reserved push streams the client will accept at any given time. Once the current number of currently reserved push streams exceeds reaches this limit, new push streams sent by the server will be automatically rejected. The minimum allowed value is 0. The maximum allowed value is 2232-1. A negative value sets this option to the maximum allowed value. Default: 200.
    maxSendHeaderBlockLength?: number // Sets the maximum allowed size for a serialized, compressed block of headers. Attempts to send headers that exceed this limit will result in a 'frameError' event being emitted and the stream being closed and destroyed.
    paddingStrategy: number = 0 //Strategy used for determining the amount of padding to use for HEADERS and DATA frames.
    // Default: http2.constants.PADDING_STRATEGY_NONE. Value may be one of:
    // http2.constants.PADDING_STRATEGY_NONE: No padding is applied.
    // http2.constants.PADDING_STRATEGY_MAX: The maximum amount of padding, determined by the internal implementation, is applied.
    // http2.constants.PADDING_STRATEGY_ALIGNED: Attempts to apply enough padding to ensure that the total frame length, including the 9-byte header, is a multiple of 8. For each frame, there is a maximum allowed number of padding bytes that is determined by current flow control state and settings. If this maximum is less than the calculated amount needed to ensure alignment, the maximum is used and the total frame length is not necessarily aligned at 8 bytes.

    peerMaxConcurrentStreams: number = 100 // Sets the maximum number of concurrent streams for the remote peer as if a SETTINGS frame had been received. Will be overridden if the remote peer sets its own value for maxConcurrentStreams. Default: 100.
    protocol: 'http:' | 'https:' = 'https:' // The protocol to connect with, if not set in the authority. Value may be either 'http:' or 'https:'. Default: 'https:'
    settings?:Http2Settings // The initial settings to send to the remote peer upon connection.
    createConnection?: CreateConnectionCallback // An optional callback that receives the URL instance passed to connect and the options object, and returns any Duplex stream that is to be used as the connection for this session.
    unknownProtocolTimeout: number = 10000 // Specifies a timeout in milliseconds that a server should wait when an 'unknownProtocol' event is emitted. If the socket has not been destroyed by that time the server will destroy it. Default: 10000.
    // ... Any net.connect() or tls.connect() options can be provided.
}

type CreateConnectionCallback = (url:string, options:Http2ConnectOptions) => {}

export const http2 = {
    constants : {
        NO_ERROR: 0,
        PROTOCOL_ERROR: 1,
        INTERNAL_ERROR: 2,
        FLOW_CONTROL_ERROR: 3,
        SETTINGS_TIMEOUT: 4,
        STREAM_CLOSED: 5,
        FRAME_SIZE_ERROR: 6,
        REFUSED_STREAM: 7,
        CANCEL:8,
        COMPRESSION_ERROR:9,
        CONNECT_ERROR:10,
        ENHANCE_YOUR_CALM:11,
        INADEQUATE_SECURITY:12,
        HTTP_1_1_REQUIRED:13,

        // TODO: Not sure of these values; can't find values in node docs
        PADDING_STRATEGY_NONE: 0,
        PADDING_STRATEGY_MAX: 1,
        PADDING_STRATEGY_ALIGNED: 2,

    }
}
export class Http2Settings {
    headerTableSize:number = 4096 //Specifies the maximum number of bytes used for header compression. The minimum allowed value is 0. The maximum allowed value is 2232-1. Default: 4096.
    enablePush:boolean = true //  Specifies true if HTTP/2 Push Streams are to be permitted on the Http2Session instances. Default: true.
    initialWindowSize:number = 65535 // Specifies the sender's initial window size in bytes for stream-level flow control. The minimum allowed value is 0. The maximum allowed value is 232-1. Default: 65535.
    maxFrameSize:number = 16384 //Specifies the size in bytes of the largest frame payload. The minimum allowed value is 16,384. The maximum allowed value is 2224-1. Default: 16384.
    maxConcurrentStreams:number = 4294967295 //Specifies the maximum number of concurrent streams permitted on an Http2Session. There is no default value which implies, at least theoretically, 232-1 streams may be open concurrently at any given time in an Http2Session. The minimum value is 0. The maximum allowed value is 232-1. Default: 4294967295.
    maxHeaderListSize:number = 65535 // Specifies the maximum size (uncompressed octets) of header list that will be accepted. The minimum allowed value is 0. The maximum allowed value is 2232-1. Default: 65535.
    enableConnectProtocol:boolean = false //Specifies true if the "Extended Connect Protocol" defined by RFC 8441 is to be enabled. This setting is only meaningful if sent by the server. Once the enableConnectProtocol setting has been enabled for a given Http2Session, it cannot be disabled. Default: false.
}

export class ClientHttp2Session {

    request(headers: object, options:SessionRequestOptions):ClientHttp2Stream {
        console.log('Base version of ClientHttp2Session returns empty stream')
        return new ClientHttp2Stream()
    }
}

export class SessionRequestOptions {
    endStream?:boolean // true if the Http2Stream writable side should be closed initially, such as when sending a GET request that should not expect a payload body.
    exclusive?:boolean // When true and parent identifies a parent Stream, the created stream is made the sole direct dependency of the parent, with all other existing dependents made a dependent of the newly created stream. Default: false.
    parent?:number  // Specifies the numeric identifier of a stream the newly created stream is dependent on.
    weight?:number  // Specifies the relative dependency of a stream in relation to other streams with the same parent. The value is a number between 1 and 256 (inclusive).
    waitForTrailers?:boolean // When true, the Http2Stream will emit the 'wantTrailers' event after the final DATA frame has been sent.
    signal?:any // An AbortSignal that may be used to abort an ongoing request.
}

export class ClientHttp2Stream {
    eventHandler:any = {}
    on(event:string, callback:any) {
        this.eventHandler[event] = callback
    }
    handleEvent(event:string, eventData:any) {
        const fn = this.eventHandler[event]
        if(fn) fn(eventData)
    }
}
