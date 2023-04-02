import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HostedSite } from '../interfaces/hosted-site';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-site-details',
  templateUrl: './site-details.component.html',
  styleUrls: ['./site-details.component.scss']
})
export class SiteDetailsComponent implements OnInit {

  site:any;
  serverId:any;
  siteId:any;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
  ) { }

  ngOnInit(): void {
    this.serverId = this.route.snapshot.paramMap.get('serverId');
    this.siteId = this.route.snapshot.paramMap.get('id');
    // console.log(this.route.snapshot.paramMap);
    this.getSite();
  }
  async getSite():Promise<void>{
    if(this.siteId){
      try{
        this.site = await this.backendService.getSiteById(+this.serverId,+this.siteId);
      }catch(err){
        console.error(err)
      }
    }
  }
  ToggleStatus(serverID:number,site:HostedSite):void{
    Object.assign(site,{
      active:!site.active
    })
    this.backendService.updateSite(serverID,site);
  }
}
