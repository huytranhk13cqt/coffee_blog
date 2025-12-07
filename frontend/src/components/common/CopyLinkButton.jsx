import { useState } from "react";
import { Link2, Check } from "lucide-react";

function CopyLinkButton({ url }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // Copy URL vào clipboard
      await navigator.clipboard.writeText(url || window.location.href);
      setCopied(true);

      // Reset sau 2 giây
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="copy-link-button"
      title={copied ? "Copied!" : "Copy link"}
    >
      {copied ? (
        <>
          <Check size={16} />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Link2 size={16} />
          <span>Copy Link</span>
        </>
      )}
    </button>
  );
}

export default CopyLinkButton;
