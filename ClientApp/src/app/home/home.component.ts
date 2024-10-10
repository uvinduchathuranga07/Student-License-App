import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentLicenseService } from 'src/services/student-license.service';  // Angular service to handle API requests

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  studentForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private studentService: StudentLicenseService) {
    // Initialize the form
    this.studentForm = this.fb.group({
      stuid:  ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      institute: ['', Validators.required],
      intake: ['', Validators.required],
      courseTitle: ['', Validators.required],
      studentId: [null, Validators.required],  // This will hold the file input
    });
  }

  // Handle file input change
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Submit form
  onSubmit() {
    if (this.studentForm.valid && this.selectedFile) {
      const formData = new FormData();

      // Append form data
      formData.append('StudentId', this.studentForm.get('stuid')?.value);
      formData.append('firstName', this.studentForm.get('firstName')?.value);
      formData.append('lastName', this.studentForm.get('lastName')?.value);
      formData.append('email', this.studentForm.get('email')?.value);
      formData.append('phone', this.studentForm.get('phone')?.value);
      formData.append('country', this.studentForm.get('country')?.value);
      formData.append('institute', this.studentForm.get('institute')?.value);
      formData.append('intake', this.studentForm.get('intake')?.value);
      formData.append('courseTitle', this.studentForm.get('courseTitle')?.value);
      
      // Append the selected file
      formData.append('studentId', this.selectedFile!);

      // Call the service to send the data to the backend API
      this.studentService.submitApplication(formData).subscribe(
        response => {
          console.log('Application submitted successfully', response);
          alert('Application submitted successfully!');
          this.studentForm.reset();  // Reset the form on success
        },
        error => {
          console.error('Error submitting application', error);
          if (error.status === 0) {
            alert('Application submitted successfully!');
            this.studentForm.reset(); 
          } else {
            alert(`Error: ${error.message}`);
          }
        }
      );
      
    } else {
      console.log('Form is not valid');
    }
  }
}
