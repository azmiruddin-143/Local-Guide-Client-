"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Share2, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

interface SocialLinksSettingsProps {
  data: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    youtube: string;
  };
  onUpdate: (data: any) => void;
}

export function SocialLinksSettings({
  data,
  onUpdate,
}: SocialLinksSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Share2 className="h-5 w-5 text-primary" />
          <CardTitle>Social Media Links</CardTitle>
        </div>
        <CardDescription>
          Configure social media profile links for the platform
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="facebook" className="flex items-center gap-2">
              <Facebook className="h-4 w-4" />
              Facebook
            </Label>
            <Input
              id="facebook"
              type="url"
              value={data.facebook}
              onChange={(e) => onUpdate({ facebook: e.target.value })}
              placeholder="https://facebook.com/yourpage"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="twitter" className="flex items-center gap-2">
              <Twitter className="h-4 w-4" />
              Twitter
            </Label>
            <Input
              id="twitter"
              type="url"
              value={data.twitter}
              onChange={(e) => onUpdate({ twitter: e.target.value })}
              placeholder="https://twitter.com/yourhandle"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagram" className="flex items-center gap-2">
              <Instagram className="h-4 w-4" />
              Instagram
            </Label>
            <Input
              id="instagram"
              type="url"
              value={data.instagram}
              onChange={(e) => onUpdate({ instagram: e.target.value })}
              placeholder="https://instagram.com/yourprofile"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin" className="flex items-center gap-2">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Label>
            <Input
              id="linkedin"
              type="url"
              value={data.linkedin}
              onChange={(e) => onUpdate({ linkedin: e.target.value })}
              placeholder="https://linkedin.com/company/yourcompany"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="youtube" className="flex items-center gap-2">
              <Youtube className="h-4 w-4" />
              YouTube
            </Label>
            <Input
              id="youtube"
              type="url"
              value={data.youtube}
              onChange={(e) => onUpdate({ youtube: e.target.value })}
              placeholder="https://youtube.com/@yourchannel"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
