export function getRental(id, rentals)
{
    return rentals.find(r => r.id === id);
}