import { TrendingUp } from "lucide-react";
import CategoryPageTemplate from "./CategoryPageTemplate";

const EconomicsPage = () => {
  return (
    <CategoryPageTemplate
      categorySlug="economics"
      categoryName="Economics"
      categoryNameRw="Ubukungu"
      description="Get the latest economic news, market trends, business updates, and financial analysis."
      icon={TrendingUp}
      color="green"
      fallbackImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop"
    />
  );
};

export default EconomicsPage;
