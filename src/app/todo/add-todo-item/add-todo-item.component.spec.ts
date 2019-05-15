import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddTodoItemComponent } from './add-todo-item.component';
import { StoreModule } from '@ngrx/store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap' ;
import { EffectsModule } from '@ngrx/effects';

describe('AddTodoItemComponent', () => {
    let component: AddTodoItemComponent;
    let fixture: ComponentFixture<AddTodoItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NgbModule,
                ReactiveFormsModule,
                EffectsModule.forRoot([]),
                StoreModule.forRoot({
                }),
            ],
            declarations: [AddTodoItemComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddTodoItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
