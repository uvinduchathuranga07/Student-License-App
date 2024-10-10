import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentLicenseService {
  private apiUrl = 'https://localhost:7021/api/studentlicense'; // Your API endpoint

  constructor(private http: HttpClient) {}

  // Method to submit the application
  submitApplication(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  getStudentDetails(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);  // Call the API to delete the student
  }

  // Method to update a student by ID
  updateStudent(student: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${student.id}`, student); // Call the PUT endpoint with the student ID
  }
}
