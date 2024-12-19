import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'ECafeClient';

  constructor(
    private spinner: NgxSpinnerService,
    private toastr : ToastrService 
  ){ }

  ngOnInit(): void {
 this.spinner.show();
 this.toastr.success('Hello world!', 'Toastr fun!');
 setTimeout(() => {
  /** spinner ends after 5 seconds */
  this.spinner.hide();
}, 5000);

  }
  
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  
  
}
