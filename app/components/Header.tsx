import {Suspense, useEffect, useState} from 'react';
import {Await, NavLink, useAsyncValue} from '@remix-run/react';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import { Menu, Search, ShoppingBag, User } from 'lucide-react';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const {shop, menu} = header;
  const [isScrolled,setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const {type: asideType} = useAside();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--announcment-height', isScrolled ? '0px' : '40px');
    root.style.setProperty('--header-height', isScrolled ? '64px' : '80px');
    const handleScroll = () => {
      if(asideType !== 'closed') return;
      const currentScrollY = window.scrollY;
      setIsScrollingUp(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);

      setIsScrolled(currentScrollY > 50);
    }
    window.addEventListener('scroll', handleScroll,{ passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  },[lastScrollY,isScrolled,asideType])
  return (
    // <header className="header">
    //   <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
    //     <strong>CADANCE</strong>
    //   </NavLink>
    //   <HeaderMenu
    //     menu={menu}
    //     viewport="desktop"
    //     primaryDomainUrl={header.shop.primaryDomain.url}
    //     publicStoreDomain={publicStoreDomain}
    //   />
    //   <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
    // </header>

    <div className={`fixed w-full z-40 transition-transform duration-500 ease-in-out
      ${!isScrollingUp && isScrolled && asideType === 'closed' ? '-translate-y-full' : 'translate-y-0'}`
    }>
      {/* Announcment bar  */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out bg-brand-navy text-white ${isScrolled ? 'max-h-0' : 'max-h-12'}`}>
        <div className='container mx-auto text-center py-2.5 px-4'>
          <p className='font-source text-[13px] leading-tight sm:text-sm font-light tracnking-wider'>Complimentary Shipping on orders above 5000</p>
        </div>
      </div>


      {/* main header  */}
      <header
      className={`transition-all duration-500 ease-in-out border-b ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm border-transparent' : 'bg-white border-gray-100'}`}
      >
        <div className='container mx-auto'>
          {/* Mobile Logo */}
          <div className={`hidden max-[550px]:block text-center border-b border-gray-100 transition-all duration-300 ease-in-out ${isScrolled ? 'py-4' : 'py-2'}`}>
            <NavLink prefetch="intent" to="/" className='font-playfair text-2xl tracking-normal inline-block'>
              <h1 className='font-medium my-0'>CADENCE</h1>
            </NavLink>
          </div>
          {/* header content */}
          <div className={`flex items-center justify-between px-4 sm:px-6 transition-all duration-300 ease-in-out ${ isScrolled ? 'py-3 sm:py-4' : 'py-4 sm:py-6'}`}>
            {/* mobile menu toggle */}
            <div className='lg:hidden'>
              <HeaderMenuMobileToggle />
            </div>
            {/* Logo (above 550px) */}
            <NavLink
              prefetch='intent'
              to="/"
              className={`font-playfair tracking-wider text-center max-[550px]:hidden absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:text-left transition-all duration-300 ease-in-out ${isScrolled ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-[28px]'}`}>
                <h1 className='font-medium'>CADENCE</h1>
              </NavLink>

              {/* Desktop Navigation */}

              <div className='hidden lg:block flex-1-px-12'>
                <HeaderMenu
                  menu={menu}
                  viewport="desktop"
                  primaryDomainUrl={header.shop.primaryDomain.url}
                  publicStoreDomain={publicStoreDomain}
                  />

              </div>
              {/* CTAS */}
              <div className='flex items-center'>
                <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
              </div>
          </div>
        </div>

      </header>
    </div>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  const className = `header-menu-${viewport}`;
  const {close} = useAside();

  const baseClassName = "transition-all duration-200 hover:text-brand-gold font-source relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-brand-gold after:transition-all after:duration-300 hover:after:w-full ";
  const desktopClassName = "flex items-center justify-center space-x-12 text-sm uppercase tracking-wider";
  const mobileClassName = "flex flex-col px-6";

 

  return (
    // <nav className={className} role="navigation">
    //   {viewport === 'mobile' && (
    //     <NavLink
    //       end
    //       onClick={close}
    //       prefetch="intent"
    //       style={activeLinkStyle}
    //       to="/"
    //     >
    //       Home
    //     </NavLink>
    //   )}
    //   {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
    //     if (!item.url) return null;

    //     // if the url is internal, we strip the domain
    //     const url =
    //       item.url.includes('myshopify.com') ||
    //       item.url.includes(publicStoreDomain) ||
    //       item.url.includes(primaryDomainUrl)
    //         ? new URL(item.url).pathname
    //         : item.url;
    //     return (
    //       <NavLink
    //         className="header-menu-item"
    //         end
    //         key={item.id}
    //         onClick={close}
    //         prefetch="intent"
    //         style={activeLinkStyle}
    //         to={url}
    //       >
    //         {item.title}
    //       </NavLink>
    //     );
    //   })}
    // </nav>
    <nav
      className={viewport === 'desktop' ? desktopClassName : mobileClassName}
      role="navigation"
    >
      {viewport === 'mobile' && (
        <>
        {/* mobile navigation links */}
        <div className='space-y-6 py-4'>
          {menu?.items.map((item) => {
            if(!item.url) return null;
            const url = item.url.includes('myshopify.com') || item.url.includes(publicStoreDomain) ||
            item.url.includes(primaryDomainUrl) ? new URL(item.url).pathname : item.url;
            return (
              <NavLink className={({isActive}) => `${baseClassName} text-lg py-2 block ${isActive ? 'text-brand-gold' : 'text-brand-navy'}`}
               end
               key={item.id}
               onClick={close}
               prefetch='intent'
               to={url}
               >
                {item.title}
              </NavLink>
            )
          })}
        </div>

        {/* mobile footer links */}
        <div className='mt-auto border-t border-gray-100 py-6'>
          <div className='space-y-4'>
            <NavLink
              to="/account"
              className='flex items-center space-x-2 text-brand-navy hover:text-brand-gold'
            >
              <User className='h-5 w-5' />
              <span className='font-source text-base'>Account</span>
             
          </NavLink>
          <button
            onClick={() => {
              close();
            }}
            className='flex items-center space-x-2 text-brand-navy hover:text-brand-gold w-full text-left'
          >
               <Search className='h-5 w-5' />
          <span className='font-source text-base'>Search</span>
          </button>
          </div>
        </div>
        </>
      )}
      {viewport === 'desktop' && (
        //desktop menu
        menu?.items.map((item) => {
          if (!item.url) return null;
          const url = item.url.includes('myshopify.com') || item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl) ? new URL(item.url).pathname : item.url;
          return (
            <NavLink className={({isActive}) => `${baseClassName} ${isActive ? 'text-brand-gold' : 'text-brand-navy'}`}
             end
             key={item.id}
             onClick={close}
             prefetch='intent'
             to={url}
             >
              {item.title}
            </NavLink>
          )
        })
      )}

    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    // <nav className="header-ctas" role="navigation">
    //   <HeaderMenuMobileToggle />
    //   <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
    //     <Suspense fallback="Sign in">
    //       <Await resolve={isLoggedIn} errorElement="Sign in">
    //         {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Sign in')}
    //       </Await>
    //     </Suspense>
    //   </NavLink>
    //   <SearchToggle />
    //   <CartToggle cart={cart} />
    // </nav>
    <nav className='flex items-center space-x-2 sm:space-x-3 lg:space-x-8' role='navigation'>
      <SearchToggle />
      <NavLink
        prefetch='intent'
        to='/account'
        className='hover:text-brand-gold transition-all duration-200 p-2 relative after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1px] after:bg-brand-gold after:transition-all after:duration-300 hover:after:w-full'
      >
        <span className='sr-only'>Account</span>
        <User className='w-6 h-6' />
      </NavLink>
        <CartToggle cart={cart} />
      
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="p-2 -ml-2 hover:text-brand-gold transition-colors duration-200"
      onClick={() => open('mobile')}
    >
      <Menu className="w-6 h-6" />
    </button>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button className="p-2 hover:text-brand-gold transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1px] after:bg-brand-gold after:transition-all after:duration-300 hover:after:w-full"
      onClick={() => open('search')}>
      <Search className='w-6 h-6' />
    </button>
  );
}

function CartBadge({count}: {count: number | null}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    // <a
    //   href="/cart"
    //   onClick={(e) => {
    //     e.preventDefault();
    //     open('cart');
    //     publish('cart_viewed', {
    //       cart,
    //       prevCart,
    //       shop,
    //       url: window.location.href || '',
    //     } as CartViewPayload);
    //   }}
    // >
    //   Cart {count === null ? <span>&nbsp;</span> : count}
    // </a>
    <button className='relative p-2 hover:text-brand-gold transition-colors duration-200 after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1px] after:bg-brand-gold after:transition-all after:duration-300 hover:after:w-full'
    onClick={()=>{
      open('cart');
      publish('cart_viewed', {
        cart,
        prevCart,
        shop,
        url: window.location.href || '',
      })
    }}
    >
      <ShoppingBag className='w-6 h-6' />
      {count !== null && count > 0 && (
        <span className='absolute top-1 right-1 bg-brand-gold text-white text-[10px] font-medium w-4 h-4 flex items-center justify-center'>
          {count > 9 ? '9+' : count}
        </span>
      ) }
    </button>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

// const FALLBACK_HEADER_MENU = {
//   id: 'gid://shopify/Menu/199655587896',
//   items: [
//     {
//       id: 'gid://shopify/MenuItem/461609500728',
//       resourceId: null,
//       tags: [],
//       title: 'Collections',
//       type: 'HTTP',
//       url: '/collections',
//       items: [],
//     },
//     {
//       id: 'gid://shopify/MenuItem/461609533496',
//       resourceId: null,
//       tags: [],
//       title: 'Blog',
//       type: 'HTTP',
//       url: '/blogs/journal',
//       items: [],
//     },
//     {
//       id: 'gid://shopify/MenuItem/461609566264',
//       resourceId: null,
//       tags: [],
//       title: 'Policies',
//       type: 'HTTP',
//       url: '/policies',
//       items: [],
//     },
//     {
//       id: 'gid://shopify/MenuItem/461609599032',
//       resourceId: 'gid://shopify/Page/92591030328',
//       tags: [],
//       title: 'About',
//       type: 'PAGE',
//       url: '/pages/about',
//       items: [],
//     },
//   ],
// };

// function activeLinkStyle({
//   isActive,
//   isPending,
// }: {
//   isActive: boolean;
//   isPending: boolean;
// }) {
//   return {
//     fontWeight: isActive ? 'bold' : undefined,
//     color: isPending ? 'grey' : 'black',
//   };
// }
