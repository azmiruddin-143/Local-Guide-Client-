import {
  Utensils,
  Camera,
  Landmark,
  Mountain,
  Palette,
  Music,
  ShoppingBag,
  Waves,
} from "lucide-react";
import Link from "next/link";

// const categories = [
//   { value: "FOOD", label: "Food & Culinary" },
//   { value: "HISTORY", label: "History & Heritage" },
//   { value: "ADVENTURE", label: "Adventure" },
//   { value: "ART", label: "Art & Culture" },
//   { value: "NIGHTLIFE", label: "Nightlife" },
//   { value: "SHOPPING", label: "Shopping" },
//   { value: "PHOTOGRAPHY", label: "Photography" },
//   { value: "NATURE", label: "Nature & Wildlife" },
//   { value: "CULTURE", label: "Cultural" },
//   { value: "OTHER", label: "Other" },
// ];

const categories = [
  {
    icon: Utensils,
    name: "Food & Wine",
    value: "FOOD",
    count: 156,
    color: "from-orange-400 to-red-500",
  },
  {
    icon: Landmark,
    name: "History & Culture",
    value: "HISTORY",
    count: 203,
    color: "from-purple-400 to-indigo-500",
  },
  {
    icon: Mountain,
    name: "Adventure",
    value: "ADVENTURE",
    count: 98,
    color: "from-green-400 to-teal-500",
  },
  {
    icon: Camera,
    name: "Photography",
    value: "PHOTOGRAPHY", 
    count: 87,
    color: "from-blue-400 to-cyan-500",
  },
  {
    icon: Palette,
    name: "Art & Design",
    value: "ART",
    count: 124,
    color: "from-pink-400 to-rose-500",
  },
  {
    icon: Music,
    name: "Music & Nightlife",
    value: "NIGHTLIFE",
    count: 76,
    color: "from-violet-400 to-purple-500",
  },
  {
    icon: ShoppingBag,
    name: "Shopping",
    value: "SHOPPING",
    count: 92,
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: Waves,
    name: "Beach & Water",
    value: "OTHER",
    count: 65,
    color: "from-cyan-400 to-blue-500",
  },
];

export default function TourCategories() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the perfect tour that matches your interests
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/explore?category=${category.value}`}
              className="group bg-white rounded-2xl p-6 hover:shadow-xl transition text-center"
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} mb-4 group-hover:scale-110 transition`}
              >
                <category.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {category.name}
              </h3>
              <p className="text-gray-600 text-sm">{category.count} tours</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
