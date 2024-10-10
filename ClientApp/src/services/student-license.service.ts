import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentLicenseService {
  private apiUrl = 'https://localhost:7021/api/studentlicense';  // Your API endpoint

  constructor(private http: HttpClient) { }

  // Method to submit the application
  submitApplication(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}
