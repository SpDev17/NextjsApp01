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

const AdvancedTable2: React.FC<TableProps> = ({ columns, data }) => {
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [editItem, setEditItem] = useState<any | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showDropdownId, setShowDropdownId] = useState<string | null>(null);
    const [isLimitOpen, setIsLimitOpen] = useState(false);
    const [isSettingOpen, setIsSettingOpen] = useState(false);

    const [isActionOpen, setIsActionOpen] = useState(false);
    const [isItemActionOpen, setIsItemActionOpen] = useState(false);



    const [checkedItems, setCheckedItems] = useState(data);
    const [selectAll, setSelectAll] = useState(false);

    const handleSingleClick = (id: any) => {
      
        // Create a new copy of the state
        const carsCopy = [...checkedItems];

        // Find the car that was clicked
        let itemToUpdate = carsCopy.find((item) => item.id === id);

        itemToUpdate!.active = !itemToUpdate!.active;

        if (!itemToUpdate!.active && selectAll) {
            handleSelectAll();
        }

        // Set the state
        setCheckedItems(carsCopy);

        // Logic for selectAll
        // 1. If ALL items are active (selected), selectAll -> true
        // 2. If even ONE item is NOT active (selected), selectAll -> false

        let flag = true;
        for (let i = 0; i < checkedItems.length; i++) {
            flag = flag && checkedItems[i].active;
        }

        if (flag && !selectAll) {
            handleSelectAll();
        }
    };

    const handleSelectAll = () => {
        
        // Toggling selectAll state
        setSelectAll((prevState) => !prevState);

        // selectAll is NOT the latest
        setCheckedItems(checkedItems.map((item) => ({ ...item, active: !selectAll })));
        //setCheckedItems(checkedItems.map((item) => ({ ...item, active: false})));
    };

    const toggleActionDropdown = () => {
        setIsActionOpen(!isActionOpen);
    };
    const toggleItemActionDropdown = () => {
        setIsItemActionOpen(!isItemActionOpen);
    };

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

    const handleMouseOutDialog = () => {

        setShowDropdownId(null);
    }

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
        <div className="flex items-top justify-left p-3 md:px-1 md:py-1 bg-purple-100 rounded-lg w-full">
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 w-full">
                <div className="mx-auto max-w-screen-xl px-4">

                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 w-full">
                            <div className=" md:w-3/4">


                                <div className="flex justify-between">
                                    <p>Product</p>
                                    <div className="flex items-center justify-between">
                                        <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-100 cursor-pointer rounded">
                                            <p> Show:</p>
                                            <select aria-label="select" className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1">
                                                <option value={10} className="text-sm text-indigo-800">10</option>
                                                <option value={20} className="text-sm text-indigo-800">20</option>
                                                <option value={-1} className="text-sm text-indigo-800">All</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="md:w-1/4 flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <div className="">
                                    <form className="flex items-center">
                                        <label htmlFor="simple-search" className="sr-only">Search</label>
                                        <div className="relative w-full">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                            <input  value={searchTerm} onChange={handleSearch} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Inline Search" required="" />
                                        </div>
                                    </form>
                                </div>
                                <div className="relative inline-block text-left">
                                    <div>
                                        <button onClick={toggleActionDropdown} id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-purple-100 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                                                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                                            </svg>
                                        </button>

                                    </div>
                                    {isActionOpen && (

                                        <div className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                            <div className="py-1" role="none">

                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="menu-item-0">Add Product</a>
                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="menu-item-1">Export</a>
                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="menu-item-2">Refresh</a>
                                                <form method="POST" action="#" role="none">
                                                    <button type="submit" className="block w-full px-4 py-2 text-left text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-3">Sign out</button>
                                                </form>
                                            </div>
                                        </div>
                                    )}
                                </div>


                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3"><div className="flex items-center">
                                            <input checked={selectAll} onChange={handleSelectAll} id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                        </div></th>
                                        {columns && columns.map((column, index) => (

                                            <th
                                                key={index}
                                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
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
                                        <th scope="col" className="px-4 py-3">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedData && sortedData.map((item, index) => (
                                        <tr key={index} className="border-b dark:border-gray-700">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center">
                                                    <input  checked={item.active} onChange={() => handleSingleClick(item.id)} id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                                </div>
                                            </td>
                                            {columns.map((column, colIndex) => (
                                                <td key={colIndex} className="px-4 py-3">
                                                    {item[column.key]}
                                                </td>
                                            ))}
                                            <td className="px-4 py-3 flex items-center justify-end">
                                                <button onClick={() => toggleDropdown(item.id)} id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-27-dropdown" className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                    </svg>
                                                </button>
                                                {showDropdownId === item.id && (
                                                    <div onMouseOut={handleMouseOutDialog} id="apple-imac-27-dropdown" className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="apple-imac-27-dropdown-button">
                                                            <li>
                                                                <a className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:cursor-pointer">Show</a>
                                                            </li>
                                                            <li>
                                                                <a onClick={() => handleEditItemDialog(item)} className="hover:cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                                            </li>
                                                        </ul>
                                                        <div className="py-1">
                                                            <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                                                        </div>
                                                    </div>)}
                                            </td>
                                        </tr>

                                    ))}


                                </tbody>
                            </table>
                        </div>
                        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                Showing
                                <span className="font-semibold text-gray-900 dark:text-white">1-10</span>
                                of
                                <span className="font-semibold text-gray-900 dark:text-white">1000</span>
                            </span>
                            <ul className="inline-flex items-stretch -space-x-px">
                                <li>
                                    <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span className="sr-only">Previous</span>
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                                </li>
                                <li>
                                    <a href="#" aria-current="page" className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span className="sr-only">Next</span>
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
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

export default AdvancedTable2;
