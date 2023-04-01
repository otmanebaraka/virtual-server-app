import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-new-site',
  templateUrl: './new-site.component.html',
  styleUrls: ['./new-site.component.scss']
})
export class NewSiteComponent {

  ipAddressPattern = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
  siteForm = this.formBuilder.group({
    name:['',Validators.required],
    domainName:['',Validators.required],
    ipAddress:[this.data.server.ipAddress,[Validators.required,Validators.pattern(this.ipAddressPattern)]],
    active:[true]
  })

  ErrorMessage:string = '';

  constructor(
    private backendService:BackendService,
    private dialogRef: MatDialogRef<NewSiteComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  addSite() : void{
    if(this.siteForm.valid){
      // console.log(this.siteForm.value);
      this.backendService.addSite(this.data.server.id,this.siteForm.value).subscribe({
        next: res =>{
          if(res){
            this.dialogRef.close(res);
          }
        },
        error: err=>{
          this.ErrorMessage = err;
        }
      })
    }
  }

}
