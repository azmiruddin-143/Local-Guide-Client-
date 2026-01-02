"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { IUser } from "@/types/user.interface";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, XCircle, Mail, Phone, MapPin, Calendar, Languages, Briefcase, Heart } from "lucide-react";
import { format } from "date-fns";

interface UserViewDetailDialogProps {
  open: boolean;
  onClose: () => void;
  user: IUser | null;
}

const UserViewDetailDialog = ({ open, onClose, user }: UserViewDetailDialogProps) => {
  if (!user) return null;

  const roleColors: Record<string, string> = {
    ADMIN: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    GUIDE: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    TOURIST: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Section */}
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatarUrl || ""} alt={user.name} />
              <AvatarFallback className="text-2xl">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-semibold">{user.name}</h3>
                {user.isVerified ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
              </div>
              <Badge className={roleColors[user.role] || ""}>
                {user.role}
              </Badge>
            </div>
          </div>

          {/* Bio */}
          {user.bio && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Bio</h4>
              <p className="text-sm">{user.bio}</p>
            </div>
          )}

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm">{user.email}</p>
              </div>
            </div>

            {user.phoneNumber && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm">{user.phoneNumber}</p>
                </div>
              </div>
            )}

            {user.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm">{user.location}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Joined</p>
                <p className="text-sm">
                  {format(new Date(user.createdAt), "MMM dd, yyyy")}
                </p>
              </div>
            </div>
          </div>

          {/* Languages */}
          {user.languages && user.languages.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Languages className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-sm font-medium">Languages</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {user.languages.map((lang, index) => (
                  <Badge key={index} variant="outline">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Expertise (for Guides) */}
          {user.expertise && user.expertise.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-sm font-medium">Expertise</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {user.expertise.map((exp, index) => (
                  <Badge key={index} variant="secondary">
                    {exp}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Travel Preferences (for Tourists) */}
          {user.travelPreferences && user.travelPreferences.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-sm font-medium">Travel Preferences</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {user.travelPreferences.map((pref, index) => (
                  <Badge key={index} variant="secondary">
                    {pref}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Status Information */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-xs text-muted-foreground">Verification Status</p>
              <p className="text-sm font-medium">
                {user.isVerified ? (
                  <span className="text-green-600">Verified</span>
                ) : (
                  <span className="text-red-600">Not Verified</span>
                )}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Account Status</p>
              <p className="text-sm font-medium">
                {user.isDeleted ? (
                  <span className="text-red-600">Deleted</span>
                ) : (
                  <span className="text-green-600">Active</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserViewDetailDialog;
