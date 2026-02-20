import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  handleAddClick,
  handleCardClick,
  handleEditProfileClick,
  onCardLike,
}) {
  return (
    <main className="profile">
      <SideBar handleEditProfileClick={handleEditProfileClick} />
      <ClothesSection
        clothingItems={clothingItems}
        handleAddClick={handleAddClick}
        handleCardClick={handleCardClick}
        onCardLike={onCardLike}
      />
    </main>
  );
}

export default Profile;
