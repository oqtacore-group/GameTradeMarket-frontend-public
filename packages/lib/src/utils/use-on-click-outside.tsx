import { useEffect } from 'react';

// Do something on click outside elements
export const useOnClickOutside = (ref: any, handler: any, extraRef?: any) => {
  useEffect(
    () => {
      const listener = (e: any) => {
        // Do nothing if clicking ref's elements or descendent elements
        if (extraRef && extraRef.current?.contains(e.target)) return;
        if (!ref.current || ref.current.contains(e.target)) return;
        handler(e);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },

    // Wrap handler in useCallback before passing it into this hook to avoid unneccessary rerenders
    [ref, handler, extraRef]
  );
};
