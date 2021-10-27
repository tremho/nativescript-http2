
import {
    Http2Base,
    Http2ConnectOptions,
    Http2Settings,
    ClientHttp2Stream,
    ClientHttp2Session, SessionRequestOptions
} from "./common";



export class Http2 extends Http2Base {
    private dataTask:NSURLSessionDataTask|null = null

    connect(authority: string, options?: Http2ConnectOptions, listener?: any): ClientHttp2Session {
        console.log('ios http2.connect')
        const nsconfig:NSURLSessionConfiguration = NSURLSessionConfiguration.defaultSessionConfiguration
        const nsDelegate:NSURLSessionDataDelegate = new NSObject()

        nsDelegate.URLSessionDataTaskDidBecomeDownloadTask = (session: NSURLSession, dataTask: NSURLSessionDataTask, downloadTask: NSURLSessionDownloadTask) => {
            console.log('URLSessionDataTaskDidBecomeDownloadTask', session, dataTask, downloadTask)
        }

        nsDelegate.URLSessionDataTaskDidBecomeStreamTask = (session: NSURLSession, dataTask: NSURLSessionDataTask, streamTask: NSURLSessionStreamTask) => {
            console.log('URLSessionDataTaskDidBecomeStreamTask', session, dataTask, streamTask)
        }

        nsDelegate.URLSessionDataTaskDidReceiveData = (session: NSURLSession, dataTask: NSURLSessionDataTask, data: NSData) => {
            console.log('URLSessionDataTaskDidReceiveData', session, dataTask, data)
        }

        const dq = NSOperationQueue.mainQueue
        const nsSession = NSURLSession.sessionWithConfigurationDelegateDelegateQueue(nsconfig, nsDelegate, dq)
        nsSession.delegate.URLSessionDidBecomeInvalidWithError = (session, error) => {
            console.log('URLSessionDidBecomeInvalidWithError', session, error)
        }
        nsSession.delegate.URLSessionDidFinishEventsForBackgroundURLSession = (session) => {
            console.log('URLSessionDidFinishEventsForBackgroundURLSession', session)

        }
        nsSession.delegate.URLSessionDidReceiveChallengeCompletionHandler = (session, challenge, completionHandler:any) => {
            console.log('URLSessionDidReceiveChallengeCompletionHandler', session, challenge, completionHandler)
        }
        return new LocalClientHttp2Session(nsSession, authority)
    }
}

class LocalClientHttp2Session extends ClientHttp2Session {
    private session:NSURLSession
    private authority:string  // must include protocol

    constructor(nsession:NSURLSession, authority:string) {
        super()
        this.session = nsession
        this.authority = authority
    }
    request(headers: any, options?:SessionRequestOptions):ClientHttp2Stream {
        console.log('ios clientHttp2Session request', headers)
        const path = headers[":path:"]
        delete headers[":path:"]
        const url = NSURL.URLWithString(this.authority+path)
        const nsRequest = NSMutableURLRequest.requestWithURL(url)
        for(let k of Object.getOwnPropertyNames(headers)) {
            let v = headers[k]
            nsRequest.addValueForHTTPHeaderField(k,v)
        }
        const stream = new ClientHttp2Stream()
        const task = this.session.dataTaskWithRequestCompletionHandler(nsRequest, (data, response, error) => {
            if(error) {
                // console.log('error received in request completion handler', error)
                stream.handleEvent('error', error)
            }
            if(response) {
                console.log('response received in request completion handler', response)
                const hresp:NSHTTPURLResponse = (response as NSHTTPURLResponse)
                const headers = hresp.allHeaderFields
                const headObj:any = {}
                for(let k of headers.allKeys) {
                    let v = headers.objectForKeyedSubscript(k)
                    console.log ('header in ', k, v)
                    headObj[k] = v
                }
                stream.handleEvent('response', headObj)
            }
            if(data) {
                // console.log('data received in request completion hander', data)
                const str = NSString.stringWithCString(data.bytes)
                stream.handleEvent('data', str)
            }
        })
        task.resume()
        return stream
    }
}
