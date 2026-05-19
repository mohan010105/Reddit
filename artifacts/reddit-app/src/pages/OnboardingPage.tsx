import { OnboardingWizard } from "@/components/OnboardingWizard";
import { useLocation } from "wouter";

export default function OnboardingPage() {
  const [, setLocation] = useLocation();

  const handleComplete = (interests: string[]) => {
    console.log("Onboarding complete with interests:", interests);
    // In production, we would save these interests to the user profile
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center">
      <OnboardingWizard onComplete={handleComplete} />
    </div>
  );
}
