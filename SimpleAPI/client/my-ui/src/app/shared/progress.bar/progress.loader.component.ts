import { Component, OnInit, OnChanges } from '@angular/core';
import { ProgressLayoutSharedService } from './progress.shared.service';
import { log } from 'util';

// enum STATUS { DISPLAY = 'display', NONE = 'none' }

@Component({
    selector: 'app-progress-loader',
    templateUrl: 'progress.loader.html',
    styleUrls: [
        'progress.loader.css'
    ]
})

export class ProgressLoaderComponent implements OnInit, OnChanges {
    currentStatus = 'none';
    constructor(private progressLayoutSharedService: ProgressLayoutSharedService) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.progressLayoutSharedService.onStart = () => {
                this.currentStatus = 'block';
            };

            this.progressLayoutSharedService.onEnd = () => {
                this.currentStatus = 'none';
            };
        }, 1);
    }

    ngOnChanges(changes: any): void {

    }


}
