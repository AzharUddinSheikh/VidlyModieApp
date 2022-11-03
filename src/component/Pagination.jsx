import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';


const Pagination = ({currentPage, itemPerPage, totalItem, onPageChange}) => {

    const pages = _.range(1, Math.ceil(totalItem/itemPerPage)+1);
    if (pages.length == 1) return;

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {pages.map(page => 
                    <li 
                        onClick={() => onPageChange(page)}
                        style={{cursor:'pointer'}}
                        key={page}
                        className={currentPage == page ? "page-item active" : "page-item"}>
                        <a className="page-link">{page}</a>
                    </li>)}
            </ul>
        </nav>
    );
}

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    itemPerPage: PropTypes.number.isRequired, 
    totalItem: PropTypes.number.isRequired, 
    onPageChange: PropTypes.func.isRequired
}

export default Pagination;