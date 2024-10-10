using LicenseAppAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LicenseAppAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

       
        public DbSet<StudentLicense> StudentLicenses { get; set; }

       
       
    }
}
