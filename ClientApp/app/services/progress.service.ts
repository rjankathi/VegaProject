
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProgressService {

    constructor() { }

    uploadProgress: Subject<any> = new Subject();
    downloadProgress: Subject<any> = new Subject();

}

//import { BroswerXhr } from '@angular/http';
// @Injectable()
// export class BroswerXhrWithProgress extends BroswerXhr {

//     constructor(private progressService: ProgressService) {super();
//  }
// }
//XMLHttpRequest
//BorwserXHR