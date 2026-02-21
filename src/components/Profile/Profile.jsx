import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  handleAddClick,
  handleCardClick,
  handleEditProfileClick,
  onCardLike,
  handleSignOut,
}) {
  return (
    <main className="profile">
      <SideBar
        handleEditProfileClick={handleEditProfileClick}
        handleSignOut={handleSignOut}
      />
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
