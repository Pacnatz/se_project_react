import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, handleCardClick }) {
  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__header-text">Your items</p>
        <button type="button" className="clothes-section__add-clothes-btn">
          + Add new
        </button>
      </div>
      <ul className="cards__list">
        {clothingItems?.map((item) => {
          return (
            <ItemCard key={item.id} item={item} onCardClick={handleCardClick} />
          );
        })}
      </ul>
    </section>
  );
}

export default ClothesSection;
