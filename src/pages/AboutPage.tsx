import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthorInfo from "@/components/AuthorInfo";
import { BusinessAdBanner } from "@/components/AdBanner";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Award, Globe } from "lucide-react";
import authorSarah from "@/assets/author-sarah.jpg";
import NewsSidebar from "@/components/NewsSidebar";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="headline-xl mb-6">About NewsHub</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We're passionate storytellers dedicated to bringing you the most compelling news, 
              insights, and perspectives that shape our world today.
            </p>
          </section>

          {/* Stats */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <div className="w-12 h-12 bg-news-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-news-accent" />
              </div>
              <div className="text-2xl font-bold text-foreground">50K+</div>
              <div className="text-sm text-muted-foreground">Monthly Readers</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-news-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-news-accent" />
              </div>
              <div className="text-2xl font-bold text-foreground">500+</div>
              <div className="text-sm text-muted-foreground">Articles Published</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-news-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-news-accent" />
              </div>
              <div className="text-2xl font-bold text-foreground">15</div>
              <div className="text-sm text-muted-foreground">Awards Won</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-news-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Globe className="w-6 h-6 text-news-accent" />
              </div>
              <div className="text-2xl font-bold text-foreground">25+</div>
              <div className="text-sm text-muted-foreground">Countries Reached</div>
            </div>
          </section>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Our Story */}
              <section>
                <h2 className="headline-lg mb-6">Our Story</h2>
                <div className="prose prose-gray max-w-none prose-p:text-muted-foreground prose-p:leading-relaxed">
                  <p>
                    NewsHub was founded in 2020 with a simple mission: to deliver high-quality, 
                    unbiased news and insights to readers around the world. What started as a 
                    small blog has grown into a trusted source for thousands of readers seeking 
                    authentic perspectives on technology, business, lifestyle, and global affairs.
                  </p>
                  <p>
                    Our team of experienced journalists and writers comes from diverse backgrounds, 
                    bringing unique viewpoints and expertise to every story we tell. We believe 
                    in the power of quality journalism to inform, inspire, and drive positive change.
                  </p>
                </div>
              </section>

              {/* Mission & Values */}
              <section>
                <h2 className="headline-lg mb-6">Our Mission & Values</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="article-card p-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-news-accent rounded-full"></div>
                      Integrity
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      We maintain the highest standards of accuracy and transparency in all our reporting.
                    </p>
                  </div>
                  <div className="article-card p-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-news-accent rounded-full"></div>
                      Innovation
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      We embrace new technologies and storytelling methods to enhance reader experience.
                    </p>
                  </div>
                  <div className="article-card p-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-news-accent rounded-full"></div>
                      Diversity
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      We celebrate diverse voices and perspectives in our content and newsroom.
                    </p>
                  </div>
                  <div className="article-card p-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-news-accent rounded-full"></div>
                      Community
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      We foster meaningful connections between readers and the stories that matter.
                    </p>
                  </div>
                </div>
              </section>

              {/* Team */}
              <section>
                <h2 className="headline-lg mb-6">Meet Our Team</h2>
                <div className="space-y-6">
                  <AuthorInfo
                    name="Sarah McBride"
                    bio="Lead journalist and editor with over 8 years of experience covering environmental and sustainability topics. Sarah's work has been featured in major publications worldwide."
                    avatar={authorSarah}
                    title="Editor-in-Chief"
                    socialLinks={{
                      twitter: "https://twitter.com/sarahmcbride",
                      linkedin: "https://linkedin.com/in/sarahmcbride",
                      instagram: "https://instagram.com/sarahmcbride"
                    }}
                  />
                  <div className="grid md:grid-cols-2 gap-6">
                    <AuthorInfo
                      name="Alex Chen"
                      bio="Technology analyst specializing in AI, blockchain, and emerging technologies with a passion for making complex topics accessible."
                      title="Tech Editor"
                      compact={true}
                    />
                    <AuthorInfo
                      name="Maria Rodriguez"
                      bio="Business and finance writer with MBA from Stanford. Expert in workplace culture and organizational development."
                      title="Business Editor"
                      compact={true}
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <NewsSidebar />
              
              <BusinessAdBanner />
              
              <div className="article-card p-6">
                <h3 className="font-semibold mb-4">Our Coverage Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Technology', 'Business', 'Environment', 'Health', 
                    'Science', 'Lifestyle', 'Politics', 'Culture'
                  ].map((topic) => (
                    <Badge key={topic} variant="outline">{topic}</Badge>
                  ))}
                </div>
              </div>

              <div className="article-card p-6">
                <h3 className="font-semibold mb-4">Recognition</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium">Best Digital Media Startup 2023</div>
                    <div className="text-muted-foreground">Digital Innovation Awards</div>
                  </div>
                  <div>
                    <div className="font-medium">Excellence in Environmental Reporting</div>
                    <div className="text-muted-foreground">Green Media Awards</div>
                  </div>
                  <div>
                    <div className="font-medium">Reader's Choice Award</div>
                    <div className="text-muted-foreground">Media Excellence 2023</div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;