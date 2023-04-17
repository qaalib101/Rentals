import React, { Component, UseState } from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Layout, Home } from './containers/index';
import { Add as AddRental, Edit as EditRental, View as ViewRental, Rentals } from './containers/rentals/index';
import { Add as AddRenter, Edit as EditRenter, View as ViewRenter, Renters } from './containers/renters/index';
import RenterContext from './context/renterContext';
import { getRenters, addRenter, updateRenter, deleteRenter, getRenterByKeyValuePair, getRentersWithoutRental } from './db/db';

export default function App() {

    return (
        <div>
            <RenterContext.Provider value={{ getRenters, getRentersWithoutRental, addRenter, updateRenter, deleteRenter, getRenterByKeyValuePair }}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="rentals" element={<Rentals />} />
                        <Route path="rentals/add" element={<AddRental />} />
                        <Route path="rentals/edit/:id" element={<EditRental />} />
                        <Route path="rentals/view/:id" element={<ViewRental />} />
                        <Route path="renters" element={<Renters />} />
                        <Route path="renters/add" element={<AddRenter />} />
                        <Route path="renters/edit/:id" element={<EditRenter />} />
                        <Route path="renters/view/:id" element={<ViewRenter />} />
                        <Route path="*" element={<Home />} />
                    </Route>
                </Routes>
            </RenterContext.Provider>
        </div>
    );
}
