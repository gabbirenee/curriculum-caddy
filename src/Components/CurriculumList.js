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

    // hide the placeholder document in list
    Array.from(document.querySelectorAll('.placeholder-doc')).forEach(
      (el) => {
        el.classList.add('hide');
      }
    );
  } 

  return (
    <div className="CurriculumList">
      <div className="existing-docs">
        {curriculum.map((document, index) => ( // generate the messages by looping through the state
          <div data-key={document.id} key={index} className="document" onClick={handleSelect}>
            {document.name}
          </div>
        ))}
        <div className="placeholder-doc">New Document</div>
      </div>
    </div>
  );
}

export default CurriculumList;