export const isValidRatingNumber = (rating: number) =>
  Number.isNaN(rating) && rating >= 0 && rating <= 5;
