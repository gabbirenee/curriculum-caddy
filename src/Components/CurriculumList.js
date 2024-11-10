import React, {useState} from 'react';

function CurriculumList ({curriculum}) {
  // track the current document
  const [selected, setSelected] = useState([]);

  const handleSelect = (e) => {
    if (!selected.includes(e.target)) {
      if (selected[0]) {
        selected[0].classList.remove('selected');
      }
      setSelected([e.target]);
      e.target.classList.add('selected');
    } 
    else { 
      setSelected([]);
      selected[0].classList.remove('selected');
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