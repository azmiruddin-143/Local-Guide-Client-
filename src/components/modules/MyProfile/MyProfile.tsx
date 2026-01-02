"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { getInitials } from "@/lib/formatters";
import { updateMyProfile } from "@/services/auth/auth.service";
import { UserInfo } from "@/types/user.interface";
import { 
  Camera, 
  Loader2, 
  Save, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  Shield, 
  Award, 
  DollarSign,
  Heart,
  Star,
  Calendar,
  CheckCircle,
  XCircle
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface MyProfileProps {
  userInfo: UserInfo;
}

const MyProfile = ({ userInfo }: MyProfileProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [Imagefile, setImagefile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [languages, setLanguages] = useState<string[]>(userInfo.languages || []);
  const [expertise, setExpertise] = useState<string[]>(userInfo.expertise || []);
  const [travelPreferences, setTravelPreferences] = useState<string[]>(
    userInfo.travelPreferences || []
  );

  const profilePhoto = userInfo.avatarUrl;
  const profileData = userInfo;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("File selected:", file.name, file.size, file.type);
      // Set the file immediately
      setImagefile(file);
      
      // Read for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);

    // Ensure arrays are properly formatted
    formData.set("languages", JSON.stringify(languages));
    formData.set("expertise", JSON.stringify(expertise));
    formData.set("travelPreferences", JSON.stringify(travelPreferences));

    // Add the image file if it exists
    if (Imagefile && Imagefile.size > 0) {
      formData.set("file", Imagefile);
    }

   
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: [File] ${value.name} (${value.size} bytes) ${value.type}`);
      } else {
        console.log(`${key}:`, value);
      }
    }
  
    startTransition(async () => {
      const result = await updateMyProfile(formData);

      if (result.success) {
        setSuccess(result.message);
        setPreviewImage(null);
        setImagefile(null);
        toast.success(success || "Profile Updated Successfully!")
        router.refresh();
      } else {
        toast.success(error)
        setError(result.message || "Failed to update profile");
      }
    });
  };

  const addLanguage = (lang: string) => {
    if (lang && !languages.includes(lang)) {
      setLanguages([...languages, lang]);
    }
  };

  const removeLanguage = (lang: string) => {
    setLanguages(languages.filter((l) => l !== lang));
  };

  const addExpertise = (exp: string) => {
    if (exp && !expertise.includes(exp)) {
      setExpertise([...expertise, exp]);
    }
  };

  const removeExpertise = (exp: string) => {
    setExpertise(expertise.filter((e) => e !== exp));
  };

  const addTravelPreference = (pref: string) => {
    if (pref && !travelPreferences.includes(pref)) {
      setTravelPreferences([...travelPreferences, pref]);
    }
  };

  const removeTravelPreference = (pref: string) => {
    setTravelPreferences(travelPreferences.filter((p) => p !== pref));
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header with Role-Specific Design */}
      <div className="relative overflow-hidden rounded-lg bg-linear-to-br from-primary/10 via-primary/5 to-background border p-6">
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">My Profile</h1>
              <p className="text-muted-foreground mt-1">
                {userInfo.role === "GUIDE" && "Manage your guide profile and tour offerings"}
                {userInfo.role === "TOURIST" && "Manage your travel profile and preferences"}
                {userInfo.role === "ADMIN" && "Manage your admin profile and settings"}
              </p>
            </div>
            <Badge 
              variant={userInfo.isVerified ? "default" : "secondary"}
              className="gap-1"
            >
              {userInfo.isVerified ? (
                <>
                  <CheckCircle className="h-3 w-3" />
                  Verified
                </>
              ) : (
                <>
                  <XCircle className="h-3 w-3" />
                  Not Verified
                </>
              )}
            </Badge>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Picture Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Picture</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <div className="relative group">
                  <Avatar className="h-32 w-32 border-4 border-primary/20">
                    {previewImage || profilePhoto ? (
                      <AvatarImage
                        src={previewImage || (profilePhoto as string)}
                        alt={userInfo.name}
                      />
                    ) : (
                      <AvatarFallback className="text-3xl bg-linear-to-br from-primary to-primary/60 text-primary-foreground">
                        {getInitials(userInfo.name)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <label
                    htmlFor="file"
                    className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2.5 cursor-pointer hover:bg-primary/90 transition-all shadow-lg group-hover:scale-110"
                  >
                    <Camera className="h-4 w-4" />
                    <Input
                      type="file"
                      id="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                      disabled={isPending}
                    />
                  </label>
                </div>

                <div className="text-center w-full">
                  <p className="font-semibold text-xl">{userInfo.name}</p>
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
                    <Mail className="h-3 w-3" />
                    <p>{userInfo.email}</p>
                  </div>
                  <Badge className="mt-2 capitalize">
                    {userInfo.role.toLowerCase()}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats Card - Role Specific */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Member Since</span>
                  </div>
                  <span className="text-sm font-medium">
                    {new Date(userInfo.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Status</span>
                  </div>
                  <Badge variant={userInfo.isActive === "ACTIVE" ? "default" : "destructive"}>
                    {userInfo.isActive}
                  </Badge>
                </div>

                {userInfo.role === "GUIDE" && userInfo.dailyRate && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      <span>Daily Rate</span>
                    </div>
                    <span className="text-sm font-medium">${userInfo.dailyRate}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      defaultValue={profileData?.name || userInfo.name}
                      required
                      disabled={isPending}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userInfo.email}
                      disabled
                      className="bg-muted"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      defaultValue={profileData?.phoneNumber || ""}
                      placeholder="+1 (234) 567-890"
                      disabled={isPending}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      defaultValue={profileData?.location || ""}
                      placeholder="City, Country"
                      disabled={isPending}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    defaultValue={profileData?.bio || ""}
                    placeholder={
                      userInfo.role === "GUIDE"
                        ? "Tell travelers about yourself and your guiding experience..."
                        : "Tell us about yourself and your travel interests..."
                    }
                    rows={4}
                    disabled={isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="languages">Languages</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {languages.map((lang) => (
                      <Badge key={lang} variant="secondary" className="gap-1">
                        <Globe className="h-3 w-3" />
                        {lang}
                        <button
                          type="button"
                          onClick={() => removeLanguage(lang)}
                          className="ml-1 hover:text-destructive"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      id="languages"
                      placeholder="Add a language (e.g., English, Spanish)"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addLanguage(e.currentTarget.value);
                          e.currentTarget.value = "";
                        }
                      }}
                      disabled={isPending}
                    />
                    <input
                      type="hidden"
                      name="languages"
                      value={JSON.stringify(languages)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Press Enter to add a language
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Guide-Specific Fields */}
            {userInfo.role === "GUIDE" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Guide Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
              
                  <div className="space-y-2">
                    <Label htmlFor="expertise">Areas of Expertise</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {expertise.map((exp) => (
                        <Badge key={exp} variant="secondary" className="gap-1">
                          <Star className="h-3 w-3" />
                          {exp}
                          <button
                            type="button"
                            onClick={() => removeExpertise(exp)}
                            className="ml-1 hover:text-destructive"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        id="expertise"
                        placeholder="Add expertise (e.g., History, Food, Adventure)"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addExpertise(e.currentTarget.value);
                            e.currentTarget.value = "";
                          }
                        }}
                        disabled={isPending}
                      />
                      <input
                        type="hidden"
                        name="expertise"
                        value={JSON.stringify(expertise)}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Press Enter to add an expertise area
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tourist-Specific Fields */}
            {userInfo.role === "TOURIST" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    Travel Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="travelPreferences">Interests</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {travelPreferences.map((pref) => (
                        <Badge key={pref} variant="secondary" className="gap-1">
                          <Heart className="h-3 w-3" />
                          {pref}
                          <button
                            type="button"
                            onClick={() => removeTravelPreference(pref)}
                            className="ml-1 hover:text-destructive"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        id="travelPreferences"
                        placeholder="Add interest (e.g., Culture, Food, Photography)"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTravelPreference(e.currentTarget.value);
                            e.currentTarget.value = "";
                          }
                        }}
                        disabled={isPending}
                      />
                      <input
                        type="hidden"
                        name="travelPreferences"
                        value={JSON.stringify(travelPreferences)}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Press Enter to add a travel interest
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Admin-Specific Fields */}
            {userInfo.role === "ADMIN" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Admin Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-900">Administrator Access</h4>
                        <p className="text-sm text-blue-800 mt-1">
                          You have full administrative privileges to manage users, tours, bookings, and platform settings.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Save Button */}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending} className="min-w-[140px]">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
