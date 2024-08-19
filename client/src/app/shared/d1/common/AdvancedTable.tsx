'use client'
import React, { useState } from 'react';

interface TableColumn {
    key: string;
    header: string;
    sortable?: boolean;
}

interface TableProps {
    columns: TableColumn[];
    data: any[];
}

const AdvancedTable: React.FC<TableProps> = ({ columns, data }) => {
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [editItem, setEditItem] = useState<any | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showDropdownId, setShowDropdownId] = useState<string | null>(null);
    const [isLimitOpen, setIsLimitOpen] = useState(false);
    const [isSettingOpen, setIsSettingOpen] = useState(false);

    const toggleSettingDropdown = () => {
        setIsSettingOpen(!isSettingOpen);
    };

    const toggleLimitDropdown = () => {
        setIsLimitOpen(!isLimitOpen);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditItem(null);
    };

    const handleSort = (columnKey: string) => {
        if (sortColumn === columnKey) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(columnKey);
            setSortDirection('asc');
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleEditItem = (item: any) => {
        setEditItem(item);
        setShowDropdownId(null);
    };


    const saveChanges = () => {
        // Placeholder logic to save changes to server
        console.log('Saving changes:', editItem);
        setEditItem(null);
    };

    const cancelEdit = () => {
        setEditItem(null);
    };

    const handleEditItemDialog = (item: { id: string; name: string; email: string; age: string }) => {
        setEditItem(item);
        setShowDropdownId(null);
        openModal();
    };

    const saveChangesDialog = () => {
        // Handle save changes logic here
        console.log('Saving changes:', editItem);
        closeModal();
    };

    const filteredData = data && data.filter((item) =>
        Object.values(item).some((value) =>
            typeof value === 'string' ? value.toLowerCase().includes(searchTerm.toLowerCase()) : false
        )
    );

    const toggleDropdown = (id: string) => {
        if (showDropdownId === id) {
            setShowDropdownId(null);
        } else {
            setShowDropdownId(id);
        }
    };

    const sortedData = sortColumn
        ? [...filteredData].sort((a, b) => {
            const aValue = a[sortColumn];
            const bValue = b[sortColumn];

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            } else {
                return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
            }
        })
        : filteredData;

    return (
        <div className="p-4">
            {/* Search input */}
            <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center  pb-4">
                <p className="p-2 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-purple-100 dark:text-white dark:bg-gray-800">
                    Products

                </p>
                <div>
                    <button onClick={toggleLimitDropdown} id="dropdownRadioButton" data-dropdown-toggle="dropdownRadio" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <svg className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                        </svg>
                        Configuration
                        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    {isLimitOpen && (
                        <div id="dropdownRadio" className=" absolute z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top">
                            <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
                                <li>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input id="filter-radio-example-1" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="filter-radio-example-1" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">10</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input id="filter-radio-example-2" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="filter-radio-example-2" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">20</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input id="filter-radio-example-3" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="filter-radio-example-3" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">All</label>
                                    </div>
                                </li>

                            </ul>
                        </div>)}
                </div>

                <input
                    type="text"
                    placeholder="Search..."
                    className="px-4 py-1 border rounded-l w-64 focus:outline-none focus:ring focus:border-blue-300"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded-r">
                    Search
                </button>
                <div className="justify-between">
                    <div className="flex items-center justify-between">

                        <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-100 cursor-pointer rounded">
                            <p>Show:</p>
                            <select aria-label="select" className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1">
                                <option value={10} className="text-sm text-indigo-800">10</option>
                                <option value={20} className="text-sm text-indigo-800">20</option>
                                <option value={-1} className="text-sm text-indigo-800">All</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button onClick={toggleSettingDropdown} id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-purple-100 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                        <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                    </svg>
                </button>

                {isSettingOpen && (
                    <div id="dropdownDots" className=" absolute z-10 w-30 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                            </li>
                        </ul>
                        <div className="py-2">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Separated link</a>
                        </div>
                    </div>)}
            </div>
            <div className='flex flex-row'>
                <div className='basis-1/4'>01</div>
                <div className='basis-1/4'>02</div>
                <div className='basis-1/2'>03</div>
            </div>
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-purple-100 border-black">
                    <thead>
                        <tr className="bg-gray-100">
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            {columns && columns.map((column, index) => (

                                <th
                                    key={index}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => column.sortable && handleSort(column.key)}
                                >
                                    {column.header}
                                    {column.sortable && (
                                        <span className="ml-1">
                                            {sortColumn === column.key && (
                                                <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                                            )}
                                        </span>
                                    )}
                                </th>
                            ))}

                            <th className="px-6 hidden py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {sortedData && sortedData.map((item, index) => (
                            <tr key={index}>
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                                        {editItem === item ? (
                                            <input
                                                type="text"
                                                value={item[column.key]}
                                                onChange={(e) => {
                                                    const updatedItem = { ...item, [column.key]: e.target.value };
                                                    setEditItem(updatedItem);
                                                }}
                                                className="border rounded w-full px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
                                            />
                                        ) : (
                                            item[column.key]
                                        )}
                                    </td>
                                ))}
                                <td className="px-6 py-4 whitespace-nowrap hidden">
                                    {editItem === item ? (
                                        <>
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
                                                onClick={saveChanges}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 rounded ml-2"
                                                onClick={cancelEdit}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
                                            onClick={() => handleEditItem(item)}
                                        >
                                            Edit
                                        </button>
                                    )}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap relative">
                                    <div className="relative px-5 pt-2">

                                        <button className="focus:ring-2 rounded-md focus:outline-none" onClick={() => toggleDropdown(item.id)} role="button" aria-label="option">
                                            <svg className="dropbtn" onClick={() => toggleDropdown(item.id)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M4.16667 10.8332C4.62691 10.8332 5 10.4601 5 9.99984C5 9.5396 4.62691 9.1665 4.16667 9.1665C3.70643 9.1665 3.33334 9.5396 3.33334 9.99984C3.33334 10.4601 3.70643 10.8332 4.16667 10.8332Z" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                                                <path d="M10 10.8332C10.4602 10.8332 10.8333 10.4601 10.8333 9.99984C10.8333 9.5396 10.4602 9.1665 10 9.1665C9.53976 9.1665 9.16666 9.5396 9.16666 9.99984C9.16666 10.4601 9.53976 10.8332 10 10.8332Z" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                                                <path d="M15.8333 10.8332C16.2936 10.8332 16.6667 10.4601 16.6667 9.99984C16.6667 9.5396 16.2936 9.1665 15.8333 9.1665C15.3731 9.1665 15 9.5396 15 9.99984C15 10.4601 15.3731 10.8332 15.8333 10.8332Z" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                        </button>
                                        {showDropdownId === item.id && (
                                            <div className="absolute right-0 mt-2 w-48 bg-grey-500 border rounded-lg shadow-lg z-500">
                                                <div className="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6">
                                                    <button
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left hover:cursor-pointer"
                                                        onClick={() => handleEditItemDialog(item)} >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left hover:cursor-pointer"
                                                        onClick={() => handleEditItem(item)} >
                                                        Inline Edit
                                                    </button>
                                                    <button
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-100 w-full text-left hover:cursor-pointer"

                                                    >
                                                        Delete
                                                    </button> </div>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for item edit */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg w-96">
                        <h2 className="text-lg font-semibold mb-4">Edit Item</h2>
                        <form onSubmit={saveChangesDialog}>
                            <div className="mb-4">
                                <label htmlFor="editName" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="editName"
                                    value={editItem.name}
                                    onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none sm:text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="editEmail" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="editEmail"
                                    value={editItem.email}
                                    onChange={(e) => setEditItem({ ...editItem, email: e.target.value })}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none sm:text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="editRole" className="block text-sm font-medium text-gray-700">
                                    Role
                                </label>
                                <input
                                    type="text"
                                    id="editRole"
                                    value={editItem.age}
                                    onChange={(e) => setEditItem({ ...editItem, role: e.target.value })}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none sm:text-sm"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdvancedTable;
