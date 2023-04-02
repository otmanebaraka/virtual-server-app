import { Component, OnInit } from '@angular/core';
import { VirtualServer } from '../interfaces/virtual-server';
import { BackendService } from '../services/backend.service';
import {MatDialog} from '@angular/material/dialog';
import { NewServerComponent } from '../dialogs/new-server/new-server.component';
import { NewSiteComponent } from '../dialogs/new-site/new-site.component';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-virual-server-list',
  templateUrl: './virual-server-list.component.html',
  styleUrls: ['./virual-server-list.component.scss']
})
export class VirualServerListComponent implements OnInit {

  Servers:VirtualServer[] = [];

  constructor(
    private backendService:BackendService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getServers();
  }
  getServers(): void {
    this.backendService.getServers().subscribe({
      next:(res:VirtualServer[]) =>{
        if(res){
          this.Servers = res;
        }
      },
      error:err=>{
        console.error(err);
      }
    });
  }
  addServer(): void {
    const dialogRef = this.dialog.open(NewServerComponent);
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.getServers();
      }
    });
  }

  addSite(server:VirtualServer): void {
    const dialogRef = this.dialog.open(NewSiteComponent,{
      data:{server:server}
    });
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.getServers();
      }
    });
  }

  deleteServer(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent,{
      data:{server:true,serverID:id}
    });
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.getServers();
      }
    });
  }


  deleteSite(serverId: number, siteId: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent,{
      data:{site:true,serverID:serverId,siteID:siteId}
    });
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.getServers();
      }
    });
  }
}
