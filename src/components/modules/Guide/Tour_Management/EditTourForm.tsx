"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateTour } from "@/services/tour/updateTour";
import { TourCategory, ITour } from "@/types/tour.interface";
import TourImageUploader from "./TourImageUploader";
import {
  MapPin,
  Tag,
  CheckCircle,
  FileText,
  ImageIcon,
  List,
  X,
} from "lucide-react";

const categories = [
  { value: TourCategory.FOOD, label: "Food & Culinary", icon: "🍔" },
  { value: TourCategory.HISTORY, label: "History & Heritage", icon: "🏛️" },
  { value: TourCategory.ADVENTURE, label: "Adventure", icon: "⛰️" },
  { value: TourCategory.ART, label: "Art & Culture", icon: "🎨" },
  { value: TourCategory.NIGHTLIFE, label: "Nightlife", icon: "🌃" },
  { value: TourCategory.SHOPPING, label: "Shopping", icon: "🛍️" },
  { value: TourCategory.PHOTOGRAPHY, label: "Photography", icon: "📷" },
  { value: TourCategory.NATURE, label: "Nature & Wildlife", icon: "🌿" },
  { value: TourCategory.CULTURE, label: "Cultural", icon: "🎭" },
  { value: TourCategory.OTHER, label: "Other", icon: "⭐" },
];

const popularLanguages = [
  "English",
  "Bangla",
  "Hindi",
  "Arabic",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Japanese",
  "Korean",
];

interface EditTourFormProps {
  tour: ITour;
}

export default function EditTourForm({ tour }: EditTourFormProps) {
  const [state, formAction, isPending] = useActionState(
    updateTour.bind(null, tour._id),
    null
  );
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(
    tour.mediaUrls || []
  );

  // Form field states
  const [title, setTitle] = useState(tour.title);
  const [description, setDescription] = useState(tour.description);
  const [itinerary, setItinerary] = useState(tour.itinerary || "");
  const [city, setCity] = useState(tour.city);
  const [country, setCountry] = useState(tour.country);
  const [meetingPoint, setMeetingPoint] = useState(tour.meetingPoint);
  const [category, setCategory] = useState<string>(tour.category);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    tour.languages || []
  );
  const [includedItems, setIncludedItems] = useState<string[]>(
    tour.includedItems || []
  );
  const [excludedItems, setExcludedItems] = useState<string[]>(
    tour.excludedItems || []
  );
  const [newIncludedItem, setNewIncludedItem] = useState("");
  const [newExcludedItem, setNewExcludedItem] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
      console.log(state);
    }
    if (state?.success) {
      toast.success("Tour updated successfully!");
      router.push("/guide/dashboard/my-tours");
    }
  }, [state, router]);

  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((l) => l !== language)
        : [...prev, language]
    );
  };

  const addIncludedItem = () => {
    if (newIncludedItem.trim()) {
      setIncludedItems([...includedItems, newIncludedItem.trim()]);
      setNewIncludedItem("");
    }
  };

  const removeIncludedItem = (index: number) => {
    setIncludedItems(includedItems.filter((_, i) => i !== index));
  };

  const addExcludedItem = () => {
    if (newExcludedItem.trim()) {
      setExcludedItems([...excludedItems, newExcludedItem.trim()]);
      setNewExcludedItem("");
    }
  };

  const removeExcludedItem = (index: number) => {
    setExcludedItems(excludedItems.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (formData: FormData) => {
    // Add new images to formData
    images.forEach((image) => {
      formData.append("images", image);
    });

    // Add existing images to formData
    existingImages.forEach((url) => {
      formData.append("existingImages", url);
    });

    // Add data object to formData
    const data = {
      title,
      description,
      itinerary,
      city,
      country,
      meetingPoint,
      category,
      languages: selectedLanguages,
      includedItems: includedItems.length > 0 ? includedItems : undefined,
      excludedItems: excludedItems.length > 0 ? excludedItems : undefined,
    };

    formData.append("data", JSON.stringify(data));

    await formAction(formData);
  };

  const totalImages = existingImages.length + images.length;

  return (
    <form action={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="bg-white rounded-lg border p-6 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-gray-900">
            Basic Information
          </h3>
        </div>

        <Field>
          <FieldLabel htmlFor="title">
            Tour Title <span className="text-red-500">*</span>
          </FieldLabel>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="e.g., Authentic Dhaka Food Tour"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <InputFieldError field="title" state={state} />
        </Field>

        <Field>
          <FieldLabel htmlFor="description">
            Description <span className="text-red-500">*</span>
          </FieldLabel>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe what makes your tour special, what travelers will experience, and what they'll learn..."
            className="min-h-32 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <InputFieldError field="description" state={state} />
        </Field>

        <Field>
          <FieldLabel htmlFor="itinerary">Itinerary (Optional)</FieldLabel>
          <Textarea
            id="itinerary"
            name="itinerary"
            placeholder="Describe the tour schedule and activities..."
            className="min-h-24 resize-none"
            value={itinerary}
            onChange={(e) => setItinerary(e.target.value)}
          />
          <InputFieldError field="itinerary" state={state} />
        </Field>
      </div>

      {/* Location Information */}
      <div className="bg-white rounded-lg border p-6 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-gray-900">Location</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field>
            <FieldLabel htmlFor="city">
              City <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              id="city"
              name="city"
              type="text"
              placeholder="e.g., Dhaka"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <InputFieldError field="city" state={state} />
          </Field>

          <Field>
            <FieldLabel htmlFor="country">
              Country <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              id="country"
              name="country"
              type="text"
              placeholder="e.g., Bangladesh"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <InputFieldError field="country" state={state} />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="meetingPoint">
            Meeting Point <span className="text-red-500">*</span>
          </FieldLabel>
          <Input
            id="meetingPoint"
            name="meetingPoint"
            type="text"
            placeholder="e.g., Central Shaheed Minar"
            value={meetingPoint}
            onChange={(e) => setMeetingPoint(e.target.value)}
          />
          <InputFieldError field="meetingPoint" state={state} />
        </Field>
      </div>

      {/* Category & Languages */}
      <div className="bg-white rounded-lg border p-6 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b">
          <Tag className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-gray-900">
            Category & Languages
          </h3>
        </div>

        <Field>
          <FieldLabel htmlFor="category">
            Category <span className="text-red-500">*</span>
          </FieldLabel>
          <Select name="category" value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  <span className="flex items-center gap-2">
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <InputFieldError field="category" state={state} />
        </Field>

        <Field>
          <FieldLabel>
            Languages Offered <span className="text-red-500">*</span>
          </FieldLabel>
          <div className="space-y-3">
            {/* Selected Languages Display */}
            {selectedLanguages.length > 0 && (
              <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-md border">
                {selectedLanguages.map((language) => (
                  <span
                    key={language}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-white rounded-full text-sm"
                  >
                    {language}
                    <button
                      type="button"
                      onClick={() => handleLanguageToggle(language)}
                      className="hover:bg-primary/80 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Language Selection Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {popularLanguages.map((language) => (
                <button
                  key={language}
                  type="button"
                  onClick={() => handleLanguageToggle(language)}
                  disabled={selectedLanguages.includes(language)}
                  className={`px-4 py-2 rounded-md border transition-colors ${
                    selectedLanguages.includes(language)
                      ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                      : "bg-white text-gray-700 border-gray-300 hover:border-primary hover:bg-primary/5"
                  }`}
                >
                  {language}
                </button>
              ))}
            </div>
          </div>
          <InputFieldError field="languages" state={state} />
          <p className="text-xs text-gray-500 mt-1">
            Select at least one language you can offer the tour in
          </p>
        </Field>
      </div>

      {/* Included/Excluded Items */}
      <div className="bg-white rounded-lg border p-6 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b">
          <List className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-gray-900">
            What's Included/Excluded
          </h3>
        </div>

        <Field>
          <FieldLabel>Included Items (Optional)</FieldLabel>
          <div className="flex gap-2">
            <Input
              type="text"
              value={newIncludedItem}
              onChange={(e) => setNewIncludedItem(e.target.value)}
              placeholder="e.g., Transportation, Meals"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addIncludedItem();
                }
              }}
            />
            <Button type="button" onClick={addIncludedItem} variant="outline">
              Add
            </Button>
          </div>
          {includedItems.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {includedItems.map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeIncludedItem(index)}
                    className="hover:text-green-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </Field>

        <Field>
          <FieldLabel>Excluded Items (Optional)</FieldLabel>
          <div className="flex gap-2">
            <Input
              type="text"
              value={newExcludedItem}
              onChange={(e) => setNewExcludedItem(e.target.value)}
              placeholder="e.g., Personal expenses, Tips"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addExcludedItem();
                }
              }}
            />
            <Button type="button" onClick={addExcludedItem} variant="outline">
              Add
            </Button>
          </div>
          {excludedItems.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {excludedItems.map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeExcludedItem(index)}
                    className="hover:text-red-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </Field>
      </div>

      {/* Tour Images */}
      <div className="bg-white rounded-lg border p-6 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b">
          <ImageIcon className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-gray-900">Tour Images</h3>
        </div>

        {/* Existing Images */}
        {existingImages.length > 0 && (
          <div>
            <FieldLabel>Current Images</FieldLabel>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
              {existingImages.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Tour image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  {index === 0 && (
                    <span className="absolute bottom-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                      Cover
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <Field>
          <FieldLabel>
            {existingImages.length > 0 ? "Add More Images" : "Upload Images"}{" "}
            <span className="text-red-500">*</span>
          </FieldLabel>
          <TourImageUploader
            maxFiles={10 - existingImages.length}
            maxSizeMB={5}
            onFilesChange={setImages}
          />
          <InputFieldError field="images" state={state} />
          <p className="text-xs text-gray-500 mt-1">
            Total images: {totalImages}/10. First image will be the cover photo.
          </p>
        </Field>
      </div>

      {/* Submit Buttons */}
      <div className="flex items-center justify-between gap-4 pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isPending}
          className="w-full md:w-auto"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending || totalImages === 0}
          className="w-full md:flex-1 h-12 text-base font-semibold"
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Updating Tour...
            </span>
          ) : (
            <>
              <CheckCircle className="h-5 w-5 mr-2" />
              Update Tour
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
