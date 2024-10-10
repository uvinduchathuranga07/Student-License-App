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
    }
}
