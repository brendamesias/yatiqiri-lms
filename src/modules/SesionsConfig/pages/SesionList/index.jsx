import React, { useState } from 'react';
import SesionFormModal from '../SesionForm';

const SesionList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sesionList, setSesionList] = useState([]);


    return (
      <>
        <div className='mt-12'>
            {sesionList.map(session => (
              <div key={session.id}>{session.title}</div>
            ))}
        </div>
        <SesionFormModal 
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </>
    );
}

export default SesionList;