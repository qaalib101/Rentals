using System.Linq.Expressions;
using webapi.Models;

namespace webapi.Repository
{
    public interface IRentalsRepository
    {
        IEnumerable<Rental> GetAll();
        Rental? GetById(int RentalID);
        void Insert(Rental rental);
        void Update(Rental rental);
        void Delete(Rental rental);
        void Save();
    }
}
