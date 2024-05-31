import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PartyService } from '../party.service';
import { ToastrService } from 'ngx-toastr';
import { PartyFormComponent } from '../party-form/party-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-party-list',
  templateUrl: './party-list.component.html',
  styleUrls: ['./party-list.component.scss']
})
export class PartyListComponent {
  displayedColumns: string[] = [
    'name',
    'gstin',
    'company_name',
    'mobile_no',
    'email',
    'remark',
    'credit_limit',
    'actions' ]
  @Input() parties: any[] = [];
  @Output() refreshList = new EventEmitter<void>();

  constructor(private partyService: PartyService, private toastr: ToastrService,private dialog: MatDialog) {}

  deleteParty(id: string) {
    this.partyService.deleteParty( id ).subscribe( (res: {success: boolean, msg: string}) => {
      if ( res.success ) {
        this.toastr.success( res.msg, "Success" );
        this.refreshList.emit();
      } else {
        this.toastr.success( res.msg, "Error" );
      }
    });
  }

  editParty ( party: any ) {
    console.log(party)
    this.dialog.open( PartyFormComponent, {
      height: '600px',
      autoFocus: false,
      data: {formValue: party, action: 'edit'}
    })
  }
  viewParty (party:any) {
    this.dialog.open( PartyFormComponent, {
      height: '600px',
      autoFocus: false,
      data: {formValue: party, action: 'view'}
    })
  }
}
