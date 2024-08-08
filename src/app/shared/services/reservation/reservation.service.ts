import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../../models/reservation';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  //appointment
  reserveStadium(data:any):Observable<any> {
    return (this.http.post<any>(environment.baseApi+"/appointment", data))
  }

  getAvailableTimes (stadiumId: number, date: string): Observable<Reservation[]> {
    const url = `${environment.baseApi}/${stadiumId}/availableDates`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<Reservation[]>(`${url}?date=${date}`, httpOptions).pipe(
      catchError(error => {
        console.error('Erreur de récupération des créneaux horaires disponibles:', error);
        return throwError(() => new Error('Erreur de récupération des créneaux horaires disponibles'));
      })
    );
  }

  reserveDateTime(stadiumId: number, date: string, startTime: string, endTime: string): Observable<string> {
  
    const requestBody = {
      date: date,
      startTime: startTime,
      endTime: endTime,
      isReserved: false
    };
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'  // Spécifiez que la réponse est une chaîne de caractères
    };
  
    return this.http.post(`${environment.baseApi}/${stadiumId}`, requestBody, httpOptions).pipe(
      map(response => response as string),  // Transformez la réponse en chaîne de caractères
      catchError((error: HttpErrorResponse) => {
        console.error('Erreur de réservation:', error.message || error);
        return throwError(() => new Error('Erreur de réservation'));
      })
    );
  }
  
  
  
  cancelReservation(stadiumId: number, date: string, startTime: string, endTime: string): Observable<string> {
  
    const requestBody = {
      date: date,
      startTime: startTime,
      endTime: endTime
    };
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'  // Spécifiez que la réponse est du texte
    };
  
    return this.http.post(`${environment.baseApi}/${stadiumId}/cancel`, requestBody, httpOptions).pipe(
      map(response => response as string),  // Traitez la réponse comme une chaîne de caractères
      catchError((error: HttpErrorResponse) => {
        console.error('Erreur d\'annulation:', error.message || error);
        return throwError(() => new Error('Erreur d\'annulation'));
      })
    );

}

}
