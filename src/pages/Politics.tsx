import { Landmark } from "lucide-react";
import CategoryPage from "@/components/CategoryPage";

const Politics = () => {
  const politicsNews = [
    {
      id: "1",
      title: "Perezida Kagame yaganiye n'abayobozi b'ibihugu by'Afurika",
      excerpt: "Perezida wa Repubulika y'u Rwanda Paul Kagame yaganiye n'abayobozi...",
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=500&fit=crop",
      author: "Jean Pierre",
      date: "Ukwakira 24, 2025",
      views: "4.2k",
      readTime: "6 min"
    },
    {
      id: "2",
      title: "Inteko Rusange y'ONU: U Rwanda rwashyikirije raporo",
      excerpt: "Inteko Rusange y'Umuryango w'Abibumbye yateraniye i New York...",
      image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&h=500&fit=crop",
      author: "Marie Uwera",
      date: "Ukwakira 23, 2025",
      views: "3.5k",
      readTime: "5 min"
    },
    {
      id: "3",
      title: "Minisitiri w'Intebe yashyikirije raporo y'ibikorwa",
      excerpt: "Minisitiri w'Intebe Dr Edouard Ngirente yashyikirije Inteko...",
      image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=500&fit=crop",
      author: "Patrick Nkusi",
      date: "Ukwakira 22, 2025",
      views: "2.8k",
      readTime: "4 min"
    },
    {
      id: "4",
      title: "Inama y'Abaminisitiri yemeje politiki nshya",
      excerpt: "Inama y'Abaminisitiri yateranye kuri uyu wa kane yemeje...",
      image: "https://images.unsplash.com/photo-1517632298121-4c7f6a36de47?w=800&h=500&fit=crop",
      author: "Alice Mukamana",
      date: "Ukwakira 21, 2025",
      views: "3.1k",
      readTime: "5 min"
    },
    {
      id: "5",
      title: "Sena: Abadepite bemeje itegeko rishya",
      excerpt: "Abadepite bo mu Nteko Ishinga Amategeko bemeje itegeko...",
      image: "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?w=800&h=500&fit=crop",
      author: "Eric Habimana",
      date: "Ukwakira 20, 2025",
      views: "2.3k",
      readTime: "4 min"
    },
    {
      id: "6",
      title: "Guverinoma yatangaje gahunda y'iterambere",
      excerpt: "Guverinoma y'u Rwanda yatangaje gahunda nshya y'iterambere...",
      image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&h=500&fit=crop",
      author: "David Mugisha",
      date: "Ukwakira 19, 2025",
      views: "3.7k",
      readTime: "7 min"
    },
  ];

  const trending = [
    {
      id: "t1",
      title: "Perezida Kagame yavuze ku bibazo by'iterambere ry'Afurika",
      views: "6.5k"
    },
    {
      id: "t2",
      title: "Ubumwe bw'Afurika: Inama y'abakuru y'ibihugu",
      views: "5.2k"
    },
    {
      id: "t3",
      title: "Politiki y'ubukungu: Ibyo guverinoma iteganya",
      views: "4.8k"
    },
    {
      id: "t4",
      title: "Amasezerano mpuzamahanga: U Rwanda rwashyize umukono",
      views: "5.9k"
    },
  ];

  const categories = [
    "National Politics",
    "International Relations",
    "Government Policies",
    "Elections",
    "Parliament",
    "Diplomacy",
  ];

  return (
    <CategoryPage
      title="Politics"
      description="Breaking political news, analysis, and updates from around the world."
      icon={Landmark}
      news={politicsNews}
      trending={trending}
      categories={categories}
      accentColor="green"
    />
  );
};

export default Politics;
