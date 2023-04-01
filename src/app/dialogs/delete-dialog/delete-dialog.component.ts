import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {
  ErrorMessage:string = '';

  constructor(
    private backendService:BackendService,
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  Delete():void{
    if(this.data.server){
      this.backendService.deleteServer(this.data.serverID).subscribe({
        next:res=> this.dialogRef.close(res),
        error:err=>{
          this.ErrorMessage = err;
        }
      })
    }else {
      this.backendService.deleteSite(this.data.serverID,this.data.siteID).subscribe({
        next:res=> this.dialogRef.close(res),
        error:err=>{
          this.ErrorMessage = err;
        }
      })
    }
  }

}
