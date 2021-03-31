import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    public api:ApiService,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin()
  {
    this.api.get('bookswithauth/status').subscribe(res=>{
      //jika logged on
      return;
    }, error=>{
      //jika logged out
      this.router.navigate(['/login']);
    })
  }

  logout()
  {
    let conf=confirm('Apakah Anda yakin akan keluar aplikasi?');
    if(conf)
    {
      localStorage.removeItem('appToken');
      window.location.reload();
    }
  }
}
