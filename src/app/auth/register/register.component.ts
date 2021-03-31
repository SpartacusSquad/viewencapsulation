import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class RegisterComponent implements OnInit {

  constructor(
    public api:ApiService,
    public router:Router
  ) { }

  ngOnInit(): void {
  }

  user:any={};

  loading:boolean;
  register()
  {
    this.loading=true;
    this.api.register(this.user.email, this.user.password).subscribe(res=>{
      console.log(res);
      this.loading=false;
      this.router.navigate(['/login']);
    }, error=>{
      this.loading=false;
      alert('Terjadi kesalahan saat proses pendaftaran akun. Coba lagi!');
    })
  }
}
