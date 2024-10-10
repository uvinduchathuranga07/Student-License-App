namespace LicenseAppAPI.Models
{
    public class StudentLicense
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Country { get; set; }
        public string Institute { get; set; }
        public string Intake { get; set; }
        public string CourseTitle { get; set; }
        public string StudentId { get; set; } // Store file name for the uploaded file
    }
}
