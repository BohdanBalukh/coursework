import React from 'react';
import '../styles/StarRating.css';


interface StarRatingProps {
  rating: number; // від 1 до 5
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= rating ? 'star filled' : 'star'}>
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
