export type PageDensity = 'low' | 'medium' | 'high' | 'never';

export const PAGE_DENSITY_MAP: Record<string, PageDensity> = {
  '/': 'low',
  '/auth': 'low',
  '/classroom-resources': 'low',
  '/certificate': 'low',
  '/what-is-ai': 'medium',
  '/why-ai-matters': 'medium',
  '/prompt-engineering': 'medium',
  '/community': 'medium',
  '/learning-studio': 'high',
  '/ethics/environmental': 'high',
  '/ethics/social-implications': 'high',
  '/ethics/plagiarism': 'high',
  '/ethics/data-privacy': 'high',
};

// Interval ranges in milliseconds [min, max]
export const INTERVAL_RANGES: Record<Exclude<PageDensity, 'never'>, [number, number]> = {
  low: [12000, 25000],      // 12-25 seconds (frequent on homepage)
  medium: [45000, 90000],   // 45-90 seconds
  high: [180000, 300000],   // 3-5 minutes
};

export function getPageDensity(pathname: string): PageDensity {
  // Check for exact match first
  if (PAGE_DENSITY_MAP[pathname]) {
    return PAGE_DENSITY_MAP[pathname];
  }
  
  // Check for prefix matches (for nested routes)
  for (const [route, density] of Object.entries(PAGE_DENSITY_MAP)) {
    if (pathname.startsWith(route) && route !== '/') {
      return density;
    }
  }
  
  // Default to medium for unknown pages
  return 'medium';
}

export function getRandomInterval(density: Exclude<PageDensity, 'never'>): number {
  const [min, max] = INTERVAL_RANGES[density];
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
