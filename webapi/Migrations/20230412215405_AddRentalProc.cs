using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class AddRentalProc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var createProcSql = @"CREATE PROCEDURE [dbo].[AddRental]
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
                                    SET NOCOUNT ON;
    
                                    INSERT INTO [dbo].[Rentals] ([Address], [City], [State], [ZipCode], [Bedrooms], [Bathrooms], [MonthlyRent], [SecurityDeposit], [PetsAllowed], [AvailableDate])
                                    VALUES (@Address, @City, @State, @ZipCode, @Bedrooms, @Bathrooms, @MonthlyRent, @SecurityDeposit, @PetsAllowed, @AvailableDate);
                                END";
            migrationBuilder.Sql(createProcSql);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            var dropProcSql = "DROP PROC usp_AddRental";
            migrationBuilder.Sql(dropProcSql);
        }
    }
}
