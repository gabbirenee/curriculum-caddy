import React from 'react';

function CurriculumList ({curriculum, selectedData, setSelectedData}) {
  const handleSelect = (e) => {
    // get the data for the curriculum item selected
    var newData = curriculum.find(item => parseInt(item.id) === parseInt(e.target.dataset.key));
    setSelectedData(newData); // set the selected data to be the curriculum data that was selected

    Array.from(document.querySelectorAll('.selected')).forEach(
      (el) => el.classList.remove('selected')
    );  // remove the selected class from all elements on the page
    e.target.classList.add('selected'); // update the element styling 
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