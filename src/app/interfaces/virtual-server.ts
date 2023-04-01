import { HostedSite } from "./hosted-site";

export interface VirtualServer {
  id:number;
  name:string;
  ipAddress:string;
  sites:HostedSite[];
}
