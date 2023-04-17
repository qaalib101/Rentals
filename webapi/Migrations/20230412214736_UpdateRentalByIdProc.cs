using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateRentalByIdProc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var createProcSql = @"
            CREATE OR ALTER PROCEDURE usp_UpdateRental
                @Id INT,
                @Address NVARCHAR(MAX),
                @City NVARCHAR(MAX),
                @State NVARCHAR(MAX),
                @ZipCode INT,
                @Bedrooms INT,
                @Bathrooms INT,
                @MonthlyRent FLOAT,
                @SecurityDeposit FLOAT,
                @PetsAllowed BIT,
                @AvailableDate DATETIME2
            AS
            BEGIN
                UPDATE Rentals SET
                    Address = @Address,
                    City = @City,
                    State = @State,
                    ZipCode = @ZipCode,
                    Bedrooms = @Bedrooms,
                    Bathrooms = @Bathrooms,
                    MonthlyRent = @MonthlyRent,
                    SecurityDeposit = @SecurityDeposit,
                    PetsAllowed = @PetsAllowed,
                    AvailableDate = @AvailableDate
                WHERE Id = @Id
            END
        ";
            migrationBuilder.Sql(createProcSql);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            var dropProcSql = "DROP PROC usp_UpdateRental";
            migrationBuilder.Sql(dropProcSql);
        }
    }
}
