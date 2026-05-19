import { toast } from "sonner";

/**
 * Dynamically loads the Razorpay checkout script.
 * Verifies window.Razorpay exists and handles potential loading failures.
 */
export const loadRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // If Razorpay is already loaded globally, return success
    if ((window as any).Razorpay) {
      console.log("[loadRazorpay] Razorpay script is already present in window.");
      resolve(true);
      return;
    }

    console.log("[loadRazorpay] Dynamically inserting Razorpay script tag...");
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    
    script.onload = () => {
      if ((window as any).Razorpay) {
        console.log("[loadRazorpay] Razorpay script loaded successfully.");
        resolve(true);
      } else {
        console.error("[loadRazorpay] Script loaded but window.Razorpay is missing.");
        toast.error("Unable to load payment service");
        resolve(false);
      }
    };

    script.onerror = () => {
      console.error("[loadRazorpay] Network error occurred while loading Razorpay checkout.js.");
      toast.error("Unable to load payment service");
      resolve(false);
    };

    document.body.appendChild(script);
  });
};
