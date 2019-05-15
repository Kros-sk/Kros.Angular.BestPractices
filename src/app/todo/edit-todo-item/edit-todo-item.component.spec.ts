import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditTodoItemComponent } from './edit-todo-item.component';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap' ;

describe('EditTodoItemComponent', () => {
    let component: EditTodoItemComponent;
    let fixture: ComponentFixture<EditTodoItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NgbModule,
                HttpClientTestingModule,
                ReactiveFormsModule,

                StoreModule.forRoot({
                }),
            ],
            declarations: [EditTodoItemComponent],
        })

            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditTodoItemComponent);
        component = fixture.componentInstance;
        component.itemId = 1;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
