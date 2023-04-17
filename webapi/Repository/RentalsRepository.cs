using Microsoft.EntityFrameworkCore;
using webapi.Context;
using webapi.Models;

namespace webapi.Repository
{
    public class RentalsRepository : IRentalsRepository
    {
        private readonly RentalContext _context;
        public RentalsRepository(RentalContext context)
        {
            _context = context;
        }
        public IEnumerable<Rental> GetAll()
        {
            return _context.Rentals.ToList();
        }
        public Rental? GetById(int RentalID)
        {
            return _context.Rentals.Find(RentalID);
        }
        public void Insert(Rental rental)
        {
            _context.Rentals.Add(rental);
        }
        public void Update(Rental Rental)
        {
            _context.Entry(Rental).State = EntityState.Modified;
        }
        public void Delete(Rental rental)
        {
            if (rental != null)
            {
                _context.Rentals.Remove(rental);
            }
        }
        public void Save()
        {
            _context.SaveChanges();
        }
        private bool disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
