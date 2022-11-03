import _ from 'lodash'
import React from 'react'

const TableBody = ({allData, columns}) => {

    const renderCellValue = (column, data) => {
        if (column.content) {
            return column.content(data)
        } else {
            return _.get(data, column.key)
        }
    }

    return (
        <tbody>
            {allData.map(data => 
                <tr key={data._id}>
                    {columns.map(column => 
                        <td key={column.key}>
                            {renderCellValue(column, data)}
                        </td>)}
                </tr>)}
        </tbody>
    );
}
 
export default TableBody;