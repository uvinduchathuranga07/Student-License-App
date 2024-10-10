using LicenseAppAPI.Data;
using LicenseAppAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;

namespace LicenseAppAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentLicenseController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public StudentLicenseController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // POST: api/studentlicense
        [HttpPost]
        public async Task<IActionResult> SubmitApplication([FromForm] StudentLicense license, [FromForm] IFormFile studentId)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var existingLicense = await _context.StudentLicenses
       .FirstOrDefaultAsync(s => s.Email == license.Email);

            if (existingLicense != null)
            {
                return BadRequest(new { message = "A student with this email already exists." });
            }

            if (studentId != null && studentId.Length > 0)
            {

                var uniqueFileName = Path.GetFileNameWithoutExtension(studentId.FileName) +
                                     "_" + Guid.NewGuid().ToString() +
                                     Path.GetExtension(studentId.FileName);

                var filePath = Path.Combine(_environment.WebRootPath, "uploads", uniqueFileName);


                if (!Directory.Exists(Path.Combine(_environment.WebRootPath, "uploads")))
                {
                    Directory.CreateDirectory(Path.Combine(_environment.WebRootPath, "uploads"));
                }


                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await studentId.CopyToAsync(fileStream);
                }


                license.StudentId = "uploads/" + uniqueFileName;
            }
            else
            {

                return BadRequest(new { message = "The file upload is required." });
            }


            _context.StudentLicenses.Add(license);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Application submitted successfully!", filePath = license.StudentId });
        }


        // GET: api/studentlicense
        [HttpGet]
        public async Task<IActionResult> GetApplications()
        {
            var licenses = await _context.StudentLicenses.ToListAsync();
            return Ok(licenses);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.StudentLicenses.FindAsync(id);
            if (student == null)
            {
                return NotFound();  // Return 404 if student not found
            }

            _context.StudentLicenses.Remove(student);
            await _context.SaveChangesAsync();

            return NoContent();  // Return 204 No Content on successful deletion
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(int id, StudentLicense updatedStudent)
        {
            if (id != updatedStudent.Id)
            {
                return BadRequest();  // Ensure the ID in the URL matches the student ID
            }

            var student = await _context.StudentLicenses.FindAsync(id);
            if (student == null)
            {
                return NotFound();  // Return 404 if student not found
            }

            // Update the student's details
            student.FirstName = updatedStudent.FirstName;
            student.LastName = updatedStudent.LastName;
            student.Email = updatedStudent.Email;
            student.Phone = updatedStudent.Phone;
            student.Country = updatedStudent.Country;
            student.Institute = updatedStudent.Institute;
            student.Intake = updatedStudent.Intake;
            student.CourseTitle = updatedStudent.CourseTitle;

            // Save changes to the database
            await _context.SaveChangesAsync();

            return NoContent();  // Return 204 No Content on successful update
        }

    }
}
