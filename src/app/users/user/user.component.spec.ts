import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

describe('UserComponent', () => {
    let component: UserComponent;
    let fixture: ComponentFixture<UserComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                FormsModule,
                StoreModule.forRoot({
                }),
            ],
            declarations: [UserComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserComponent);
        component = fixture.componentInstance;
        component.user = {
            email: '',
            id: 1,
            isAdmin: false,
            userName: ''
        } ;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    fit('should same email and name', () => {
        expect(component).toBeTruthy();
    });
});
