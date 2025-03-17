import { X } from 'lucide-react';
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type AsideType = 'search' | 'cart' | 'mobile' | 'closed';
type AsideContextValue = {
  type: AsideType;
  open: (mode: AsideType) => void;
  close: () => void;
};

/**
 * A side bar component with Overlay
 * @example
 * ```jsx
 * <Aside type="search" heading="SEARCH">
 *  <input type="search" />
 *  ...
 * </Aside>
 * ```
 */
export function Aside({
  children,
  heading,
  type,
}: {
  children?: React.ReactNode;
  type: AsideType;
  heading: React.ReactNode;
}) {
  // 
  const {type: activeType, close } = useAside();
  const expanded = type === activeType;

  useEffect(() => {
    if(!expanded){
      return;
    }
    const scrollY = window.scrollY;

    const originalStyles = {
      overflow: document.body.style.overflow,
      height: document.body.style.height,
      position: document.body.style.position,
      width: document.body.style.width,
      top: document.body.style.top,
    };

    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollY}px`;

    return () => {
      document.body.style.overflow = originalStyles.overflow;
      document.body.style.height = originalStyles.height;
      document.body.style.position = originalStyles.position;
      document.body.style.width = originalStyles.width;
      document.body.style.top = originalStyles.top;
      window.scrollTo(0, scrollY);
    }
  }, [expanded]);
  useEffect(() => {
    if(!expanded) return;
    const handleEscape = (e: KeyboardEvent) => {
      if(e.key === 'Escape'){
        close();
    }
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    }
  }
  },[expanded,close]);

  return(
    <div
    aria-modal
    className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${expanded ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
    role="dialog"
    >
      {/* overlay */}
      <button 
  className='absolute inset-0 bg-black/50'
  onClick={close}
/>
      {/* aside panel */}
      <aside
        className={`absolute top-0 right-0 h-[100dvh] w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${expanded ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* header */}
          <header className='flex items-center justify-between px-6 py-4 border-b border-gray-100'>
            <h3 className='font-playfair text-xl text-brand-navy'>
              {heading}
            </h3>
            <button onClick={close} className='p-2 -mr-2 text-gray-400 hover:text-gray-500 transition-colors duration-300'>
              <X className='w-6 h-6' />
            </button>

          </header>
        {/* content */}
        <main className='flex-1 over overflow-y-auto'>
          {children}
        </main>
        

      </aside>
      
      </div>
    
  )

}

const AsideContext = createContext<AsideContextValue | null>(null);

Aside.Provider = function AsideProvider({children}: {children: ReactNode}) {
  const [type, setType] = useState<AsideType>('closed');

  return (
    <AsideContext.Provider
      value={{
        type,
        open: setType,
        close: () => setType('closed'),
      }}
    >
      {children}
    </AsideContext.Provider>
  );
};

export function useAside() {
  const aside = useContext(AsideContext);
  if (!aside) {
    throw new Error('useAside must be used within an AsideProvider');
  }
  return aside;
}
