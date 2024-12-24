import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

const StarRating = ({ rating, handleRatingChange }) => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          key={star}
          variant="outline"
          size="icon"
          className={`p-2 rounded-full transition-colors ${
            star <= rating
              ? "text-yellow-500 hover:bg-black"
              : "text-black hover:bg-primary hover:text-primary-foreground"
          }`}
          onClick={() => (handleRatingChange ? handleRatingChange(star) : null)}
        >
          <StarIcon
            className={`${
              star <= rating ? "fill-yellow-500" : "fill-black"
            } w-4 h-4`}
          />
        </Button>
      ))}
    </>
  );
};

export default StarRating;
