import { Heart } from "lucide-react";
import CategoryPageTemplate from "./CategoryPageTemplate";

const HealthPage = () => {
  return (
    <CategoryPageTemplate
      categorySlug="health"
      categoryName="Health"
      categoryNameRw="Ubuzima"
      description="Stay updated with health news, medical breakthroughs, wellness tips, and healthcare information."
      icon={Heart}
      color="red"
      fallbackImage="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=500&fit=crop"
    />
  );
};

export default HealthPage;
