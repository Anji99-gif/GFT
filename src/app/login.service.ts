import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  private apiUrl = 'https://ap.greatfuturetechno.com/login/';

  constructor(private http: HttpClient) {}

  login () {

  }

}
