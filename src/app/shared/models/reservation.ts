export interface Reservation {
  id: number;
  stadiumId: number;
  date: string;
  isReserved: boolean;
  startTime: string;
  endTime: string;
  price: number;
}

export interface ReservationDetails {
    date: string;
    startTime: string;
    endTime: string;
    price: number;
 }