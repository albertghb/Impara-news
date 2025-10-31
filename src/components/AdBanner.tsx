import { Button } from "@/components/ui/button";

interface AdBannerProps {
  type?: 'rectangle' | 'banner' | 'square' | 'skyscraper';
  title?: string;
  description?: string;
  buttonText?: string;
  backgroundColor?: string;
  size?: 'sm' | 'md' | 'lg';
}

const AdBanner = ({ 
  type = 'rectangle', 
  title = "Your Ad Here", 
  description = "Reach thousands of engaged readers with your message",
  buttonText = "Learn More",
  backgroundColor = "bg-gradient-to-br from-news-accent/10 to-news-accent/5",
  size = 'md'
}: AdBannerProps) => {
  const sizeClasses = {
    sm: 'h-32',
    md: 'h-48', 
    lg: 'h-64'
  };

  const typeClasses = {
    rectangle: 'aspect-video max-w-md',
    banner: 'w-full h-24 max-h-24',
    square: 'aspect-square max-w-xs',
    skyscraper: 'w-32 h-96'
  };

  return (
    <div className={`
      ${backgroundColor} 
      ${type === 'banner' ? typeClasses.banner : `${typeClasses[type]} ${sizeClasses[size]}`}
      border border-border/30 rounded-lg 
      flex flex-col items-center justify-center 
      p-4 text-center group hover:border-border transition-all duration-200
      relative overflow-hidden
    `}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-2">
        <div className="text-xs text-muted-foreground font-medium tracking-wider uppercase opacity-60">
          Sponsored
        </div>
        
        {type !== 'banner' && (
          <>
            <h3 className="font-semibold text-sm text-foreground group-hover:text-news-accent transition-colors">
              {title}
            </h3>
            <p className="text-xs text-muted-foreground text-center max-w-[200px]">
              {description}
            </p>
            <Button variant="outline" size="sm" className="mt-2 text-xs px-3 py-1 h-7">
              {buttonText}
            </Button>
          </>
        )}

        {type === 'banner' && (
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-foreground">{title}</h3>
            </div>
            <Button variant="outline" size="sm" className="text-xs px-3 py-1 h-7">
              {buttonText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Predefined ad variants
export const TechAdBanner = () => (
  <AdBanner
    title="Cloud Solutions Pro"
    description="Scale your business with enterprise-grade cloud infrastructure"
    buttonText="Start Free Trial"
    backgroundColor="bg-gradient-to-br from-blue-50 to-blue-100"
  />
);

export const BusinessAdBanner = () => (
  <AdBanner
    title="Business Analytics Suite"
    description="Transform data into actionable insights for your growing business"
    buttonText="Book Demo"
    backgroundColor="bg-gradient-to-br from-green-50 to-green-100"
  />
);

export const LifestyleAdBanner = () => (
  <AdBanner
    title="Premium Wellness App"
    description="Track your health, meditation, and fitness goals in one place"
    buttonText="Download Now"
    backgroundColor="bg-gradient-to-br from-purple-50 to-purple-100"
  />
);

export const BannerAd = () => (
  <AdBanner
    type="banner"
    title=""
    buttonText=""
    backgroundColor="bg-muted/20"
  />
);

export default AdBanner;