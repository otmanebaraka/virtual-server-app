import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { HostedSite } from '../interfaces/hosted-site';
import { VirtualServer } from '../interfaces/virtual-server';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private servers:VirtualServer[] = JSON.parse(localStorage.getItem('servers') as string) || [];

  constructor(
    private http: HttpClient
  ) { }

  getServers(): Observable<VirtualServer[]> {
    if (this.servers.length > 0) {
      return of(this.servers);
    } else {
      return this.http.get<any[]>('assets/data-servers.json')
        .pipe(
          tap((servers: any[]) => localStorage.setItem('servers', JSON.stringify(servers))),
          catchError(this.handleError<any[]>('getServers', []))
        );
    }
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  getServerById(id:number): Observable<any> {
    const server = this.servers.find(s => s.id === id);
    return of(server);
  }
  addServer(server: any): Observable<any> {
    const lastServerId = this.servers.length > 0 ? this.servers.slice(-1)[0].id : 0;
    server.id = lastServerId + 1;

    // Check if the server name already exists
    const index = this.servers.findIndex(s => s.name === server.name);
    if (index !== -1) {
      const errorFactory = () => new Error('Server name already exists');
      return throwError(errorFactory);
    }
    server.sites = [];
    this.servers.push(server);
    localStorage.setItem('servers', JSON.stringify(this.servers));
    return of(server);
  }
  deleteServer(id: number): Observable<any> {
    const index = this.servers.findIndex(s => s.id === id);
    if(index === -1){
      const errorFactory = () => new Error('Server not exist');
      return throwError(errorFactory);
    }
    this.servers.splice(index, 1);
    localStorage.setItem('servers', JSON.stringify(this.servers));
    return of(id);
  }

  getSiteById(serverId:number, siteId:number): Observable<any> {
    const server = this.servers.find(s => s.id === serverId);
    return of(server?.sites.find(site => site.id === siteId));
  }
  addSite(serverID: number,site:any): Observable<any> {
    const server = this.servers.find(server => server.id === serverID);
    if(server){
      const lastSiteId = server.sites.length > 0 ? server.sites.slice(-1)[0].id : 0;
      site.id = lastSiteId +1;

      // Check if the site name already exists
      const index = server.sites.findIndex(s => s.name === site.name);
      if (index !== -1) {
        const errorFactory = () => new Error('Site name already exists');
        return throwError(errorFactory);
      }
      server.sites.push(site);
      localStorage.setItem('servers', JSON.stringify(this.servers));
      return of(server);
    }
    const errorFactory = () => new Error('Server not found');
    return throwError(errorFactory);
  }

  deleteSite(serverID: number,siteID: number): Observable<any> {
    const server = this.servers.find(server => server.id === serverID);
    if(server){
      const index = server.sites.findIndex(s => s.id === siteID);
      if(index === -1){
        const errorFactory = () => new Error('Site not exist');
        return throwError(errorFactory);
      }
      server.sites.splice(index, 1);
      localStorage.setItem('servers', JSON.stringify(this.servers));
      return of(true);
    }
    const errorFactory = () => new Error('Server not found');
    return throwError(errorFactory);
  }

  updateSite(serverID: number, newSite: HostedSite): void {
    const server = this.servers.find(server => server.id === serverID);
    if (server) {
      const site = server.sites?.find(site => site.id === newSite.id);
      if (site) {
        Object.assign(site, newSite);
        localStorage.setItem('servers', JSON.stringify(this.servers));
      }
    }
  }
}
