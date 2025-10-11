import { toast } from "sonner";

interface ShareOptions {
  title: string;
  text: string;
  url: string;
}

export const useShare = () => {
  const shareContent = async ({ title, text, url }: ShareOptions) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  return { shareContent };
};
