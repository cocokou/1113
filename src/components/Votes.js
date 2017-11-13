import React from 'react';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';

const Votes = ({ score = 0, updateScore }) => {
  return (
    <span>
      <IconButton color="accent" 
        value="upVote"
        onClick={updateScore}
      ><i className="material-icons">thumb_up</i>
      </IconButton>

      <sup style={{fontSize:"18px"}}>{score} likes</sup>
    
      <IconButton
        value="downVote"
        onClick={updateScore}>
        <i className="material-icons md-18">thumb_down</i>
      </IconButton>
    </span>
  );
};

export default Votes;
