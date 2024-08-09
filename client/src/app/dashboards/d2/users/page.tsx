import React from 'react';
import AdvancedTable3 from '../../../shared/d1/common/AdvancedTable3';

const App = () => {
    const columns = [
        { header: 'First Name', key: 'first_name', sortable: true, readonly: false, placeholder: 'Name', type: 'text', tab: 'tab1', defaultload: true, export: true },
        { header: 'Last Name', key: 'last_name', sortable: true, readonly: false, placeholder: 'Name', type: 'text', tab: 'tab1', defaultload: true, export: true },
        { header: 'Email', key: 'email', sortable: true, readonly: false, placeholder: 'Name', type: 'text', tab: 'tab1', defaultload: true, export: true },
        { header: 'Mobile No', key: 'mobile', sortable: true, readonly: false, placeholder: 'Name', type: 'text', tab: 'tab1', defaultload: true, export: true }

    ];

    const model = [{ header: 'Users', key: 'user', sort: 'first_name', sortdirection: 'asc' }];

    const data = [
        { id: 1, name: 'John Doe', age: 28, email: 'john@example.com', role: 'Admin', address: 'Mumbai', country: 'India', active: false },
        { id: 2, name: 'Jane Smith', age: 34, email: 'jane@example.com', role: 'Admin', address: 'Mumbai', country: 'India', active: false },

        { id: 4, name: 'Saurabh', age: 45, email: 'mike@example.com', role: 'Admin', address: 'Taloja', country: 'India', active: false },
    ];

    return (
        <div className="flex items-top justify-left p-3 md:w-4/5 md:px-1 md:py-1 bg-purple-200 rounded-lg">

            <AdvancedTable3 data={[]} columns={columns} model={model} />
        </div>
    );
};

export default App;