import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, handleAddClick, handleCardClick }) {
  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__header-text">Your items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section__add-clothes-btn"
        >
          + Add new
        </button>
      </div>
      <ul className="cards__list">
        {clothingItems?.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default ClothesSection;
