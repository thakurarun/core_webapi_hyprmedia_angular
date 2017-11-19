import { Injectable } from '@angular/core';
import { log } from 'util';

@Injectable()
export class ProgressLayoutSharedService {
    constructor() {
    }

    onStart: () => void;

    onEnd: () => void;

}

