import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../services/company.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyState } from '../state/company.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'kros-edit-company-item',
  templateUrl: './edit-company-item.component.html',
  styleUrls: ['./edit-company-item.component.scss']
})
export class EditCompanyItemComponent implements OnInit {

  constructor(    
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private modalService: NgbModal,
    private store: Store<CompanyState>
  ) { }
  progress: boolean;
  companyForm: FormGroup;

  @Input() itemId: number;

  ngOnInit() {
    this.progress = false;
    this.companyForm = this.formBuilder.group({
      businessId: ['', Validators.required],
      companyName: ['', Validators.required],
      street: [],
      streetNumber: [],
      city: [],
      zipCode: []
    })
  }

}
