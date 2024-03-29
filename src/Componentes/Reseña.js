import React, { useState } from 'react';

function Reseña() {

    const [reseña, setReseña] = useState('')
    const [rating, setRating] = useState(0)


const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar lógica para enviar la información de reseña al servidor
    
  };

const handleRating = (e) => {
    const newRating = parseInt(e.target.value, 10);
    const limitedRating = Math.min(newRating, 5); // Limit to a maximum of 5
    setRating(limitedRating);
}


    return (
        <div className="text-center">
        <h2 >Añade tu reseña</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}></div>
        <label htmlFor="reseña" style={{marginRigth: '10px'}}>
            Reseña: </label>
        <textarea
        rows="4"
        columns="20"
         type="text"
         id="reseña" 
         onChange={(e) => setReseña(e.target.value)}
         />
         <p></p>

        <label htmlFor="reseña">Rating: </label>
        <input
         type="number"
         id="rating" 
         onChange={handleRating}
         />
        </div>
    );

}
export default Reseña;

