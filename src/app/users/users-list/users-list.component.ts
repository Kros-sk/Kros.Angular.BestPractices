import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Store, select } from '@ngrx/store';
import * as userAction from '../state/user.actions';
import { StateUser } from '../state/users.state';
import { Observable } from 'rxjs';
import { LocalizedErrorInfo } from 'src/app/shared/models/error-info.model';
import { getAllUsers , getError} from '../state/user.selectors';


@Component({
    selector: 'kros-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

    constructor(
        private store: Store<StateUser>
    ) { }

    errorMessage$: Observable<LocalizedErrorInfo | null>;
    usersList$: Observable<User[]>;


    ngOnInit() {
        this.usersList$ = this.store.pipe(select(getAllUsers));
        this.errorMessage$ = this.store.pipe(select(getError));
        this.store.dispatch(new userAction.Load());
    }

}
