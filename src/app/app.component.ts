import { Component, OnInit } from '@angular/core';
import { VirtualServer } from './interfaces/virtual-server';
import { BackendService } from './services/backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.getServers().subscribe(
      (servers: VirtualServer[]) => {
        console.log(servers);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
