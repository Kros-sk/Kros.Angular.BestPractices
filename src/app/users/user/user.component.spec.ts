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
            email: 'ahoj@cau.tg',
            id: 1,
            isAdmin: false,
            userName: 'Jozef'
        } ;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be same email', () => {
        const element: HTMLElement = fixture.nativeElement;
        expect(element.textContent).toContain(component.user.email);
    });
});
