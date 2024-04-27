import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when pathname changes
  }, [pathname]);

  return null; // This component doesn't render anything, it just handles scrolling
};

export default ScrollToTop;
