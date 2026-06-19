/**
 * Background component placeholder.
 * 
 * LightRays WebGL component was removed as it's not currently in use.
 * Re-implement when needed — requires `ogl` package.
 */

export default function Background({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-full h-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 ${className}`.trim()}
      aria-hidden="true"
    />
  );
}
