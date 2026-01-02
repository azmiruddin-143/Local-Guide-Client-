"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search } from "lucide-react";

interface SEOSettingsProps {
  data: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
  };
  onUpdate: (data: any) => void;
}

export function SEOSettings({ data, onUpdate }: SEOSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          <CardTitle>SEO Settings</CardTitle>
        </div>
        <CardDescription>
          Configure meta tags for search engine optimization
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="meta-title">Meta Title</Label>
          <Input
            id="meta-title"
            value={data.metaTitle}
            onChange={(e) => onUpdate({ metaTitle: e.target.value })}
            maxLength={60}
          />
          <p className="text-xs text-muted-foreground">
            {data.metaTitle.length}/60 characters (recommended)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="meta-description">Meta Description</Label>
          <Textarea
            id="meta-description"
            value={data.metaDescription}
            onChange={(e) => onUpdate({ metaDescription: e.target.value })}
            rows={3}
            maxLength={160}
          />
          <p className="text-xs text-muted-foreground">
            {data.metaDescription.length}/160 characters (recommended)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="meta-keywords">Meta Keywords</Label>
          <Input
            id="meta-keywords"
            value={data.metaKeywords}
            onChange={(e) => onUpdate({ metaKeywords: e.target.value })}
            placeholder="keyword1, keyword2, keyword3"
          />
          <p className="text-xs text-muted-foreground">
            Comma-separated keywords for SEO
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
