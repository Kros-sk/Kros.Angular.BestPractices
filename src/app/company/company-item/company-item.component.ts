import { Component, OnInit, Input } from '@angular/core';
import { CompanyListComponent } from '../company-list/company-list.component';
import { CompanyItem } from '../models/company.model';
import { CompanyState } from '../state/company.state';
import { Store } from '@ngrx/store';
import * as companyActions from '../state/company.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditCompanyItemComponent } from '../edit-company-item/edit-company-item.component';

@Component({
  selector: 'kros-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.scss']
})
export class CompanyItemComponent implements OnInit {

  constructor(
    private store: Store<CompanyState>,
    private modalService: NgbModal
  ) { }

  @Input() item: CompanyItem;

  ngOnInit() {

  }
deleteCompany(id: number) {
  this.store.dispatch(new companyActions.Delete(id));
}

editCompany(id: number) {
  const modalRef = this.modalService.open(EditCompanyItemComponent, {
    size: 'lg',
    centered: true
  });
  modalRef.componentInstance.itemId = id;
}

setCompanyState(id: number, isDone: boolean) {
    this.store.dispatch(
        new companyActions.SetState({ id, isDone })
    );
}

}
