import React from 'react';

function CurriculumList ({curriculum, selected, setSelected, selectedData, setSelectedData}) {
  const handleSelect = (e) => {
    // get the data for the curriculum item selected
    var newData = curriculum.find(item => parseInt(item.id) === parseInt(e.target.dataset.key));
    if (!selected.includes(e.target)) { // if the already selected item is not being clicked again
      if (selected[0]) {  // if there is already an item in the selected list
        selected[0].classList.remove('selected'); // update the element styling
      }
      setSelected([e.target]);  // set the selected to be the targeted element
      setSelectedData(newData); // set the selected data to be the curriculum data that was selected
      e.target.classList.add('selected'); // update the element styling 
    } 
  }

  return (
    <div className="CurriculumList">
      {curriculum.map((document, index) => ( // generate the messages by looping through the state
        <div data-key={document.id} key={index} className="document" onClick={handleSelect}>
          {document.name}
        </div>
      ))}
    </div>
  );
}

export default CurriculumList;