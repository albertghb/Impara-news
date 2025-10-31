import { Smile } from "lucide-react";
import CategoryPageTemplate from "./CategoryPageTemplate";

const EntertainmentPage = () => {
  return (
    <CategoryPageTemplate
      categorySlug="entertainment"
      categoryName="Entertainment"
      categoryNameRw="Imyidagaduro"
      description="Discover entertainment news, celebrity updates, movie reviews, music releases, and cultural events."
      icon={Smile}
      color="purple"
      fallbackImage="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=500&fit=crop"
    />
  );
};

export default EntertainmentPage;
