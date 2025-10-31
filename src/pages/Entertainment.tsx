import { Film } from "lucide-react";
import CategoryPage from "@/components/CategoryPage";

const Entertainment = () => {
  const entertainmentNews = [
    {
      id: "1",
      title: "Bruce Melodie yasohoye indirimbo nshya 'Sawa Sawa'",
      excerpt: "Umuhanzi Bruce Melodie yasohoye indirimbo nshya yise 'Sawa Sawa'...",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=500&fit=crop",
      author: "Grace Uwera",
      date: "Ukwakira 24, 2025",
      views: "8.5k",
      readTime: "4 min"
    },
    {
      id: "2",
      title: "Filime 'Kinyarwanda' yatsindiye igihembo mpuzamahanga",
      excerpt: "Filime 'Kinyarwanda' yakozwe n'abanyarwanda yatsindiye igihembo...",
      image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=800&h=500&fit=crop",
      author: "Jean Paul",
      date: "Ukwakira 23, 2025",
      views: "6.2k",
      readTime: "5 min"
    },
    {
      id: "3",
      title: "The Ben atangaje ko azatangiza concert mu Kigali",
      excerpt: "Umuhanzi The Ben yatangaje ko azatangiza concert nini...",
      image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=500&fit=crop",
      author: "Sarah Mutesi",
      date: "Ukwakira 22, 2025",
      views: "7.1k",
      readTime: "3 min"
    },
    {
      id: "4",
      title: "Miss Rwanda 2025: Amatora azaba ryari?",
      excerpt: "Ishyirahamwe ry'amatora ya Miss Rwanda ryatangaje ko amatora...",
      image: "https://images.unsplash.com/photo-1530981776011-6b2022628593?w=800&h=500&fit=crop",
      author: "Alice Kamanzi",
      date: "Ukwakira 21, 2025",
      views: "5.8k",
      readTime: "4 min"
    },
    {
      id: "5",
      title: "Knowless yasohoye albumu nshya 'Inzozi'",
      excerpt: "Umuhanzi Knowless Butera yasohoye albumu nshya yise 'Inzozi'...",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=500&fit=crop",
      author: "Patrick Nkusi",
      date: "Ukwakira 20, 2025",
      views: "6.9k",
      readTime: "5 min"
    },
    {
      id: "6",
      title: "Riderman yashyize ahagaragara umuziki mushya",
      excerpt: "Umuhanzi Riderman yashyize ahagaragara umuziki mushya...",
      image: "https://images.unsplash.com/photo-1541976076758-347942db1970?w=800&h=500&fit=crop",
      author: "Eric Mugisha",
      date: "Ukwakira 19, 2025",
      views: "5.3k",
      readTime: "4 min"
    },
  ];

  const trending = [
    {
      id: "t1",
      title: "Meddy yashyingiranye n'umuhanzi w'umuhanga wo muri Nigeria",
      views: "9.2k"
    },
    {
      id: "t2",
      title: "Filime 'Inyarwanda' yatsindiye igihembo cya Oscar",
      views: "8.5k"
    },
    {
      id: "t3",
      title: "Amakoraniro: Abakinnyi b'u Rwanda bazitabira",
      views: "7.8k"
    },
    {
      id: "t4",
      title: "Umuziki wa Afrobeat: Uburyo wateye imbere",
      views: "6.9k"
    },
  ];

  const categories = [
    "Music & Artists",
    "Movies & Films",
    "Celebrities",
    "Events & Concerts",
    "Fashion & Style",
    "TV Shows",
  ];

  return (
    <CategoryPage
      title="Entertainment"
      description="Latest updates from the world of entertainment, movies, music, and celebrities."
      icon={Film}
      news={entertainmentNews}
      trending={trending}
      categories={categories}
      accentColor="green"
    />
  );
};

export default Entertainment;
