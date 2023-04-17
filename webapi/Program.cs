using Microsoft.EntityFrameworkCore;
using webapi.Context;
using webapi.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddScoped<IRentalsRepository, RentalsRepository>();
builder.Services.AddDbContext<RentalContext>(options =>
    options.UseSqlServer("Data Source=LAPTOP-D7M69G1C; Initial Catalog=Rentals;  Integrated Security=true; encrypt=false;"));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
