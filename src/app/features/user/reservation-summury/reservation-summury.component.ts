import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reservation-summury',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './reservation-summury.component.html',
  styleUrl: './reservation-summury.component.scss'
})
export class ReservationSummuryComponent {
  @Input() stadiumName: string | undefined;
  @Input() companyName?:string;
  @Input() reservationDate: string | undefined;
  @Input() reservationTime: string | undefined;
  @Input() price: number | undefined;
  // @Input() transactionFee: number | undefined;
  // @Input() totalPrice: number | undefined;
}
