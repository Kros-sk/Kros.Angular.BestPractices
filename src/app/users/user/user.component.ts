import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { UsersService } from '../service/users.service';

@Component({
    selector: 'kros-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    isAdmin: FormControl;

    constructor(
        private userService: UsersService
    ) {
        this.isAdmin = new FormControl(false);
    }

    @Input() user: User;

    ngOnInit() {
        this.isAdmin.valueChanges.pipe(
            debounceTime(500)
        ).subscribe(
            value => {
                this.userService.updateUser({
                    ...this.user,
                    isAdmin: value
                }).subscribe();
            },
            err => console.log('error', err)
        );
    }
}
