import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  ArrowLeft,
  MapPin,
  Calendar,
  Phone,
  Mail,
  ExternalLink,
  Building2,
  Clock,
  CheckCircle,
  Share2,
  Bookmark
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AdvertisementDetailPage = () => {
  const { id } = useParams();
  const [ad, setAd] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch advertisement from API
    fetch(`http://localhost:4000/api/advertisements/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setAd(data.data);
        }
      })
      .catch(err => console.error('Failed to load advertisement:', err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!ad) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Advertisement not found</h2>
          <Link to="/advertisements" className="text-orange-600 hover:text-orange-700">
            Back to advertisements
          </Link>
        </div>
      </div>
    );
  }

  // Sample advertisement data (fallback)
  const sampleAdvertisements: any = {
    "1": {
      id: "1",
      title: "MINISANTE: Itangazo ryo gusaba abakozi mu by'ubuzima",
      fullDescription: `
        <h2>Ibyerekeye itangazo</h2>
        <p>Minisiteri y'ubuzima irasaba abakozi b'ubuzima bafite ubushobozi bwo gukora mu bitaro by'ibanze. Amashyirahamwe yemewe n'ikigo cy'ubuzima azabona amahirwe yo gukora.</p>
        
        <h2>Ibyasabwa</h2>
        <ul>
          <li>Impamyabumenyi y'icyiciro cya kabiri mu by'ubuzima</li>
          <li>Uburambe bw'imyaka 2 nibura</li>
          <li>Kuba ufite ubushobozi bwo gukora mu itsinda</li>
          <li>Kuba ufite ubushobozi bwo gukoresha ikoranabuhanga</li>
          <li>Kuba ufite ubushobozi bwo kuvugana n'abarwayi</li>
        </ul>
        
        <h2>Imirimo</h2>
        <ul>
          <li>Gutanga serivisi z'ubuzima ku barwayi</li>
          <li>Gukora raporo ku gihe</li>
          <li>Gufatanya n'abandi bakozi b'ubuzima</li>
          <li>Kwiga no kwiteza imbere mu kazi</li>
        </ul>
        
        <h2>Inyungu</h2>
        <ul>
          <li>Umushahara ukwiye</li>
          <li>Ubwishingizi bw'ubuzima</li>
          <li>Amahugurwa y'umwuga</li>
          <li>Amahirwe yo kuzamuka mu kazi</li>
        </ul>
        
        <h2>Uburyo bwo kwiyandikisha</h2>
        <p>Abifuza kwiyandikisha bashobora kohereza dosiye zabo zikubiyemo:</p>
        <ul>
          <li>Ibaruwa yo gusaba akazi</li>
          <li>CV (Curriculum Vitae)</li>
          <li>Kopi y'impamyabumenyi</li>
          <li>Ibyangombwa by'uburambe</li>
        </ul>
        
        <p><strong>Itariki ntarengwa:</strong> Ukuboza 15, 2025</p>
      `,
      company: "Minisiteri y'Ubuzima",
      category: "Akazi",
      image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&h=500&fit=crop",
      location: "Kigali, Rwanda",
      date: "Ukwakira 23, 2025",
      deadline: "Ukuboza 15, 2025",
      views: "5,234",
      applicants: "156",
      contact: {
        phone: "+250 788 123 456",
        email: "recruitment@moh.gov.rw",
        website: "www.moh.gov.rw",
        address: "KN 4 Ave, Kigali"
      },
      requirements: [
        "Impamyabumenyi y'icyiciro cya kabiri",
        "Uburambe bw'imyaka 2",
        "Ubushobozi bwo gukora mu itsinda",
        "Kumenya ikoranabuhanga"
      ],
      benefits: [
        "Umushahara ukwiye",
        "Ubwishingizi bw'ubuzima",
        "Amahugurwa y'umwuga",
        "Amahirwe yo kuzamuka"
      ]
    },
    "2": {
      id: "2",
      title: "MINEDUC: Amatora y'abarimu bazajya mu mahanga",
      fullDescription: `
        <h2>Ibyerekeye gahunda</h2>
        <p>Minisiteri y'uburezi itangaje amatora y'abarimu bazajya kwiga mu mahanga. Abarimu bose bafite impamyabumenyi z'icyiciro cya kabiri bashobora kwiyandikisha.</p>
        
        <h2>Ibihugu bizakorerwa</h2>
        <ul>
          <li>Ubwongereza (UK)</li>
          <li>Leta Zunze Ubumwe z'Amerika (USA)</li>
          <li>Kanada</li>
          <li>Ubufaransa</li>
          <li>Ubuyapani</li>
        </ul>
        
        <h2>Ibyasabwa</h2>
        <ul>
          <li>Kuba umwarimu w'ikigo cy'amashuri abanza cyangwa ayisumbuye</li>
          <li>Kuba ufite uburambe bw'imyaka 3 nibura</li>
          <li>Kuba ufite impamyabumenyi y'icyiciro cya kabiri</li>
          <li>Kuba ufite ubushobozi bwo kuvugana mu cyongereza</li>
        </ul>
        
        <h2>Inyungu</h2>
        <ul>
          <li>Buruse yuzuye y'amashuri</li>
          <li>Amafaranga yo kubaho</li>
          <li>Ubwishingizi bw'ubuzima</li>
          <li>Amafaranga yo kugura ibitabo</li>
          <li>Ticket y'indege</li>
        </ul>
      `,
      company: "Minisiteri y'Uburezi",
      category: "Uburezi",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop",
      location: "Kigali, Rwanda",
      date: "Ukwakira 22, 2025",
      deadline: "Ugushyingo 30, 2025",
      views: "4,876",
      applicants: "234",
      contact: {
        phone: "+250 788 234 567",
        email: "scholarships@mineduc.gov.rw",
        website: "www.mineduc.gov.rw",
        address: "KG 7 Ave, Kigali"
      },
      requirements: [
        "Umwarimu w'ikigo cy'amashuri",
        "Uburambe bw'imyaka 3",
        "Impamyabumenyi y'icyiciro cya kabiri",
        "Kuvugana mu cyongereza"
      ],
      benefits: [
        "Buruse yuzuye",
        "Amafaranga yo kubaho",
        "Ubwishingizi",
        "Ticket y'indege"
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/advertisements" className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Subira ku matangazo</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Header Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={ad.imageUrl || ad.image_url || 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=500&fit=crop'}
                  alt={ad.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {ad.title}
                  </h1>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Company Info */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{ad.company}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {ad.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {ad.createdAt ? new Date(ad.createdAt).toLocaleDateString() : 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-orange-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">{ad.views || 0}</div>
                    <div className="text-sm text-gray-600">Abantu barabye</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{ad.applicants || 0}</div>
                    <div className="text-sm text-gray-600">Biyandikishije</div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center gap-1 text-red-600 mb-1">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="text-sm text-gray-600">{ad.deadline ? new Date(ad.deadline).toLocaleDateString() : 'N/A'}</div>
                  </div>
                </div>

                {/* Full Description */}
                <div className="prose prose-lg max-w-none mb-8">
                  {ad.fullDescription || ad.full_description ? (
                    <div dangerouslySetInnerHTML={{ __html: ad.fullDescription || ad.full_description }} />
                  ) : (
                    <p className="text-gray-700">{ad.description || 'No description available'}</p>
                  )}
                </div>

                {/* Requirements */}
                {ad.requirements && (
                  <div className="bg-blue-50 rounded-xl p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                      Ibyasabwa
                    </h3>
                    {typeof ad.requirements === 'string' ? (
                      <div className="text-gray-700 whitespace-pre-line">{ad.requirements}</div>
                    ) : Array.isArray(ad.requirements) && ad.requirements.length > 0 ? (
                      <ul className="space-y-2">
                        {ad.requirements.map((req: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                )}

                {/* Benefits */}
                {ad.benefits && (
                  <div className="bg-green-50 rounded-xl p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      Inyungu
                    </h3>
                    {typeof ad.benefits === 'string' ? (
                      <div className="text-gray-700 whitespace-pre-line">{ad.benefits}</div>
                    ) : Array.isArray(ad.benefits) && ad.benefits.length > 0 ? (
                      <ul className="space-y-2">
                        {ad.benefits.map((benefit: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                )}

                {/* Share */}
                <div className="border-t pt-6">
                  <div className="flex items-center gap-3">
                    <Button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white">
                      <Share2 className="w-4 h-4 mr-2" />
                      Sangiza
                    </Button>
                    <Button className="bg-gray-200 hover:bg-gray-300 text-gray-700">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-4"
            >
              <div className="bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-4">
                <h2 className="text-white font-bold text-xl">Amakuru yo Kuvugana</h2>
              </div>

              <div className="p-6 space-y-4">
                {/* Phone */}
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Phone className="w-4 h-4" />
                    <span className="font-semibold">Telefone</span>
                  </div>
                  <a 
                    href={`tel:${ad.contactPhone || ad.contact_phone || ad.contact?.phone}`}
                    className="text-orange-600 hover:text-orange-700 font-semibold"
                  >
                    {ad.contactPhone || ad.contact_phone || ad.contact?.phone || 'N/A'}
                  </a>
                </div>

                {/* Email */}
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Mail className="w-4 h-4" />
                    <span className="font-semibold">Email</span>
                  </div>
                  <a 
                    href={`mailto:${ad.contactEmail || ad.contact_email || ad.contact?.email}`}
                    className="text-orange-600 hover:text-orange-700 font-semibold break-all"
                  >
                    {ad.contactEmail || ad.contact_email || ad.contact?.email || 'N/A'}
                  </a>
                </div>

                {/* Website */}
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <ExternalLink className="w-4 h-4" />
                    <span className="font-semibold">Website</span>
                  </div>
                  {(ad.contactWebsite || ad.contact_website || ad.contact?.website) ? (
                    <a 
                      href={`https://${ad.contactWebsite || ad.contact_website || ad.contact?.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:text-orange-700 font-semibold break-all"
                    >
                      {ad.contactWebsite || ad.contact_website || ad.contact?.website}
                    </a>
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </div>

                {/* Address */}
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="font-semibold">Aderesi</span>
                  </div>
                  <p className="text-gray-700">{ad.contactAddress || ad.contact_address || ad.contact?.address || ad.location || 'N/A'}</p>
                </div>

                {/* Deadline */}
                <div className="bg-red-50 rounded-lg p-4 mt-6">
                  <div className="flex items-center gap-2 text-red-600 mb-2">
                    <Clock className="w-5 h-5" />
                    <span className="font-semibold">Itariki ntarengwa</span>
                  </div>
                  <p className="text-2xl font-bold text-red-600">{ad.deadline ? new Date(ad.deadline).toLocaleDateString() : 'N/A'}</p>
                </div>

                {/* Apply Button */}
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white text-lg py-6 mt-6">
                  Iyandikishe Ubu
                </Button>
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementDetailPage;
