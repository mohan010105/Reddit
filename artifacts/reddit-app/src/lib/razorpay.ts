import { toast } from "sonner";

/**
 * Dynamically loads the Razorpay checkout script and verifies its presence.
 * Shows a toast message if script loading fails.
 */
export const loadRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      if ((window as any).Razorpay) {
        resolve(true);
      } else {
        toast.error("Unable to load payment service");
        resolve(false);
      }
    };
    script.onerror = () => {
      toast.error("Unable to load payment service");
      resolve(false);
    };
    document.body.appendChild(script);
  });
};
