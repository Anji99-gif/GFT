import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { PartyService } from '../party.service';
import { FormArray, FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-party-form',
  templateUrl: './party-form.component.html',
  styleUrls: ['./party-form.component.scss']
})
export class PartyFormComponent {
  action: string = 'create';
  party: any = {};
  baseUrl: string = "https://ap.greatfuturetechno.com/";
  isEditMode: boolean = false;
  @Output() refreshList = new EventEmitter<void>();
  partyForm: FormGroup;
  selectedFile: File | null = null;
  constructor(private fb: NonNullableFormBuilder, private partyService: PartyService, private toastr: ToastrService, private dialog: MatDialogRef<PartyFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.partyForm = this.fb.group({
      name: ['', Validators.required],
      company_name: [''],
      mobile_no: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      telephone_no: ['', Validators.pattern(/^[0-9]{10}$/)],
      whatsapp_no: ['', Validators.pattern(/^[0-9]{10}$/)],
      email: ['', [ Validators.email]],
      remark: [''],
      date_of_birth: ['',Validators.required],
      anniversary_date: ['',Validators.required],
      gstin: ['', Validators.required],
      pan_no: [''],
      apply_tds: [false],
      credit_limit: [0],
      is_active: [true],
      image: ['',Validators.required],
      bank_id: this.fb.array([]),
      address: this.fb.array([]),
      userid: this.fb.group({
        username: ['', Validators.required],
        phone_number: [''],
        is_active: [ true ],
        user_permissions: this.fb.array([])
      }),
      login_access: [true]
    });

    this.addBank();
    this.addAddress();
    if ( data ) this.partyForm.patchValue( data.formValue );
  }

  ngOnInit(): void {
    this.action = this.data.action;
    this.isEditMode = this.action === 'edit' ? true : false;
  }
  onSubmit () {
    console.log( this.partyForm.value, this.data )
    const formData = this.toFormData(this.partyForm.value);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    if (this.isEditMode) {
      this.partyService.updateParty(this.data.formValue.id, formData).pipe( ).subscribe((res: { msg: string, success: boolean }) => {
        this.handleSuccess( res );
      });
    } else {
      this.partyService.createParty( formData ).pipe( ).subscribe( ( res: { msg: string, success: boolean } ) => {
        console.log( res, res instanceof HttpErrorResponse  )
          this.handleSuccess( res );
        });

    }
  }
   toFormData(formValue: any): FormData {
    const formData = new FormData();

    for (const key in formValue) {
      if (formValue.hasOwnProperty(key) ) {
        const value = formValue[key];
        formData.append(key, value);
      }
    }
    return formData;
  }

  handleSuccess ( res: { msg: string, success: boolean } ) {

    if ( res.success ) {
      this.toastr.success( res.msg, "Success" );
      this.resetForm();
      this.refreshList.emit();
      this.dialog.close();
    } else {
      this.toastr.error( res.msg, "Error" );
    }
  }
  resetForm() {
    this.partyForm.reset( "" );
    this.isEditMode = false;
  }

  setEditMode(party: any) {
    this.partyForm.setValue( party );
    this.isEditMode = true;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  get bank_id() {
    return this.partyForm.get('bank_id') as FormArray;
  }

  get address() {
    return this.partyForm.get('address') as FormArray;
  }

  addBank() {
    this.bank_id.push(this.fb.group({
      bank_ifsc_code: [''],
      bank_name: [''],
      branch_name: [''],
      account_no: [''],
      account_holder_name: [''],
      is_active: [true]
    }));
  }

  deleteBank (i: any) {
    this.bank_id.removeAt( i );
  }
  deleteAddress (i: any) {
    this.address.removeAt( i );
  }

  addAddress() {
    this.address.push(this.fb.group({
      address_line_1: [''],
      address_line_2: [''],
      country: [''],
      state: [''],
      city: [''],
      pincode: [''],
      is_active: [true]
    }));
  }

  cancel () {
    this.dialog.close();
  }
}
