// Q-1) Explain what the simple List component does.

// The list component iterates through the array of objects named 'items' received as props and renders a new component named 'SingleListItem' for each item where it passes a set of props such as:-
// a) 'onClickHandler' function to handle clicking on each item and set the 'selectedIndex' hook to the current index.
// b) 'text' string to display text
// c) current index
// d) boolean 'isSelected' to change the background of the list item to green if true and red if false.

// Q-2) What problems/warnings are there with the code?

// a) To pass a parameter in a function in the 'onClick' event the attribute should be returned by an arrow function.

//  onClick={()=>onClickHandler(index)} 
// b) index and isSelected should also be required

// WrappedSingleListItem.propTypes = {
//   index: PropTypes.number.isRequired,
//   isSelected: PropTypes.bool.isRequired,
//   onClickHandler: PropTypes.func.isRequired,
//   text: PropTypes.string.isRequired,
// };
// c) setSelectedIndex should be after selectedIndex while creating the useState hook.

// const [selectedIndex, setSelectedIndex] = useState();
// d) isSelected prop should pass a boolean value

// isSelected={selectedIndex === index}
// e) Each child in a list should have a unique "key" prop.

// key={index}
// f) Syntax error here, 'array' should be 'arrayOf' and 'shapeOf' should be shape.

// WrappedListComponent.propTypes = {
//   items: PropTypes.arrayOf(PropTypes.shape({
//     text: PropTypes.string.isRequired,
//   })),
// };
// g) Default props should be an object array instead of null value.

// WrappedListComponent.defaultProps = {
//   items: [{ text: 'No items' }],
// };


// Q-3) Please fix, optimize, and/or modify the component as much as you think is necessary.


import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const WrappedSingleListItem = ({
  index,
  isSelected,
  onClickHandler,
  text,
}) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}
      //first error
      onClick={()=>onClickHandler(index)}
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
   //second error
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({
  items,
}) => {
  //third error
  const [ selectedIndex, setSelectedIndex] = useState();

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = index => {
    setSelectedIndex(index);
  };

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map((item, index) => (
        <SingleListItem
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          //fourth error
          isSelected={selectedIndex === index}
           //fifth error
            key={index}
        />
      ))}
    </ul>
  )
};

WrappedListComponent.propTypes = {
  //sixth error
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
  })),
};

WrappedListComponent.defaultProps = {
  //seventh error
  items: [{ text: 'No items' }],
};

const List = memo(WrappedListComponent);

export default List;
