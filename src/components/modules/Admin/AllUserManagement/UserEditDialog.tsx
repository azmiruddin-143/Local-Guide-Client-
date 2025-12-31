"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IUser, ERole, IsActive } from "@/types/user.interface";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { updateUser } from "@/services/admin/userManagement";
import { toast } from "sonner";

interface UserEditDialogProps {
  open: boolean;
  onClose: () => void;
  user: IUser | null;
  onSuccess: () => void;
}

const UserEditDialog = ({ open, onClose, user, onSuccess }: UserEditDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<IUser>>({
    name: "",
    phoneNumber: "",
    location: "",
    bio: "",
    role: ERole.TOURIST,
    isActive: IsActive.ACTIVE,
  });

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phoneNumber: user.phoneNumber || "",
        location: user.location || "",
        bio: user.bio || "",
        role: user.role || ERole.TOURIST,
        isActive: user.isActive || IsActive.ACTIVE,
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?._id) return;

    setIsLoading(true);
    const result = await updateUser(user._id.toString(), formData);
    setIsLoading(false);

    if (result.success) {
      toast.success(result.message || "User updated successfully");
      onSuccess();
      onClose();
    } else {
      toast.error(result.message || "Failed to update user");
    }
  };

  const handleChange = (field: keyof IUser, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  console.log(user);
  

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              defaultValue={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>

          {/* Email (Read-only) */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={user.email}
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
          </div>

          {/* Phone Number */}
          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              value={formData.phoneNumber || ""}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
            />
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location || ""}
              onChange={(e) => handleChange("location", e.target.value)}
            />
          </div>

          {/* Bio */}
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio || ""}
              onChange={(e) => handleChange("bio", e.target.value)}
              rows={3}
            />
          </div>

          {/* Role */}
          <div>
            <Label htmlFor="role">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value) => handleChange("role", value as ERole)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ERole.ADMIN}>Admin</SelectItem>
                <SelectItem value={ERole.GUIDE}>Guide</SelectItem>
                <SelectItem value={ERole.TOURIST}>Tourist</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Status */}
          <div>
            <Label htmlFor="isActive">Account Status</Label>
            <Select
              value={formData.isActive}
              onValueChange={(value) => handleChange("isActive", value as IsActive)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={IsActive.ACTIVE}>Active</SelectItem>
                <SelectItem value={IsActive.INACTIVE}>Inactive</SelectItem>
                <SelectItem value={IsActive.BLOCKED}>Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserEditDialog;