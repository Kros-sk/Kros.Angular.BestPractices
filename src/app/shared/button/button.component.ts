import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'kros-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

    @Input() name: string;
    @Input() showProgress: boolean;
    @Output() click = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    emitEvent() {
        console.log('CLICK');
        this.click.emit({name: this.name});
    }
}
