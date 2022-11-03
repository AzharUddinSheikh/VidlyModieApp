import React, { Component } from 'react';

const ListGroup = ({allData, selectedGenre, onSelectGenre}) => {
    return (
        <ul 
            style={{cursor:'pointer'}}
            className="list-group">
                {allData.map(data => 
                    <li 
                        onClick={() => onSelectGenre(data)}
                        key={data._id} 
                        className={selectedGenre.name == data.name ? 'list-group-item active' : 'list-group-item'}>
                            {data.name}
                    </li>)}
        </ul>
    );
}
 
export default ListGroup;