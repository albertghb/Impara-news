import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter, Linkedin, Globe } from "lucide-react";

interface AuthorInfoProps {
  name: string;
  bio: string;
  avatar?: string;
  title?: string;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    website?: string;
  };
  compact?: boolean;
}

const AuthorInfo = ({ 
  name, 
  bio, 
  avatar, 
  title = "Author",
  socialLinks = {},
  compact = false 
}: AuthorInfoProps) => {
  if (compact) {
    return (
      <div className="author-bg rounded-xl p-4">
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={avatar} />
            <AvatarFallback className="text-lg font-semibold">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{title}</p>
            <p className="text-sm text-muted-foreground line-clamp-2">{bio}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="author-bg rounded-xl p-6">
      <div className="text-center">
        <Avatar className="w-20 h-20 mx-auto mb-4">
          <AvatarImage src={avatar} />
          <AvatarFallback className="text-2xl font-semibold">
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        
        <h3 className="headline-md mb-1">{name}</h3>
        <p className="caption-text mb-4">{title}</p>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold text-sm mb-2 text-center">ABOUT AUTHOR</h4>
        <p className="text-sm text-muted-foreground leading-relaxed text-center">
          {bio}
        </p>
      </div>

      {/* Social Links */}
      {Object.keys(socialLinks).length > 0 && (
        <div className="flex justify-center gap-3">
          {socialLinks.instagram && (
            <Button variant="ghost" size="sm" asChild>
              <a 
                href={socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 p-0"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </Button>
          )}
          
          {socialLinks.twitter && (
            <Button variant="ghost" size="sm" asChild>
              <a 
                href={socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 p-0"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </Button>
          )}
          
          {socialLinks.linkedin && (
            <Button variant="ghost" size="sm" asChild>
              <a 
                href={socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 p-0"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </Button>
          )}
          
          {socialLinks.website && (
            <Button variant="ghost" size="sm" asChild>
              <a 
                href={socialLinks.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 p-0"
              >
                <Globe className="w-4 h-4" />
              </a>
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default AuthorInfo;