
export async function getAllRentals() {
    const response = await fetch('/api/Rentals', {
        method: 'GET',
    });
    let data = await response.json();
    return data;
}

export async function getRentalById(id) {
    const response = await fetch(`/api/Rentals/${id}`, {
        method: 'GET',
    });
    let data = await response.json();
    return data;
}

export async function createRental(data) {
    const response = await fetch('/api/Rentals', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    });
    return await response.json();
}

export async function updateRental(data) {
    const response = await fetch(`/api/Rentals/${data.id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(data)
    });
    if (response.ok || response.status === 204) {
        return null;
    } else {
        throw new Error('Network response was not ok.');
    }
}

export async function deleteRental(id) {
    const response = await fetch(`/api/Rentals/${id}`, {
        method: 'DELETE'
    });
    if (response.ok || response.status === 204) {
        return null;
    } else {
        throw new Error('Network response was not ok.');
    }
}