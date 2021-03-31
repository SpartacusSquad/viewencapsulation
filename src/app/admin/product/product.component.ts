import { Component, OnInit } from '@angular/core';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  title:any;
  book:any={};
  books:any=[];
  constructor(
    public dialog:MatDialog,
    public api:ApiService
  ) { 

  }

  ngOnInit(): void {
    this.title='Produk';
    this.book={
      title:'Buku Belajar Bahasa',
      author:'Alexander Michael',
      publisher:'Gramedia',
      year:2020,
      isbn:'123436478493832',
      price:970000
    };
    this.getBooks();
  }

  loading:boolean;
  getBooks()
  {
    this.loading=true;
    this.api.get('bookswithauth').subscribe(result=>{
      this.books=result;
      this.loading=false;
    },error=>{
      this.loading=false;
      alert('Terjadi kesalahan saat proses pengambilan data. Coba lagi!')
    })
    /*
    this.loading=true;
    this.api.get('books').subscribe(result=>{
      this.books=result;
      this.loading=false;
    },error=>{
      this.loading=false;
      alert('Terjadi kesalahan saat proses pengambilan data. Coba lagi!')
    })
    */
  }

  productDetails(data, idx)
  {
    let dialog=this.dialog.open(ProductDetailsComponent, {
      width:'400px',
      data:data
    });
    dialog.afterClosed().subscribe(res=>{
      if(res)
      {
        //jika idx=-1 maka tambahkan data
        if(idx==-1)this.books.push(res);
        //jika tidak maka update data
        else this.books[idx]=data;
      }
    })
  }

  loadingDelete:any={};
  deleteProduct(id, idx)
  {
    var conf=confirm('Apakah Anda yakin akan menghapus Produk?');
    if(conf)
    {
      this.loadingDelete[idx]=true;
      this.api.delete('bookswithauth/'+id).subscribe(result=>{
        this.books.splice(idx,1);
        this.loadingDelete[idx]=false;
      }, error=>{
        this.loadingDelete[idx]=false;
        alert('Terjadi kesalahan saat proses penghapusan data. Coba lagi!')
      })
      /*
      this.loadingDelete[idx]=true;
      this.api.delete('books/'+id).subscribe(result=>{
        this.books.splice(idx,1);
        this.loadingDelete[idx]=false;
      }, error=>{
        this.loadingDelete[idx]=false;
        alert('Terjadi kesalahan saat proses penghapusan data. Coba lagi!')
      })
      */
    }
  }

}
