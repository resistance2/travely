export const isVaildRatingNumber = (rating: number) => !isNaN(rating) && rating >= 0 && rating <= 5;
