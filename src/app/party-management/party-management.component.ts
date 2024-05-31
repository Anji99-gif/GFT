import { Component } from '@angular/core';
import { PartyService } from '../party.service';
import { MatDialog } from '@angular/material/dialog';
import { PartyFormComponent } from '../party-form/party-form.component';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-party-management',
  templateUrl: './party-management.component.html',
  styleUrls: ['./party-management.component.scss']
})
export class PartyManagementComponent {
  parties: any[] = [];

  constructor(private partyService: PartyService, private dialog: MatDialog,private authService : AuthService, private toast: ToastrService) {}

  ngOnInit() {
    this.getParties();
  }

  getParties() {
    this.partyService.getParties().subscribe((data) => {
      this.parties = data;
    });
  }
  openPartyForm () {
    const dialogRef = this.dialog.open( PartyFormComponent, {
      height: '600px',
      autoFocus: false,
      data: {action : 'create'}
    } )

    dialogRef.afterClosed().subscribe( res => {
      this.getParties();
    })
  }

  logout () {
    this.authService.logout()
    this.toast.success( "Logged out successfully", "Success" );
  }
}
