import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(
    public dialogRef:MatDialogRef<ProductDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public api:ApiService
  ) { }

  ngOnInit(): void {
  }

  loading:boolean;
  saveData()
  {
    this.loading=true;
    if(this.data.id == undefined)
    {
      this.api.post('bookswithauth', this.data).subscribe(result=>{
        this.dialogRef.close(result);
        this.loading=false;
      }, error=>{
        this.loading=false;
        alert('Terjadi kesalahan saat proses penyimpanan data. Coba lagi!');
      })
      /*
      this.api.post('books', this.data).subscribe(result=>{
        this.dialogRef.close(result);
        this.loading=false;
      }, error=>{
        this.loading=false;
        alert('Terjadi kesalahan saat proses penyimpanan data. Coba lagi!');
      })
      */
    }
    else
    {
      this.api.put('bookswithauth/'+this.data.id, this.data).subscribe(result=>{
        this.dialogRef.close(result);
        this.loading=false;
        console.log(result);
      }, error=>{
        this.loading=false;
        alert('Terjadi kesalahan saat proses pembaruan data. Coba lagi!');
      })
      /*
      this.api.put('books/'+this.data.id, this.data).subscribe(result=>{
        this.dialogRef.close(result);
        this.loading=false;
        console.log(result);
      }, error=>{
        this.loading=false;
        alert('Terjadi kesalahan saat proses pembaruan data. Coba lagi!');
      }) 
      */
    }
  }

}
