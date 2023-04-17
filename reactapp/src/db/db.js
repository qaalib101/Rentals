
export const getRenters = () => {
    const renters = JSON.parse(localStorage.getItem('renters')) || [];
    return renters;
};

export const addRenter = (renter) => {
    const renters = getRenters();
    const newId = renters.length + 1;
    const newRenter = { ...renter, id: newId };
    const newRenters = [...renters, newRenter];
    localStorage.setItem('renters', JSON.stringify(newRenters));
};

export const updateRenter = (updatedRenter) => {
    const renters = getRenters();
    const updatedRenters = renters.map((renter) => {
        if (renter.id === updatedRenter.id) {
            return { ...renter, ...updatedRenter };
        }
        return renter;
    });
    localStorage.setItem('renters', JSON.stringify(updatedRenters));
};

export const deleteRenter = (id) => {
    const renters = getRenters();
    const updatedRenters = renters.filter((renter) => renter.id !== id);
    localStorage.setItem('renters', JSON.stringify(updatedRenters));
};

export const getRenterByKeyValuePair = (key, value) => {
    const renters = JSON.parse(localStorage.getItem("renters")) || [];
    const foundRenter = renters.find((renter) => renter[key] == value);
    return foundRenter;
};

export const getRentersWithoutRental = () => {
    const renters = getRenters();
    const rentersWithoutRental = renters.filter((renter) => renter.rentalId === 0);
    return rentersWithoutRental;
}