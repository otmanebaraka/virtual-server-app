import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, lastValueFrom, Observable, of, tap, throwError } from 'rxjs';
import { HostedSite } from '../interfaces/hosted-site';
import { VirtualServer } from '../interfaces/virtual-server';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  // La liste des serveurs est stockée dans le localStorage pour qu'elle soit persistante.
  // Si elle n'existe pas, on initialise la liste avec un tableau vide.
  private servers:VirtualServer[] = JSON.parse(localStorage.getItem('servers') as string) || [];

  constructor(
    private http: HttpClient
  ) { }

  // Récupère la liste des serveurs.
  getServers(): Observable<VirtualServer[]> {

    // Si la liste est déjà en cache, on la renvoie directement en Observable.
    // Sinon, on la récupère depuis le serveur et on la stocke dans le localStorage avant de la renvoyer.

    if (this.servers.length > 0) {
      return of(this.servers);
    } else {
      return this.http.get<any[]>('assets/data-servers.json')
        .pipe(
          tap((servers: any[]) => {
            this.servers = servers;
            localStorage.setItem('servers', JSON.stringify(servers));
          }),
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

  // Récupère un serveur par son identifiant.
  async getServerById(id:number): Promise<VirtualServer>{

    // Si la liste des serveurs est vide, on la récupère depuis le serveur.
    if (this.servers.length === 0) {
      try {
        this.servers = await lastValueFrom(this.getServers());
      } catch (error) {
        console.error(error);
      }
    }
    // On recherche le serveur par son identifiant.
    const server = this.servers.find(s => s.id === id);

    if(server){
      return server;
    }else{
      throw new Error(`Serveur ${id} non trouvé.`);
    }
  }

  // Ajoute un nouveau serveur à la liste.
  addServer(server: any): Observable<any> {
    const lastServerId = this.servers.length > 0 ? this.servers.slice(-1)[0].id : 0;
    server.id = lastServerId + 1;

    // Vérifiez si le nom du serveur existe déjà
    const index = this.servers.findIndex(s => s.name.toLowerCase() === server.name.toLowerCase());
    if (index !== -1) {
      const errorFactory = () => new Error('le nom de serveur est deja existe');
      return throwError(errorFactory);
    }
    server.sites = [];
    this.servers.push(server);
    localStorage.setItem('servers', JSON.stringify(this.servers));
    return of(server);
  }

  // Supprime un serveur de la liste.
  deleteServer(id: number): Observable<any> {
    const index = this.servers.findIndex(s => s.id === id);
    if(index === -1){
      const errorFactory = () => new Error('Serveur non trouvé.');
      return throwError(errorFactory);
    }
    this.servers.splice(index, 1);
    localStorage.setItem('servers', JSON.stringify(this.servers));
    return of(id);
  }

  // Récupère un site par son identifiant.
  async getSiteById(serverId: number, siteId: number): Promise<HostedSite> {

    // Si la liste des serveurs est vide, on la récupère depuis le serveur.
    if (this.servers.length === 0) {
      try {
        this.servers = await lastValueFrom(this.getServers());
      } catch (error) {
        console.error(error);
        throw new Error('Impossible de récupérer la liste des serveurs.');
      }
    }

    // On recherche le serveur par son identifiant.
    const server = this.servers.find(s => s.id === serverId);

    // Si le serveur est trouvé, on recherche le site hébergé par son identifiant.
    if (server) {
      const site = server?.sites.find(site => site.id === siteId);
      if (site) {
        return site;
      } else {
        throw new Error(`Site ${siteId} non trouvé sur le serveur ${serverId}.`);
      }
    } else {
      throw new Error(`Serveur ${serverId} non trouvé.`);
    }
  }

  // Ajoute un nouveau site à la liste des serveurs.
  addSite(serverID: number,site:any): Observable<any> {
    const server = this.servers.find(server => server.id === serverID);
    if(server){
      const lastSiteId = server.sites.length > 0 ? server.sites.slice(-1)[0].id : 0;
      site.id = lastSiteId +1;

      // Si le nom de serveur est deja exist
      const index = server.sites.findIndex(s => s.name.toLowerCase() === site.name.toLowerCase());
      if (index !== -1) {
        const errorFactory = () => new Error(`le nom de site est deja exist`);
        return throwError(errorFactory);
      }
      server.sites.push(site);
      localStorage.setItem('servers', JSON.stringify(this.servers));
      return of(server);
    }
    const errorFactory = () => new Error(`Serveur ${serverID} non trouvé.`);
    return throwError(errorFactory);
  }

  // Supprime un site de la liste.
  deleteSite(serverID: number,siteID: number): Observable<any> {
    const server = this.servers.find(server => server.id === serverID);
    if(server){
      const index = server.sites.findIndex(s => s.id === siteID);
      if(index === -1){
        const errorFactory = () => new Error(`Site ${siteID} non trouvé sur le serveur ${serverID}.`);
        return throwError(errorFactory);
      }
      server.sites.splice(index, 1);
      localStorage.setItem('servers', JSON.stringify(this.servers));
      return of(true);
    }
    const errorFactory = () => new Error(`Serveur ${serverID} non trouvé.`);
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
