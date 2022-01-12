import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface ratingtype {
  rating: number;
  onClick?: ((event: number) => void) & any;
  style?: any;
}

export const Rating = ({ rating, onClick, style }: ratingtype) => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <span key={i} onClick={() => onClick(i)} style={style}>
          {rating > i ? (
            <AiFillStar fontSize="15px" />
          ) : (
            <AiOutlineStar fontSize="15px" />
          )}
        </span>
      ))}
    </>
  );
};
