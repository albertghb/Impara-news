import ecoHomesHero from "@/assets/eco-homes-hero.jpg";
import techFuture from "@/assets/tech-future.jpg";
import businessMeeting from "@/assets/business-meeting.jpg";
import sleepProductivity from "@/assets/sleep-productivity.jpg";
import authorSarah from "@/assets/author-sarah.jpg";

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    bio: string;
    title: string;
    socialLinks?: {
      twitter?: string;
      instagram?: string;
      linkedin?: string;
      website?: string;
    };
  };
  date: string;
  readTime: string;
  image?: string;
  category: string;
  featured?: boolean;
  tags?: string[];
}

export const articles: Article[] = [
  {
    id: "eco-friendly-homes-future-real-estate",
    title: "Eco-Friendly Homes: The Future of Real Estate",
    excerpt: "The real estate industry is undergoing a significant transformation as eco-friendly homes gain popularity among buyers and developers alike. With increasing awareness of climate change and the need for sustainable living, eco-friendly homes represent not only a lifestyle choice but also a critical step toward reducing environmental impact.",
    content: `
      <p>The real estate industry is undergoing a significant transformation as eco-friendly homes gain popularity among buyers and developers alike. With increasing awareness of climate change and the need for sustainable living, eco-friendly homes represent not only a lifestyle choice but also a critical step toward reducing environmental impact.</p>

      <h2>What are Eco-Friendly Homes?</h2>
      <p>Eco-friendly homes are designed and built to minimize energy consumption, reduce waste, and utilize sustainable materials. These homes often incorporate renewable energy sources, efficient water management systems, and environmentally friendly construction practices.</p>

      <h2>Why are Eco-Friendly Homes Important?</h2>
      <h3>1. Environmental Impact</h3>
      <p>Buildings account for a significant portion of global energy use and greenhouse gas emissions. Eco-friendly homes help reduce this footprint.</p>

      <h3>2. Cost Savings</h3>
      <p>Energy-efficient designs and renewable energy sources like solar panels lower utility bills in the long run.</p>

      <h3>3. Health Benefits</h3>
      <p>Use of non-toxic materials and improved indoor air quality create a healthier environment for occupants.</p>

      <h3>4. Future-Proof Investment</h3>
      <p>As governments and societies push for greener initiatives, eco-friendly homes are likely to increase in value and demand.</p>

      <h2>Key Features of Eco-Friendly Homes</h2>
      <ol>
        <li><strong>Energy Efficiency:</strong> High-performance insulation, energy-efficient windows, and smart home technologies help reduce energy consumption.</li>
        <li><strong>Renewable Energy:</strong> Solar panels, wind turbines, and geothermal heating systems provide sustainable energy solutions.</li>
        <li><strong>Water Conservation:</strong> Rainwater harvesting systems, low-flow fixtures, and greywater recycling systems minimize water usage.</li>
        <li><strong>Sustainable Materials:</strong> Use of bamboo, reclaimed wood, and recycled steel reduces the environmental impact of construction.</li>
        <li><strong>Smart Technologies:</strong> Energy monitors, smart thermostats, and automated lighting systems enhance efficiency and convenience.</li>
      </ol>

      <h2>Steps to Transition to Eco-Friendly Living</h2>
      <ol>
        <li><strong>Start Small:</strong> Replace traditional light bulbs with LEDs and invest in energy-efficient appliances.</li>
        <li><strong>Conduct an Energy Audit:</strong> Identify areas where energy is wasted and implement necessary changes.</li>
        <li><strong>Incorporate Renewable Energy:</strong> Install solar panels or explore community renewable energy programs.</li>
        <li><strong>Upgrade Insulation:</strong> Better insulation reduces the need for excessive heating and cooling.</li>
        <li><strong>Adopt Sustainable Habits:</strong> Reduce water usage, recycle waste, and prioritize eco-friendly products.</li>
      </ol>

      <h2>Challenges in Adopting Eco-Friendly Homes</h2>
      <p><strong>1. High Initial Costs:</strong> While the long-term savings are significant, the upfront investment can be a barrier for some buyers.</p>
      <p><strong>2. Limited Awareness:</strong> Many people are still unaware of the benefits and possibilities of eco-friendly homes.</p>
      <p><strong>3. Regulatory Hurdles:</strong> Building codes and incentives for green construction are still in development.</p>

      <h2>The Future of Eco-Friendly Real Estate</h2>
      <p>As technology advances and public awareness grows, the adoption of eco-friendly homes is expected to rise. Governments and developers are increasingly incorporating green building standards, offering incentives, and prioritizing sustainable communities.</p>

      <h2>Conclusion</h2>
      <p>Eco-friendly homes are not just a trend but a necessity for a sustainable future. They offer numerous benefits, from reducing environmental impact to providing healthier living spaces and long-term cost savings. As the real estate industry evolves, eco-friendly homes will undoubtedly play a pivotal role in shaping the future of housing.</p>
    `,
    author: {
      name: "Sarah McBride",
      avatar: authorSarah,
      bio: "Explore the journey of a personal author, their creative process, and the memorable moments that inspire their unique stories. This article delves into how authors draw from their experiences, weaving through life's power of storytelling.",
      title: "Author",
      socialLinks: {
        instagram: "https://instagram.com/sarahmcbride",
        twitter: "https://twitter.com/sarahmcbride",
        linkedin: "https://linkedin.com/in/sarahmcbride"
      }
    },
    date: "Nov 29, 2024",
    readTime: "3 mins read",
    image: ecoHomesHero,
    category: "Real Estate",
    featured: true,
    tags: ["Sustainability", "Real Estate", "Green Living", "Climate Change"]
  },
  {
    id: "future-of-artificial-intelligence",
    title: "The Future of Artificial Intelligence in Business",
    excerpt: "In today's hyperconnected world, the lines between work, leisure, and rest have blurred significantly. Notifications, endless emails, and the constant pressure to be productive have created a culture where rest is often seen as a luxury rather than a necessity.",
    content: `
      <p>Artificial Intelligence is reshaping the business landscape at an unprecedented pace. From automating routine tasks to providing deep insights through data analysis, AI is becoming an indispensable tool for modern enterprises.</p>

      <h2>Current AI Applications in Business</h2>
      <p>Today's businesses are leveraging AI in various ways:</p>
      <ul>
        <li>Customer service chatbots and virtual assistants</li>
        <li>Predictive analytics for inventory management</li>
        <li>Personalized marketing campaigns</li>
        <li>Automated financial reporting and analysis</li>
        <li>Quality control in manufacturing</li>
      </ul>

      <h2>The Transformation Ahead</h2>
      <p>The next decade will bring even more sophisticated AI implementations that will fundamentally change how businesses operate, make decisions, and interact with customers.</p>

      <p>As we move forward, companies that embrace AI responsibly will have significant competitive advantages, while those that lag behind may struggle to keep pace with market demands.</p>
    `,
    author: {
      name: "Alex Chen",
      bio: "Technology analyst and AI researcher with over 10 years of experience in emerging technologies and their business applications.",
      title: "Tech Analyst"
    },
    date: "Nov 28, 2024",
    readTime: "5 mins read",
    image: techFuture,
    category: "Technology",
    tags: ["AI", "Business", "Innovation", "Future Tech"]
  },
  {
    id: "modern-workplace-dynamics",
    title: "Understanding Modern Workplace Dynamics",
    excerpt: "Europe is a treasure trove of culinary delights, offering a diverse array of flavors, techniques, and traditions. For food enthusiasts and travelers alike, exploring European cuisine provides an incredible journey through history, culture, and innovation.",
    content: `
      <p>The modern workplace has evolved dramatically over the past decade, with remote work, flexible schedules, and collaborative technologies reshaping how teams function and communicate.</p>

      <h2>Key Changes in Workplace Culture</h2>
      <p>Several factors have contributed to the transformation of workplace dynamics:</p>
      <ul>
        <li>Digital transformation and cloud-based collaboration tools</li>
        <li>Emphasis on work-life balance</li>
        <li>Diverse and distributed team structures</li>
        <li>Focus on employee well-being and mental health</li>
      </ul>

      <h2>Adapting to New Realities</h2>
      <p>Organizations must adapt their management styles, communication strategies, and company cultures to thrive in this new environment. Success requires embracing flexibility while maintaining productivity and team cohesion.</p>
    `,
    author: {
      name: "Maria Rodriguez",
      bio: "HR consultant and workplace culture expert specializing in organizational development and employee engagement strategies.",
      title: "HR Consultant"
    },
    date: "Nov 27, 2024",
    readTime: "4 mins read",
    image: businessMeeting,
    category: "Business",
    tags: ["Workplace", "Culture", "Remote Work", "Management"]
  },
  {
    id: "science-of-sleep-productivity",
    title: "The Science of Sleep: How Rest Shapes Your Productivity",
    excerpt: "Black-and-white photography is a timeless art form that transcends trends and technology. By stripping away color, this medium allows photographers to focus on composition, contrast, texture, and emotion in their purest forms.",
    content: `
      <p>Sleep is not just a passive state of rest—it's an active process that plays a crucial role in cognitive function, emotional regulation, and overall productivity. Understanding the science behind sleep can help us optimize our rest for better performance.</p>

      <h2>The Sleep Cycle and Brain Function</h2>
      <p>During sleep, our brains undergo essential processes:</p>
      <ul>
        <li>Memory consolidation and information processing</li>
        <li>Toxin removal through the glymphatic system</li>
        <li>Neural pathway strengthening and formation</li>
        <li>Hormone regulation and cellular repair</li>
      </ul>

      <h2>Impact on Productivity</h2>
      <p>Quality sleep directly affects our ability to:</p>
      <ul>
        <li>Focus and maintain attention</li>
        <li>Make sound decisions</li>
        <li>Solve complex problems creatively</li>
        <li>Regulate emotions and stress responses</li>
      </ul>

      <h2>Optimizing Sleep for Better Performance</h2>
      <p>To maximize the productivity benefits of sleep, consider implementing consistent sleep schedules, creating a conducive sleep environment, and avoiding stimulants before bedtime.</p>
    `,
    author: {
      name: "Dr. Emma Thompson",
      bio: "Sleep researcher and neuroscientist specializing in the relationship between sleep quality and cognitive performance.",
      title: "Sleep Researcher"
    },
    date: "Nov 26, 2024",
    readTime: "6 mins read",
    image: sleepProductivity,
    category: "Health",
    tags: ["Sleep", "Productivity", "Health", "Science", "Wellness"]
  }
];

export const trendingPosts = [
  {
    id: "eco-friendly-homes-future-real-estate",
    title: "Eco-Friendly Homes: The Future of Real Estate",
    author: { name: "Sarah McBride", avatar: authorSarah },
    date: "Nov 29, 2024",
    readTime: "3 mins read",
    image: ecoHomesHero
  },
  {
    id: "future-of-artificial-intelligence",
    title: "The Future of Artificial Intelligence in Business",
    author: { name: "Alex Chen" },
    date: "Nov 28, 2024",
    readTime: "5 mins read",
    image: techFuture
  },
  {
    id: "science-of-sleep-productivity",
    title: "The Science of Sleep: How Rest Shapes Your Productivity",
    author: { name: "Dr. Emma Thompson" },
    date: "Nov 26, 2024",
    readTime: "6 mins read",
    image: sleepProductivity
  }
];