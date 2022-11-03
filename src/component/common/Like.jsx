import React from 'react';

const Like = ({isLiked, onLike}) => {
    return (
        <i 
            style={{cursor:'pointer'}}
            className={isLiked ? "fa fa-heart" : "fa fa-heart-o"}
            onClick={onLike}>
        </i>
    );
}
 
export default Like;