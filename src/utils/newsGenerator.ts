// News generator utility for IMPARA NEWS

type Category = 'Sports' | 'Economics' | 'Politics' | 'Entertainment';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  date: string;
  readTime: string;
  image?: string;
  featured?: boolean;
  tags?: string[];
}

const sportsKeywords = [
  'Champions League', 'Premier League', 'NBA', 'World Cup', 'Olympics',
  'Grand Slam', 'Formula 1', 'UFC', 'transfer news', 'injury update'
];

const economicsKeywords = [
  'interest rates', 'stock market', 'inflation', 'GDP growth', 'cryptocurrency',
  'trade deal', 'economic recovery', 'unemployment', 'fiscal policy', 'market analysis'
];

const politicsKeywords = [
  'election', 'summit', 'diplomatic relations', 'policy change', 'international law',
  'government', 'parliament', 'sanctions', 'treaty', 'public opinion'
];

const entertainmentKeywords = [
  'Oscars', 'Netflix', 'box office', 'celebrity', 'premiere',
  'album release', 'award show', 'streaming', 'red carpet', 'blockbuster'
];

const generateId = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

const generateContent = (title: string, category: Category): string => {
  const intro = `In a recent development in the ${category.toLowerCase()} sector, ${title.toLowerCase()}. `;
  const middle = `This significant event has drawn attention from analysts and enthusiasts alike, with many experts weighing in on its potential impact. `;
  const conclusion = `As the situation continues to develop, stay tuned to IMPARA NEWS for the latest updates and in-depth analysis.`;
  
  return `<p>${intro}${middle}${conclusion}</p>`;
};

const getRandomDate = (): string => {
  const start = new Date(2024, 0, 1);
  const end = new Date();
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

export const generateNewsItem = (category: Category): NewsItem => {
  const keywords = {
    Sports: sportsKeywords,
    Economics: economicsKeywords,
    Politics: politicsKeywords,
    Entertainment: entertainmentKeywords
  }[category];

  const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
  const title = `Breaking: ${category} - ${randomKeyword} ${['update', 'news', 'report', 'analysis'][Math.floor(Math.random() * 4)]}`;
  
  const excerpt = `Latest updates on ${randomKeyword} in the ${category} world. Stay informed with IMPARA NEWS.`;
  
  return {
    id: `${category.toLowerCase()}-${generateId(randomKeyword)}`,
    title,
    excerpt,
    content: generateContent(title, category),
    category,
    date: getRandomDate(),
    readTime: `${Math.floor(Math.random() * 5) + 1} min read`,
    featured: Math.random() > 0.8,
    tags: [category.toLowerCase(), randomKeyword.split(' ')[0].toLowerCase()]
  };
};

export const generateNewsFeed = (count: number, category?: Category): NewsItem[] => {
  const categories: Category[] = category ? [category] : ['Sports', 'Economics', 'Politics', 'Entertainment'];
  const news: NewsItem[] = [];
  
  for (let i = 0; i < count; i++) {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    news.push(generateNewsItem(randomCategory));
  }
  
  return news;
};

// Add types to window for development
if (typeof window !== 'undefined') {
  (window as any).generateNewsFeed = generateNewsFeed;
  (window as any).generateNewsItem = generateNewsItem;
}
