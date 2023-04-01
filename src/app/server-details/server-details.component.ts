import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { HostedSite } from '../interfaces/hosted-site';
import { VirtualServer } from '../interfaces/virtual-server';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-server-details',
  templateUrl: './server-details.component.html',
  styleUrls: ['./server-details.component.scss']
})
export class ServerDetailsComponent implements OnInit {

  server:any;
  Id:any;
  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.Id = this.route.snapshot.paramMap.get('id');
    this.getServer();
  }
  getServer():void{
    if(this.Id){
      this.backendService.getServerById(+this.Id).subscribe((server:VirtualServer) => {
        this.server = server;
      });
    }
  }
  ToggleStatus(serverID:number,site:HostedSite){
    Object.assign(site,{
      active:!site.active
    })
    this.backendService.updateSite(serverID,site);
  }
  deleteSite(serverId: number, siteId: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent,{
      data:{site:true,serverID:serverId,siteID:siteId}
    });
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.getServer();
      }
    });
  }
}
