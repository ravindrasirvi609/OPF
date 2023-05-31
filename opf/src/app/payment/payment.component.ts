import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { WindowRefService } from '../window-ref.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [WindowRefService]

})
export class PaymentComponent implements OnInit {
  
  paymentForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private winRef: WindowRefService) {
    this.paymentForm = this.fb.group({
      amount: ['', Validators.required],
      currency: ['', Validators.required],
      receipt: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }


  onSubmit() {
    if (this.paymentForm.valid) {
      const paymentData = this.paymentForm.value;

      // Make HTTP POST request to the server-side API endpoint
      this.http.post('/api/payment', paymentData).subscribe(
        (response) => {
          console.log(response);
          // Handle the payment response here
        },
        (error) => {
          console.error(error);
          // Handle error cases here
        }
      );
    }
  }


  
}
