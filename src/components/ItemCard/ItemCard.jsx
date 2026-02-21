import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };
  const handleCardLike = () => {
    const isLiked = item.likes.some((id) => id === currentUser._id);

    onCardLike({ itemId: item._id, isLiked });
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {onCardLike && (
          <button
            className={
              item.likes?.includes(currentUser._id)
                ? "card__like-button_liked"
                : "card__like-button"
            }
            onClick={handleCardLike}
          />
        )}
      </div>
      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="card__img"
      />
    </li>
  );
}

export default ItemCard;
