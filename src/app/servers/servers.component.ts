import {Component, OnInit} from '@angular/core';
import {ServersService} from './servers.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  public servers: { id: number, name: string, status: string }[] = [];

  constructor(private serversService: ServersService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  // 'relativeTo' default value is '/', so it will always try to navigate to an absolute path
  // reading active route metadata from ActivatedRoute and give it to relativeTo option to navigate relatively
  onReload() {
    // this will try to go to /servers/servers and will fail
    this.router.navigate(['servers'], {relativeTo: this.route});
  }
}
