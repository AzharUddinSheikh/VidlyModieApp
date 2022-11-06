import React from 'react';
import TableBody from './TableBody';
import TableHeader from './tableHeader';

const Table = ({columns, allData, onSort, sortColumn}) => {
    return (
        <table className="table">
           <TableHeader
                onSort={onSort}
                sortColumn={sortColumn}
                columns={columns}
                />
            <TableBody 
                allData={allData}
                columns={columns}/>
        </table>
    );
}
 
export default Table;