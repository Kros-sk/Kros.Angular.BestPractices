import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user.model';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as userActions from '../state/user.actions';
import { UserState } from '../state/users.state';

@Component({
    selector: 'kros-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    isAdmin: FormControl;

    constructor(
        private store: Store<UserState>
    ) {
        this.isAdmin = new FormControl(false);
    }

    @Input() user: User;

    ngOnInit() {
        this.isAdmin.setValue(this.user.isAdmin);
        this.isAdmin.valueChanges.pipe(
            debounceTime(500)
        ).subscribe(
            value => {
                this.store.dispatch(new userActions.Update({
                    id: this.user.id,
                    email: this.user.email,
                    isAdmin: value
                }));
            },
            err => console.log('error', err)
        );
    }
}
