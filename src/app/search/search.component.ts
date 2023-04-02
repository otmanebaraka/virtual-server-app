import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { VirtualServer } from '../interfaces/virtual-server';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  servers:VirtualServer[] = [];

  searchForm = this.formBuilder.group({
    query: [''],
    searchOption: ['servers'],
    searchFilter: ['name']
  });
  searchResults:any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private backendService:BackendService,
  ) { }

  ngOnInit(): void {
    this.getServers();

    this.searchForm.get('query')?.valueChanges.subscribe(query => {

      const results: any[] = [];

      if (query) {
        const searchOption = this.searchForm.controls.searchOption.value;
        const searchFilter = this.searchForm.controls.searchFilter.value;

        if (searchOption === 'servers') {
          this.servers.forEach(server => {
            let value = '';
            if (searchFilter === 'name') {
              value = server.name.toLowerCase();
            } else if (searchFilter === 'ipAddress') {
              value = server.ipAddress;
            }
            if (value.includes(query.toLowerCase())) {
              results.push(server);
            }
          });
        }else if(searchOption === 'sites'){
          // Added the first map to get all the sites from each server and second map to add the server id of each site to use it later for navigation
          // Use flat function to combine all the sites in one array
          this.servers.map(s => s.sites.map((site:any) => {
            site.serverId = s.id;
            return site;
          })).flat().forEach((site:any)=>{
            // console.log(site)
            let value = '';
            if(searchFilter === 'name'){
              value = site.name.toLowerCase();
            }else if(searchFilter === 'ipAddress'){
              value = site.ipAddress;
            }else if(searchFilter === 'domainName'){
              value = site.domainName.toLowerCase();
            }
            // console.log(site)
            if(value.includes(query.toLowerCase())){
              results.push(site)
            }
          });
        }
      }
      // console.log(results)
      this.searchResults = results;
    });
  }
  async getServers(): Promise<void> {
    this.servers = await lastValueFrom(this.backendService.getServers());
  }
}
