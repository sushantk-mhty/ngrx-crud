import { group } from '@angular/animations';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Associates } from 'src/app/store/model/associate.model';
import * as AssociateActions from 'src/app/store/associate/associate.actions';
import * as AssociateSelector from 'src/app/store/associate/associate.selector';
@Component({
  selector: 'app-addassociate',
  templateUrl: './addassociate.component.html',
  styleUrls: ['./addassociate.component.scss']
})
export class AddassociateComponent implements OnInit {

  formBuilder = inject(FormBuilder);
  ref = inject(MatDialogRef<AddassociateComponent>);
  store = inject(Store);
  isedit: boolean = false;
  title: string = 'Create Associate';
  dialogdata: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

  }
  ngOnInit(): void {
    this.dialogdata = this.data;
    this.title = this.dialogdata.title;
    this.store.select(AssociateSelector.getAssociate).subscribe(res => {
      this.associateForm.setValue({
        id: res.id, name: res.name, email: res.email, phone: res.phone,
        address: res.address, group: res.associategroup, type: res.type, status: res.status
      })
    })
  }
  associateForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    name: this.formBuilder.control('', Validators.required),
    email: this.formBuilder.control('', Validators.compose([Validators.required, Validators.email])),
    phone: this.formBuilder.control('', Validators.required),
    address: this.formBuilder.control('', Validators.required),
    type: this.formBuilder.control('CUSTOMER'),
    group: this.formBuilder.control('level1'),
    status: this.formBuilder.control(true),
  })
  onSaveAssociate() {
    if (this.associateForm.valid) {
      const _obj: Associates = {
        id: this.associateForm.value.id as number,
        name: this.associateForm.value.name as string,
        email: this.associateForm.value.email as string,
        phone: this.associateForm.value.phone as string,
        associategroup: this.associateForm.value.group as string,
        address: this.associateForm.value.address as string,
        type: this.associateForm.value.type as string,
        status: this.associateForm.value.status as boolean
      }
      if (_obj.id === 0) {
        this.store.dispatch(AssociateActions.addAssociate({ inputdata: _obj }))
      } else {
        this.store.dispatch(AssociateActions.updateAssociate({ inputdata: _obj }))
      }
      this.onClosePopup();
    }
  }
  onClosePopup() {
    this.ref.close();
  }
}
