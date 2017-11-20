import { Injectable } from '@angular/core';

@Injectable()
export class ProgressLayoutSharedService {
    onStart: () => void;

    onEnd: () => void;

}

