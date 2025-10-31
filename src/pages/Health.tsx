import { Heart } from "lucide-react";
import CategoryPage from "@/components/CategoryPage";

const Health = () => {
  const healthNews = [
    {
      id: "1",
      title: "Kurya neza ni ukurya ibiribyo akanuro umubiri - Minisitiri Dr Bagabe",
      excerpt: "Minisitiri w'ubuzima Dr Sabin Nsanzimana yashimiye abanyarwanda...",
      image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&h=500&fit=crop",
      author: "Dr. Alice Mukamana",
      date: "Ukwakira 24, 2025",
      views: "6.2k",
      readTime: "7 min"
    },
    {
      id: "2",
      title: "Inkingo ya COVID-19: Abanyarwanda 2 miliyoni barazikenewe",
      excerpt: "Minisiteri y'Ubuzima yatangaje ko abanyarwanda bagera kuri...",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=500&fit=crop",
      author: "Jean Baptiste",
      date: "Ukwakira 23, 2025",
      views: "4.8k",
      readTime: "5 min"
    },
    {
      id: "3",
      title: "Siporo n'ubuzima: Akamaro k'imyitozo ku mubiri",
      excerpt: "Abahanga mu by'ubuzima bavuga ko imyitozo ngororamubiri...",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=500&fit=crop",
      author: "Marie Claire",
      date: "Ukwakira 22, 2025",
      views: "3.5k",
      readTime: "6 min"
    },
    {
      id: "4",
      title: "Indwara z'umutima: Uburyo bwo kuzirinda",
      excerpt: "Abaganga bavuga ko indwara z'umutima zishobora kurindwa...",
      image: "https://images.unsplash.com/photo-1510627498534-cf7e9002facc?w=800&h=500&fit=crop",
      author: "Dr. Patrick Nkusi",
      date: "Ukwakira 21, 2025",
      views: "5.1k",
      readTime: "8 min"
    },
    {
      id: "5",
      title: "Ubuzima bw'abana: Inama z'abahanga",
      excerpt: "Abahanga mu by'ubuzima bw'abana batanze inama ku buryo...",
      image: "https://images.unsplash.com/photo-1542736667-069246bdbc74?w=800&h=500&fit=crop",
      author: "Sarah Uwimana",
      date: "Ukwakira 20, 2025",
      views: "4.2k",
      readTime: "5 min"
    },
    {
      id: "6",
      title: "Ubuzima bwo mu mutwe: Akamaro k'ubujyanama",
      excerpt: "Abahanga bavuga ko ubuzima bwo mu mutwe ari ingenzi nk'ubw'umubiri...",
      image: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=800&h=500&fit=crop",
      author: "Eric Mugisha",
      date: "Ukwakira 19, 2025",
      views: "3.9k",
      readTime: "6 min"
    },
  ];

  const trending = [
    {
      id: "t1",
      title: "Ubuzima bw'amenyo: Uburyo bwo kubita neza",
      views: "5.8k"
    },
    {
      id: "t2",
      title: "Indwara ya kanseri: Ibimenyetso n'uburyo bwo kuyirinda",
      views: "7.1k"
    },
    {
      id: "t3",
      title: "Ubuzima bw'abagore batwite: Inama z'ingenzi",
      views: "6.5k"
    },
    {
      id: "t4",
      title: "Imiti y'umwimerere: Akamaro n'ingaruka",
      views: "4.9k"
    },
  ];

  const categories = [
    "Nutrition & Diet",
    "Mental Health",
    "Fitness & Exercise",
    "Medical Research",
    "Disease Prevention",
    "Wellness Tips",
  ];

  return (
    <CategoryPage
      title="Health & Wellness"
      description="Latest health news, medical research, and wellness tips for a better lifestyle."
      icon={Heart}
      news={healthNews}
      trending={trending}
      categories={categories}
      accentColor="green"
    />
  );
};

export default Health;
