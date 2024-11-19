export const getPathnameSegment = (pathname: string | null) => {
  if (!pathname || pathname === "/" || /^\/[a-z]{2}$/.test(pathname)) {
    return "home";
  }
  const segment = pathname.replace(/^\/[a-z]{2}(\/|$)/, "").replace(/^\//, "");
  return segment || "home";
};
