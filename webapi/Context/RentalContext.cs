using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using webapi.Models;

namespace webapi.Context
{
    public class RentalContext : DbContext
    {
        public RentalContext(DbContextOptions<RentalContext> options)
            : base(options)
        {
        }
        public DbSet<Rental> Rentals { get; set; } = null!;
    }
}
