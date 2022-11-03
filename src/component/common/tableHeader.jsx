import React, { Component } from 'react';

const TableHeader = ({columns, sortColumn, onSort}) => {

    const raiseSort = (path) => {
        let newSort = {...sortColumn};
        newSort = (newSort.path == path && newSort.order == 'asc') 
                    ? {path:path, order:'desc'} 
                    : {path:path, order:'asc'}
        onSort(newSort);
    }

    return (
        <thead>
            <tr style={{cursor:'pointer'}}>
                {columns.map(column => {
                    return (column.sort) ? 
                    <th 
                        key={column.key}
                        onClick={() => raiseSort(column.key)}>
                        {column.label}
                    </th> :
                    <th key={column.key}></th>
                }) }
            </tr>
        </thead>
    );
}
 
export default TableHeader;