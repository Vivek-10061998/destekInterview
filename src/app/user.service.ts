import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  submitForm(formData: FormGroup): Observable<any> {
    const url = 'http://api-endpoint'; 
    const body = formData.value; 
    return this.http.post(url, body);
  }
  
  }

 

