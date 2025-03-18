import {Suspense} from 'react';
import {Await, Form, NavLink} from '@remix-run/react';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';
import { Facebook, Instagram, Mail, MapIcon, Phone, Twitter } from 'lucide-react';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="bg-brand-navy text-white">
            {/* {footer?.menu && header.shop.primaryDomain?.url && (
              <FooterMenu
                menu={footer.menu}
                primaryDomainUrl={header.shop.primaryDomain.url}
                publicStoreDomain={publicStoreDomain}
              />
            )} */}
            {/* newsletter signup  */}
              <div className='border-b border-white/10'>
              <div className='container mx-auto px-4 py-12'>
                <div className='max-w-xl mx-auto text-center'>
                  <h2 className='font-playfair text-2xl mb-4'>
                    join the artisan circle
                  </h2>
                  <p className='font-source text-sm text-gray-300 mb-6'>subscribe to receive exclusive offers</p>
                 <Form className='flex gap-4'>
                  <input type="text" placeholder='your email address' className='flex-1 px-4 py-3 bg-white/10 border-white/20 rounded-md text-white placeholder:text-gray-400 font-source focus:outline-none' />
                  <button
                  type='submit'
                  className='px-6 bg-brand-gold hover:bg-brand-gold/80 text-white py-3 rounded-md font-source text-sm'
                  >
                    Subscribe
                  </button>
                 </Form>
                </div>
              </div>

              </div>
            {/* main footer content */}
            <div className='container mx-auto px-4 py-12'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
                {/* brand col */}
                <div className='space-y-6'>
                  <h3 className='font-playfair text-2xl'>CADENCE</h3>
                  <p className='font-source text-sm text-gray-300 leading-relaxed'>artisinal footwear for the modren sophisticate. crafted with precision, design for destinction</p>
                  <div className='flex space-x-4'>
                    <a href="#" className='text-white/80 hover:text-brand-gold transition-colors duration-300'>
                     <Instagram className='w-5 h-5' />
                    </a>
                    <a href="#" className='text-white/80 hover:text-brand-gold transition-colors duration-300'>
                     <Facebook className='w-5 h-5' />
                    </a>
                    <a href="#" className='text-white/80 hover:text-brand-gold transition-colors duration-300'>
                     <Twitter className='w-5 h-5' />
                    </a>
                  </div>
                </div>
                {/* content col */}
                <div className='space-y-6'>
                  <h4 className='font-playfair text-lg'>Contact</h4>
                  <ul className='space-y-4 font-source text-sm text-gray-400'>
                    <li className='flex items-start space-x-3'>
                      <MapIcon className='w-5 h-5 text-brand-gold flex-shrink-0' />
                      <span>123 Main Street,<br /> New York, NY 10001</span>
                    </li>
                    <li className='flex items-start space-x-3'>
                      <Phone className='w-5 h-5 text-brand-gold flex-shrink-0' />
                      <span>123 Main Street,<br /> +9230365645</span>
                    </li>
                    <li className='flex items-start space-x-3'>
                      <Mail className='w-5 h-5 text-brand-gold flex-shrink-0' />
                      <span>123 Main Street,<br /> test@gmail.com</span>
                    </li>
                  </ul>
                </div>
                {/* quick links */}
                <div className='space-y-6'>
                  <h4 className='font-playfair text-lg'>Quick links</h4>
                  <ul className='space-y-3 font-source text-sm'>
                    <li>
                      <NavLink
                      to='/collections/all'
                      className='text-gray-300 hover:text-brand-gold transition-colors duration-300'
                      >
                        Products
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                      to='/collections/all'
                      className='text-gray-300 hover:text-brand-gold transition-colors duration-300'
                      >
                        Products
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                      to='/collections/all'
                      className='text-gray-300 hover:text-brand-gold transition-colors duration-300'
                      >
                        Products
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                      to='/collections/all'
                      className='text-gray-300 hover:text-brand-gold transition-colors duration-300'
                      >
                        Products
                      </NavLink>
                    </li>
                  </ul>
                </div>
                {/* policies col */}
                <div className='space-y-6'>
                <h4 className='font-playfair text-lg'>Policies</h4>
                <FooterMenu menu={footer?.menu} primaryDomainUrl={header.shop.primaryDomain.url} publicStoreDomain={publicStoreDomain} />
                </div>
              </div>

            </div>

            {/* copyright */}
            <div className='border-t border-white/10'>
            <div className='container mx-auto px-4 py-6'>
              <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
                <p className='font-source text-sm text-gray-400'>
                  &copy; {new Date().getFullYear()} The Artisan Circle
                </p>
                <p className='font-source text-sm text-gray-400'>
                  Crafted with passion in newyork
                </p>
              </div>
            </div>
            </div>
          </footer>
        )}
      </Await>
    </Suspense>
  );
}

function FooterMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  menu: FooterQuery['menu'];
  primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
  publicStoreDomain: string;
}) {
  // return (
  //   <nav className="footer-menu" role="navigation">
  //     {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
  //       if (!item.url) return null;
  //       // if the url is internal, we strip the domain
  //       const url =
  //         item.url.includes('myshopify.com') ||
  //         item.url.includes(publicStoreDomain) ||
  //         item.url.includes(primaryDomainUrl)
  //           ? new URL(item.url).pathname
  //           : item.url;
  //       const isExternal = !url.startsWith('/');
  //       return isExternal ? (
  //         <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
  //           {item.title}
  //         </a>
  //       ) : (
  //         <NavLink
  //           end
  //           key={item.id}
  //           prefetch="intent"
  //           style={activeLinkStyle}
  //           to={url}
  //         >
  //           {item.title}
  //         </NavLink>
  //       );
  //     })}
  //   </nav>
  // );

  return (
    <nav className='space-y-3 font-source text-sm' role='navigation'>
      {
        menu?.items.map((item) => {
          if (!item.url) return null;
          const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
            return (
              <NavLink
              className={({isActive}) => `block text-gray-300 hover:text-brand-gold transition-colors duration-300 ${isActive ? 'text-brand-gold' : ''}`}
              end
             key={item.id}
             
             prefetch='intent'
             to={url}
              >
                {item.title}
              </NavLink>
            )
        })
      }
    </nav>
  )
}

// const FALLBACK_FOOTER_MENU = {
//   id: 'gid://shopify/Menu/199655620664',
//   items: [
//     {
//       id: 'gid://shopify/MenuItem/461633060920',
//       resourceId: 'gid://shopify/ShopPolicy/23358046264',
//       tags: [],
//       title: 'Privacy Policy',
//       type: 'SHOP_POLICY',
//       url: '/policies/privacy-policy',
//       items: [],
//     },
//     {
//       id: 'gid://shopify/MenuItem/461633093688',
//       resourceId: 'gid://shopify/ShopPolicy/23358013496',
//       tags: [],
//       title: 'Refund Policy',
//       type: 'SHOP_POLICY',
//       url: '/policies/refund-policy',
//       items: [],
//     },
//     {
//       id: 'gid://shopify/MenuItem/461633126456',
//       resourceId: 'gid://shopify/ShopPolicy/23358111800',
//       tags: [],
//       title: 'Shipping Policy',
//       type: 'SHOP_POLICY',
//       url: '/policies/shipping-policy',
//       items: [],
//     },
//     {
//       id: 'gid://shopify/MenuItem/461633159224',
//       resourceId: 'gid://shopify/ShopPolicy/23358079032',
//       tags: [],
//       title: 'Terms of Service',
//       type: 'SHOP_POLICY',
//       url: '/policies/terms-of-service',
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
//     color: isPending ? 'grey' : 'white',
//   };
// }
