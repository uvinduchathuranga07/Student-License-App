import { Component, OnInit  } from '@angular/core';
import { StudentLicenseService } from 'src/services/student-license.service';
@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.component.html',
  styleUrls: ['./viewdetails.component.css']
})
export class ViewdetailsComponent  {
  studentDetails: any = [];
  baseUrl: string = 'https://localhost:7021/';
  constructor(private StudentLicenseService: StudentLicenseService) { }

  ngOnInit() {
    this.fetchStudentDetails();
  }

  fetchStudentDetails(): void {
    this.StudentLicenseService.getStudentDetails().subscribe(
      (data) => {
        // Prepend baseUrl to studentId for each student
        this.studentDetails = data.map((student: any) => {
          return {
            ...student,
            studentId: this.baseUrl + student.studentId  // Construct full file URL
          };
        });
        console.log('Fetched Student Details:', this.studentDetails);
      },
      (error) => {
        console.error('Error fetching student details:', error);
      }
    );
  }
  printTable(): void {
    const printContent = document.getElementById('studentTable');
    const WindowPrt = window.open('', '', 'width=900,height=650');
    WindowPrt?.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>${printContent?.outerHTML}</body>
      </html>
    `);
    WindowPrt?.document.close();
    WindowPrt?.focus();
    WindowPrt?.print();
    WindowPrt?.close();
  }

}
