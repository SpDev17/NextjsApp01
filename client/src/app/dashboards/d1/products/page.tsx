import React from 'react';
import AdvancedTable2 from '../../../shared/d1/common/AdvancedTable2';

const App = () => {
    const columns = [
        { header: 'Name', key: 'name', sortable: true,readonly:false,placeholder:'Name' },
        { header: 'Age', key: 'age', sortable: true },
        { header: 'Email', key: 'email', sortable: true },
        { header: 'Role', key: 'role', sortable: true },
        { header: 'Address', key: 'address', sortable: true },
        { header: 'Country', key: 'country', sortable: true },
    ];

    const data = [
        { id: 1, name: 'John Doe', age: 28, email: 'john@example.com', role: 'Admin', address: 'Mumbai', country: 'India',active: false },
        { id: 2, name: 'Jane Smith', age: 34, email: 'jane@example.com', role: 'Admin', address: 'Mumbai', country: 'India',active: false },
        { id: 3, name: 'Mike Johnson', age: 45, email: 'mike@example.com', role: 'Admin', address: 'Mumbai', country: 'India',active: false },
        { id: 4, name: 'Saurabh', age: 45, email: 'mike@example.com', role: 'Admin', address: 'Taloja', country: 'India',active: false },
    ];

    return (
        <div className="flex items-top justify-left p-3 md:w-4/5 md:px-1 md:py-1 bg-purple-100 rounded-lg">

            <AdvancedTable2 data={data} columns={columns} />
        </div>
    );
};

export default App;