"use client";
import React from "react";
import { useGetProductsQuery } from "@/state/api";
import Header from "@/app/dashboards/inventry/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
//import AntDesignGrid from './page1'

const columns: GridColDef[] = [
  { field: "productId", headerName: "ID", width: 90 ,headerClassName: 'bg-white'},
  { field: "name", headerName: "Product Name", width: 200,headerClassName: 'bg-white' },
  {
    field: "price",
    headerName: "Price",
    width: 110,
    type: "number",
    valueGetter: (value, row) => `$${row.price}`,headerClassName: 'bg-white'
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 110,
    type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),headerClassName: 'bg-white'
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    width: 150,
    type: "number",headerClassName: 'bg-white'
  },
];

const Inventory = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row.productId}
        checkboxSelection
        
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
};

export default Inventory;
