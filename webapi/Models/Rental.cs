using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models
{
    [Table("Rentals")]
    public class Rental
    {
        public int Id { get; set; }

        [Required]
        public string Address { get; set; } = "";

        [Required]
        public string City { get; set; } = "";

        [Required]
        public string State { get; set; } = "";

        [Required]
        public int ZipCode { get; set; }

        [Required]
        public int Bedrooms { get; set; }

        [Required]
        public int Bathrooms { get; set; }

        [Required]
        public double MonthlyRent { get; set; }

        [Required]
        public double SecurityDeposit { get; set; }

        [Required]
        public bool PetsAllowed { get; set; }

        [Required]
        public DateTime AvailableDate { get; set; }
    }
}
