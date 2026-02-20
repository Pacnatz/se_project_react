import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };
  const handleCardLike = () => {
    if (item.likes.length > 0) {
      onCardLike({ itemId: item._id, isLiked: true });
    } else {
      onCardLike({ itemId: item._id, isLiked: false });
    }
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {onCardLike && (
          <button
            className={
              item.likes?.includes(currentUser._id)
                ? "card__like-button"
                : "card__like-button_liked"
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
