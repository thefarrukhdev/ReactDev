import { useState, useCallback } from "react";

interface UseCopyToClipboardReturn {
  copied: boolean;
  copyToClipboard: (text: string) => Promise<void>;
  error: Error | null;
}

/**
 * Custom hook for copying text to clipboard
 * 
 * @param timeout - Time in ms before resetting copied state (default: 2500)
 * @returns Object with copied state, copy function, and error
 * 
 * @example
 * const { copied, copyToClipboard } = useCopyToClipboard();
 * 
 * <button onClick={() => copyToClipboard("Hello World")}>
 *   {copied ? "Copied!" : "Copy"}
 * </button>
 */
export function useCopyToClipboard(
  timeout: number = 2500
): UseCopyToClipboardReturn {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const copyToClipboard = useCallback(
    async (text: string) => {
      if (!navigator?.clipboard) {
        const err = new Error("Clipboard not supported");
        setError(err);
        console.warn(err.message);
        return;
      }

      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setError(null);

        setTimeout(() => {
          setCopied(false);
        }, timeout);
      } catch (err) {
        const error = err as Error;
        setError(error);
        console.error("Failed to copy text:", error);
      }
    },
    [timeout]
  );

  return { copied, copyToClipboard, error };
}
