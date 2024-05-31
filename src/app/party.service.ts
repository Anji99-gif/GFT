import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  private apiUrl = 'https://ap.greatfuturetechno.com/party/';

  constructor(private http: HttpClient) {}

  getParties(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createParty(party: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, party);
  }

  updateParty(id: string, party: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}?id=${id}`, party);
  }

  deleteParty(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}?id=${id}`);
  }
}
