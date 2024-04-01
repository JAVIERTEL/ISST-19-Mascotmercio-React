import React, { useState } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
const Reseñas = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    text: '',
    rating: 0,
    photos: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onStarClick = (nextValue) => {
    setNewReview((prevState) => ({
      ...prevState,
      rating: nextValue,
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = e.target.files;
    const uploadedPhotos = Array.from(files).map((file) => URL.createObjectURL(file));
    setNewReview((prevState) => ({
      ...prevState,
      photos: prevState.photos.concat(uploadedPhotos),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setReviews((prevReviews) => [...prevReviews, newReview]);
    setNewReview({
      text: '',
      rating: 0,
      photos: [],
    });
  };

  return (
    <div>
      <h2>Reseñas</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          name="text"
          value={newReview.text}
          onChange={handleInputChange}
          placeholder="Escribe tu reseña aquí..."
          required
        />
        <input type="file" multiple onChange={handlePhotoUpload} />
        <StarRatingComponent
          name="rating"
          starCount={5}
          value={newReview.rating}
          onStarClick={onStarClick}
        />
        <Button type="submit">Enviar reseña</Button>
      </form>
      <div>
        {reviews.map((review, index) => (
          <div key={index}>
            <p>{review.text}</p>
            <StarRatingComponent
              name={`rating-${index}`}
              starCount={5}
              value={review.rating}
              editing={false}
            />
            <div>
              {review.photos.map((photo, i) => (
                <img key={i} src={photo} alt={`Photo ${i}`} style={{ maxWidth: '100px' }} />
              ))}
            </div>
            {/* Aquí podría ir la sección para que los propietarios respondan */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reseñas;
