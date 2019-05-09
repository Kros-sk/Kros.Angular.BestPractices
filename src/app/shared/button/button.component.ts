import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'kros-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

    @Input() name: string;
    @Input() showProgress: boolean;
    @Output() clickEvent = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    emitEvent() {
        this.clickEvent.emit({progress: this.showProgress});
    }
}
