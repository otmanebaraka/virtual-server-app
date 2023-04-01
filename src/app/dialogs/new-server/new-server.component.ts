import { Component } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-new-server',
  templateUrl: './new-server.component.html',
  styleUrls: ['./new-server.component.scss']
})
export class NewServerComponent{

  ipAddressPattern = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
  serverForm = this.formBuilder.group({
    name:['',Validators.required],
    ipAddress:['',[Validators.required,Validators.pattern(this.ipAddressPattern)]]
  })

  ErrorMessage:string = '';

  constructor(
    private backendService:BackendService,
    private dialogRef: MatDialogRef<NewServerComponent>,
    private formBuilder: FormBuilder
  ) { }

  addServer() : void{
    if(this.serverForm.valid){
      this.backendService.addServer(this.serverForm.value).subscribe({
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
