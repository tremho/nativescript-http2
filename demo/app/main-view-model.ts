import { Observable } from 'tns-core-modules/data/observable';
import { Http2 } from 'nativescript-http2';

export class HelloWorldModel extends Observable {
  public message: string;
  private http2: Http2;

  constructor() {
    super();

    this.http2 = new Http2();
    this.message = this.http2.message;
  }
}
