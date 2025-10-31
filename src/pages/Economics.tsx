import { TrendingUp } from "lucide-react";
import CategoryPage from "@/components/CategoryPage";

const Economics = () => {
  const economicsNews = [
    {
      id: "1",
      title: "Ubukungu bw'u Rwanda bwiyongereye 8.2% mu gihembwe cya mbere",
      excerpt: "Ikigo cy'Ibarurishamibare cy'u Rwanda cyatangaje ko ubukungu bwazamutse ku rugero rudasanzwe...",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      author: "Emmanuel Nkusi",
      date: "Ukwakira 24, 2025",
      views: "5.1k",
      readTime: "6 min"
    },
    {
      id: "2",
      title: "Isoko ry'Imigabane: Ibiciro byiyongereye 3%",
      excerpt: "Isoko ry'imigabane rya Kigali ryagaragaje izamuka ry'ibiciro mu byiciro bitandukanye...",
      image: "https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=800&h=500&fit=crop",
      author: "Sarah Uwase",
      date: "Ukwakira 23, 2025",
      views: "3.8k",
      readTime: "4 min"
    },
    {
      id: "3",
      title: "Banki Nkuru y'u Rwanda yagabanije inyungu ku nguzanyo",
      excerpt: "Banki Nkuru y'u Rwanda yemeje kugabanya inyungu ku nguzanyo mu gufasha ishoramari...",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop",
      author: "Jean Claude",
      date: "Ukwakira 22, 2025",
      views: "4.5k",
      readTime: "5 min"
    },
    {
      id: "4",
      title: "Ubucuruzi hagati y'u Rwanda n'Uburayi bwiyongereye",
      excerpt: "Amasezerano y'ubucuruzi hagati y'u Rwanda n'Umuryango w'Uburayi yazamuye inyungu z'abashoramari...",
      image: "https://images.unsplash.com/photo-1524593119773-76fdd3f16a23?w=800&h=500&fit=crop",
      author: "Marie Kamanzi",
      date: "Ukwakira 21, 2025",
      views: "3.2k",
      readTime: "5 min"
    },
    {
      id: "5",
      title: "Ishoramari mu Rwanda: Abanyamahanga bashishikajwe",
      excerpt: "Abashoramari b'amahanga bagaragaje ko bashishikajwe no gushora imari mu Rwanda...",
      image: "https://images.unsplash.com/photo-1444653389962-8149286c578a?w=800&h=500&fit=crop",
      author: "Patrick Mugabo",
      date: "Ukwakira 20, 2025",
      views: "2.9k",
      readTime: "4 min"
    },
    {
      id: "6",
      title: "Amafaranga y'u Rwanda yiyongereye ku mafaranga y'amahanga",
      excerpt: "Ifaranga ry'u Rwanda ryakomeje kugaragaza imbaraga imbere y'amafaranga y'amahanga...",
      image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&h=500&fit=crop",
      author: "David Niyonzima",
      date: "Ukwakira 19, 2025",
      views: "4.1k",
      readTime: "6 min"
    },
  ];

  const trending = [
    {
      id: "t1",
      title: "Igiciro cya Bitcoin cyarenze $70,000",
      views: "7.2k"
    },
    {
      id: "t2",
      title: "Isoko ry'isi ryagaragaje iyiyongera ry'ibiciro",
      views: "6.1k"
    },
    {
      id: "t3",
      title: "Ubukungu bw'Afurika: Ibitekerezo by'abahanga",
      views: "5.5k"
    },
    {
      id: "t4",
      title: "Inflation mu Rwanda yagabanutse kuri 2.5%",
      views: "6.8k"
    },
  ];

  const categories = [
    "Stock Market",
    "Banking & Finance",
    "Business News",
    "Trade & Commerce",
    "Investment",
    "Economic Policy",
  ];

  return (
    <CategoryPage
      title="Economics & Business"
      description="Latest financial news, market updates, and economic analysis."
      icon={TrendingUp}
      news={economicsNews}
      trending={trending}
      categories={categories}
      accentColor="green"
    />
  );
};

export default Economics;
