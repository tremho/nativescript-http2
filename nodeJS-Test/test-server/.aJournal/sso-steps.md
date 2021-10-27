
### Next thing to work on -- Test harness

Some experiments first

1. see if we can call into a tap test from the app
2. see if we can establish an H2 stream connection

We'll use one of these to implement the test arrangement.  I'm 
partial to #2 myself, and it looks like the node http2 library
will do this for us.

###### How I envision the Http/2 test framework

![Test Architecture](./h2-test%20arch.png)

We create a separate app, a Node Http/2 server, that will
be contacted by the embedded Http/2 test client module in the
framework app.

The app will attempt to connect to the server.  If there is no server running,
then the app runs normally. We also have command-line switches to control
whether or not to attempt testing, and we can also exclude the test module
from a production build.

When the client connects to the test server, it first communicates
its state.  This includes
- what page (navInfo)
- data requested from previous commands

The server is running a gated test script, and each state sync
takes it to the next step in the test sequence.  This can be 
directed by the state values also.

the server sends a command of how to control the UI.  It has operations
for calling an action (e.g. 'press') or for executing a menu command, or 
for calling a function on the page.

- title bar actions
- control by selector ==> action (or step-wise selection, or count)

- we can pick up results by
 - model values
 - selected control properties
 - exported page properties
 - exported page function returns

These get passed into the test handler for processing, evaluation,
and test reporting, and then control goes back to the top of the 
loop for the next state Sync.

## Tests and implementation

Approach to getting this running

###### Create a server
- Establish a connection url
- Acknowledge the protocol or the connecting client
- respond accordingly
- continue to read client data
- echo back some data to the client

-------

Open a down channel
accept requests and respond synchronously on request, and async on down channel

- [X] have the first test working

- [X] now need to  reformat that into a call/response flow
    - client initiates connection
    - client sends status info
    - server sends directives
    - client ends connection
    

 - [X] now make a mock shell
    - client has functions that do things (add, multiply, say hello)
    - server sends directives that call these functions on client
    and client responds with a result
      
- [X] then
    - expand this so that server gets its directives from a test
    script that has attached to a promise fetcher called by the
    test server framework
    
    - This should pretty much prove out the paradigm.
    
#### tue/wed plan
This is going to work.

- Clean up test to make a structured test framework API
- make a module we can put in place for real

----

- __beginTest -> callback to test body__  
This does the wait to connect and the calls body passing t
  when the body is done, it can call end for us.

- the body is a series of calls to puppetTest (rename __issueDirective__)
and/or a wrapped version (__testDirective__) that accepts t and a config block with
  desc, x, r so it can call t.ok for us
  


  




###### Ultimate flow

- Tests should be held by the client app and exported to the server 
somehow
  
- server should reset after running tests and reporting so it can be
and always-available daemon.
  
- and/or: server runs as part of jove cli 'test' and will launch client in test mode
and run server as a combined one-shot.
  

#### Features that would be cool
- Prepare an html report that includes the output like tap and other assets
  such as screen shots or data dumps
- post the report to S3 with a public link  

- client can run on mobile too. This may be tricky since there isn't an http2 
solution there (or is there?). Also need to communicate server host address.
  
- cli script should be able to launch mobile in emulator


-----

#### More fun things to do

I'm nervous about exposure on the site of some static info.  

Let's put some things behind Basic Auth.  Since we're TLS, it should
be okay to do that.

[Here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)
is what to do.  Essentially:

- create an .htpasswd file somewhere in /etc
  - check the man page for `htpasswd` at the server and see where it puts the file
    
- change the config to point to it for /apps (or whatever)
```
location /apps {
    auth_basic           "App Access";
    auth_basic_user_file /path/to/.htpasswd;
}
```






