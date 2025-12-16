import { useLocation } from 'react-router-dom';
import { useEasterEgg } from '@/contexts/EasterEggContext';
import { getPageDensity, PageDensity } from '@/lib/fishConfig';

export function useFishVisibility(): { density: PageDensity; isEnabled: boolean } {
  const location = useLocation();
  const { isCourseActive } = useEasterEgg();
  
  const density = getPageDensity(location.pathname);
  
  // Disable fish during active micro-courses or on 'never' density pages
  const isEnabled = !isCourseActive && density !== 'never';
  
  return { density, isEnabled };
}
