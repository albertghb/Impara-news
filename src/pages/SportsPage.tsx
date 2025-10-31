import { Trophy } from "lucide-react";
import CategoryPageTemplate from "./CategoryPageTemplate";

const SportsPage = () => {
  return (
    <CategoryPageTemplate
      categorySlug="sports"
      categoryName="Sports"
      categoryNameRw="Siporo"
      description="Follow the latest sports news, match results, player updates, and championship coverage."
      icon={Trophy}
      color="orange"
      fallbackImage="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=500&fit=crop"
    />
  );
};

export default SportsPage;
