
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
        const url = NSURL.URLWithString(authority)
        const task = nsSession.dataTaskWithURL(url)
        return new LocalClientHttp2Session(nsSession, task)
    }
}

class LocalClientHttp2Session extends ClientHttp2Session {
    private session:NSURLSession

    constructor(nsession:NSURLSession, dtask:NSURLSessionDataTask) {
        super()
        this.session = nsession
        dtask.response
    }
    request(headers: any, options?:SessionRequestOptions):ClientHttp2Stream {
        console.log('ios clientHttp2Session request', headers)
        const path = headers[":path:"]
        delete headers[":path:"]
        const url = NSURL.URLWithString(path)
        const nsRequest = NSMutableURLRequest.requestWithURL(url)
        for(let k of headers) {
            let v = headers[k]
            nsRequest.addValueForHTTPHeaderField(k,v)
        }
        const task = this.session.dataTaskWithRequest(nsRequest)
        return new LocalClientHttp2Stream(task)
    }
}

class LocalClientHttp2Stream extends ClientHttp2Stream {
    private dataTask:NSURLSessionDataTask

    constructor(dtask:NSURLSessionDataTask) {
        super()
        this.dataTask = dtask
        const hresp:NSHTTPURLResponse = (dtask.response as NSHTTPURLResponse)
        console.log('dtask.error', dtask.error)
        this.on('response', hresp.allHeaderFields)

    }

    handleEvent(event: string, eventData: any) {
        console.log('ios sees event', event, eventData)
        super.handleEvent(event, eventData);
    }

}