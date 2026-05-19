import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { usePlatformSettings, useUpdateSettings } from "@/hooks/useAdminApi";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Settings, Save, Shield, Bot, Globe, Bell, Lock, Paintbrush } from "lucide-react";
import { toast } from "sonner";

const DEFAULT_SETTINGS: Record<string, any> = {
  site_name: "Threadit",
  site_description: "A community-driven platform for discussions",
  maintenance_mode: false,
  registration_enabled: true,
  email_verification_required: false,
  max_post_length: 40000,
  max_comment_length: 10000,
  max_communities_per_user: 10,
  posts_per_page: 20,
  ai_moderation_enabled: true,
  ai_auto_reject_threshold: 0.8,
  ai_flag_threshold: 0.4,
  spam_filter_enabled: true,
  profanity_filter_enabled: true,
  nsfw_filter_enabled: true,
  rate_limit_posts_per_hour: 10,
  rate_limit_comments_per_hour: 30,
  allow_image_uploads: true,
  max_upload_size_mb: 5,
  default_user_role: "user",
  require_post_approval: false,
  allow_anonymous_viewing: true,
};

export default function AdminSettings() {
  const { data: savedSettings, isLoading } = usePlatformSettings();
  const updateSettings = useUpdateSettings();

  const mergedSettings = { ...DEFAULT_SETTINGS, ...(savedSettings || {}) };
  const [settings, setSettings] = useState<Record<string, any>>(mergedSettings);
  const [dirty, setDirty] = useState(false);

  // Sync when data loads
  useState(() => {
    if (savedSettings) {
      setSettings({ ...DEFAULT_SETTINGS, ...savedSettings });
    }
  });

  const updateField = (key: string, value: any) => {
    setSettings(s => ({ ...s, [key]: value }));
    setDirty(true);
  };

  const handleSave = () => {
    updateSettings.mutate(settings, {
      onSuccess: () => { toast.success("Settings saved"); setDirty(false); },
      onError: (e) => toast.error(e.message),
    });
  };

  const Section = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-card-border rounded-xl p-5">
      <h2 className="font-semibold text-sm flex items-center gap-2 mb-4">
        <Icon className="w-4 h-4 text-primary" /> {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </motion.div>
  );

  const ToggleField = ({ label, description, settingKey }: { label: string; description: string; settingKey: string }) => (
    <div className="flex items-center justify-between">
      <div>
        <Label className="text-sm">{label}</Label>
        <p className="text-[11px] text-muted-foreground">{description}</p>
      </div>
      <Switch checked={settings[settingKey] ?? DEFAULT_SETTINGS[settingKey]}
        onCheckedChange={v => updateField(settingKey, v)} />
    </div>
  );

  const NumberField = ({ label, description, settingKey, min, max }: { label: string; description: string; settingKey: string; min?: number; max?: number }) => (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1">
        <Label className="text-sm">{label}</Label>
        <p className="text-[11px] text-muted-foreground">{description}</p>
      </div>
      <Input type="number" className="w-24 h-8 text-xs" min={min} max={max}
        value={settings[settingKey] ?? DEFAULT_SETTINGS[settingKey]}
        onChange={e => updateField(settingKey, parseInt(e.target.value) || 0)} />
    </div>
  );

  const TextField = ({ label, description, settingKey }: { label: string; description: string; settingKey: string }) => (
    <div>
      <Label className="text-sm">{label}</Label>
      <p className="text-[11px] text-muted-foreground mb-1.5">{description}</p>
      <Input className="h-8 text-xs"
        value={settings[settingKey] ?? DEFAULT_SETTINGS[settingKey]}
        onChange={e => updateField(settingKey, e.target.value)} />
    </div>
  );

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-48 rounded-xl" />)}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" /> Platform Settings
            </h1>
            <p className="text-xs text-muted-foreground mt-1">Configure platform behavior and policies</p>
          </div>
          <Button onClick={handleSave} disabled={!dirty || updateSettings.isPending}
            className="gap-1.5">
            <Save className="w-3.5 h-3.5" />
            {updateSettings.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <Section title="General" icon={Globe}>
          <TextField label="Site Name" description="The name displayed across the platform" settingKey="site_name" />
          <TextField label="Site Description" description="Brief description for SEO and meta tags" settingKey="site_description" />
          <ToggleField label="Maintenance Mode" description="Put the platform in maintenance mode" settingKey="maintenance_mode" />
        </Section>

        <Section title="Authentication & Users" icon={Shield}>
          <ToggleField label="Registration Enabled" description="Allow new user registrations" settingKey="registration_enabled" />
          <ToggleField label="Email Verification" description="Require email verification for new accounts" settingKey="email_verification_required" />
          <ToggleField label="Anonymous Viewing" description="Allow non-logged-in users to browse content" settingKey="allow_anonymous_viewing" />
          <NumberField label="Max Communities per User" description="Limit communities a user can create" settingKey="max_communities_per_user" min={1} max={100} />
        </Section>

        <Section title="Content" icon={Paintbrush}>
          <NumberField label="Max Post Length" description="Maximum characters per post" settingKey="max_post_length" min={100} max={100000} />
          <NumberField label="Max Comment Length" description="Maximum characters per comment" settingKey="max_comment_length" min={100} max={50000} />
          <NumberField label="Posts per Page" description="Default pagination size" settingKey="posts_per_page" min={5} max={100} />
          <ToggleField label="Require Post Approval" description="Require admin approval for new posts" settingKey="require_post_approval" />
          <ToggleField label="Allow Image Uploads" description="Enable image uploads for posts" settingKey="allow_image_uploads" />
          <NumberField label="Max Upload Size (MB)" description="Maximum file upload size" settingKey="max_upload_size_mb" min={1} max={50} />
        </Section>

        <Section title="AI Moderation" icon={Bot}>
          <ToggleField label="AI Moderation" description="Enable automatic content moderation" settingKey="ai_moderation_enabled" />
          <ToggleField label="Spam Filter" description="Auto-detect spam content" settingKey="spam_filter_enabled" />
          <ToggleField label="Profanity Filter" description="Auto-detect profane language" settingKey="profanity_filter_enabled" />
          <ToggleField label="NSFW Filter" description="Auto-detect NSFW content" settingKey="nsfw_filter_enabled" />
          <NumberField label="Auto-Reject Threshold (%)" description="Score above which content is auto-rejected (0-100)" settingKey="ai_auto_reject_threshold" min={0} max={100} />
          <NumberField label="Flag Threshold (%)" description="Score above which content is flagged for review (0-100)" settingKey="ai_flag_threshold" min={0} max={100} />
        </Section>

        <Section title="Rate Limiting" icon={Lock}>
          <NumberField label="Posts per Hour" description="Max posts a user can create per hour" settingKey="rate_limit_posts_per_hour" min={1} max={100} />
          <NumberField label="Comments per Hour" description="Max comments a user can create per hour" settingKey="rate_limit_comments_per_hour" min={1} max={200} />
        </Section>
      </div>
    </AdminLayout>
  );
}
