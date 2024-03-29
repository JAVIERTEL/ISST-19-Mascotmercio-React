import React, { useState } from 'react';

function Reseña() {

    const [reseña, setReseña] = useState('')
    const [rating, setRating] = useState(0)


const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar lógica para enviar la información de reseña al servidor
    
  };


    return (
        <div>
        <h2 className="text-center">Añade tu reseña</h2>
        <label htmlFor="reseña">Reseña: </label>
        <input
         type="text"
         id="reseña" 
         onChange={(e) => setReseña(e.target.value)}
         />
         <p></p>

        <label htmlFor="reseña">Rating: </label>
        <input
         type="number"
         id="rating" 
         onChange={(e) => setRating(e.target.value)}
         />
        </div>
    );

}
export default Reseña;

