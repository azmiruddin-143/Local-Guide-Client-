"use client";

import { useSearchParams } from "next/navigation";
import FilterBadges from "@/components/shared/FilterBadges";

const categoryLabels: Record<string, string> = {
  FOOD: "Food & Culinary",
  HISTORY: "History & Heritage",
  ADVENTURE: "Adventure",
  ART: "Art & Culture",
  NIGHTLIFE: "Nightlife",
  SHOPPING: "Shopping",
  PHOTOGRAPHY: "Photography",
  NATURE: "Nature & Wildlife",
  CULTURE: "Cultural",
  OTHER: "Other",
};

const languageLabels: Record<string, string> = {
  en: "English",
  bn: "Bangla",
  ar: "Arabic",
  es: "Spanish",
  fr: "French",
  de: "German",
  hi: "Hindi",
  ur: "Urdu",
};

export default function ActiveFilters() {
  const searchParams = useSearchParams();

  const badges = [];

  // Category badges
  const categories = searchParams.getAll("category");
  categories.forEach((cat) => {
    badges.push({
      paramName: "category",
      value: cat,
      label: categoryLabels[cat] || cat,
    });
  });

  // Language badges
  const languages = searchParams.getAll("languages");
  languages.forEach((lang) => {
    badges.push({
      paramName: "languages",
      value: lang,
      label: languageLabels[lang] || lang,
    });
  });

  // City badge
  const city = searchParams.get("city");
  if (city) {
    badges.push({
      paramName: "city",
      value: city,
      label: `City: ${city}`,
    });
  }

  // Country badge
  const country = searchParams.get("country");
  if (country) {
    badges.push({
      paramName: "country",
      value: country,
      label: `Country: ${country}`,
    });
  }

  // Price range badge
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  if (minPrice || maxPrice) {
    badges.push({
      paramName: "minPrice",
      value: minPrice || "0",
      label: `Price: ৳${minPrice || 0} - ৳${maxPrice || "10000"}`,
    });
  }

  // Duration badge
  const duration = searchParams.get("duration");
  if (duration) {
    const hours = parseInt(duration) / 60;
    badges.push({
      paramName: "duration",
      value: duration,
      label: `Duration: ${hours}h`,
    });
  }

  if (badges.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Active Filters:</h3>
      <FilterBadges badges={badges} />
    </div>
  );
}
