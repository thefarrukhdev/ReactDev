export function getNavbarClasses(isScrolled: boolean) {
  return `
    fixed top-0 left-1/2 transform -translate-x-1/2 z-50
    rounded-full
    transition-[max-width,border-radius,opacity] duration-700 ease-in-out
    ${isScrolled
      ? "max-w-full sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] rounded-3xl opacity-95"
      : "w-full opacity-100"}
  `.replace(/\s+/g, " ").trim();
}





export function getGlassStyles(isScrolled: boolean) {
  return `
    backdrop-blur-2xl bg-gradient-to-r from-white/10 via-white/5 to-white/10
    border border-white/20 shadow-2xl shadow-black/10
    before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br 
    before:from-white/20 before:via-transparent before:to-purple-500/10 
    before:opacity-50 before:pointer-events-none
    after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-tl
    after:from-blue-500/5 after:via-transparent after:to-white/5
    after:pointer-events-none
    ${isScrolled ? "before:opacity-70 after:opacity-60" : "before:opacity-40 after:opacity-30"}
  `.replace(/\s+/g, " ").trim();
}
