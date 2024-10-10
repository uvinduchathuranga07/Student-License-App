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
  searchText: string = ''; 
  editingStudent: any = null;  // Variable to hold the student being edited
  editModal: any; 

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


  // Update a student (send updated details to the server)
  updateStudent(): void {
    this.StudentLicenseService.updateStudent(this.editingStudent).subscribe(
      () => {
        // Replace the updated student in the list
        const index = this.studentDetails.findIndex((s: any) => s.id === this.editingStudent.id);
        if (index !== -1) {
          this.studentDetails[index] = this.editingStudent;
        }
        alert('Student updated successfully!');
        this.editModal.hide();  // Hide the modal on success
        this.editingStudent = null;  // Clear the form
      },
      (error) => {
        console.error('Error updating student:', error);
      }
    );
  }
  // Method to delete a student by ID
  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      console.log('Attempting to delete student with ID:', id);  // Debugging
      this.StudentLicenseService.deleteStudent(id).subscribe({
        next: () => {
          console.log('Student deleted successfully');  // Debugging
          this.studentDetails = this.studentDetails.filter((student: any) => student.id !== id);
          alert('Student deleted successfully!');
        },
        error: (err) => {
          console.error('Error deleting student:', err);
          alert('Error deleting student');
        },
        complete: () => {
          console.log('Deletion complete');
        }
      });
    }
  }
  filteredStudentDetails() {
    if (!this.searchText) {
      return this.studentDetails;  // Return all students if no search text
    }

    // Filter the student details array by first name, last name, or email
    return this.studentDetails.filter((student: any) => {
      const searchTerm = this.searchText.toLowerCase();
      return (
        student.firstName.toLowerCase().includes(searchTerm) ||
        student.lastName.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm)
      );
    });
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
