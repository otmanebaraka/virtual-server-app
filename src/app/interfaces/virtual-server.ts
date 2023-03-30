import { HostedSite } from "./hosted-site";

export interface VirtualServer {
  name:string;
  ipAddress:string;
  hostedSites:HostedSite[];
}
