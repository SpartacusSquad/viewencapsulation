import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  
})
export class LoginComponent implements OnInit {
  
  user:any={};
  constructor(
    public api:ApiService,
    public router:Router
  ) { }

  ngOnInit(): void {
  }

  loading:boolean;
  login()
  {
    this.api.login(this.user.email, this.user.password).subscribe(res=>{
      console.log(res);
      this.loading=true;
      localStorage.setItem('appToken', JSON.stringify(res));
      this.router.navigate(['admin/product']);
      this.loading=false;
    }, error=>{
      this.loading=false;
      alert('Terjadi kesalahan saat login. Coba lagi!');
    })
  }
}
