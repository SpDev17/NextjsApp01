'use client'
import React, { useState } from 'react';

const ExampleComponent: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editItem, setEditItem] = useState({ id: '', name: '', email: '', role: '' });

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleEditItem = (item: { id: string; name: string; email: string; role: string }) => {
        setEditItem(item);
        openModal();
    };

    const saveChanges = () => {
        // Handle save changes logic here
        console.log('Saving changes:', editItem);
        closeModal();
    };

    return (
        <div className="p-8">
            {/* Search input */}
            <div className="mb-4 flex items-center">
                <input
                    type="text"
                    placeholder="Search..."
                    className="px-4 py-2 border rounded-l w-64 focus:outline-none focus:ring focus:border-blue-300"
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-r">
                    Search
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">1</td>
                            <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                            <td className="px-6 py-4 whitespace-nowrap">john.doe@example.com</td>
                            <td className="px-6 py-4 whitespace-nowrap">Admin</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleEditItem({ id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' })}
                                >
                                    Edit
                                </button>
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                                    Delete
                                </button>
                            </td>
                        </tr>
                        {/* More rows as needed */}
                    </tbody>
                </table>
            </div>

            {/* Modal for item edit */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg w-96">
                        <h2 className="text-lg font-semibold mb-4">Edit Item</h2>
                        <form onSubmit={saveChanges}>
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
                                    value={editItem.role}
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

export default ExampleComponent;
