import type { CartApiQueryFragment } from 'storefrontapi.generated';
import type { CartLayout } from '~/components/cart/CartMain';
import { CartForm, Money, type OptimisticCart } from '@shopify/hydrogen';
import { useRef } from 'react';
import { FetcherWithComponents } from '@remix-run/react';
import { CreditCard, Gift } from 'lucide-react';
import CartDiscounts from './CartDiscounts';
import CartGiftCards from './CartGiftCards';

type CartSummaryProps = {
  cart: OptimisticCart<CartApiQueryFragment | null>;
  layout: CartLayout;
};

export function CartSummary({ cart, layout }: CartSummaryProps) {
  // const className =
  //   layout === 'page' ? 'cart-summary-page' : 'cart-summary-aside';

  return (
    // <div aria-labelledby="cart-summary" className={className}>
    //   <h4>Totals</h4>
    //   <dl className="cart-subtotal">
    //     <dt>Subtotal</dt>
    //     <dd>
    //       {cart.cost?.subtotalAmount?.amount ? (
    //         <Money data={cart.cost?.subtotalAmount} />
    //       ) : (
    //         '-'
    //       )}
    //     </dd>
    //   </dl>
    //   <CartDiscounts discountCodes={cart.discountCodes} />
    //   <CartGiftCard giftCardCodes={cart.appliedGiftCards} />
    //   <CartCheckoutActions checkoutUrl={cart.checkoutUrl} />
    // </div>
    
    // subtotal
    <div className='bg-white px-6 py-8'>
      {/* subtotal */}
      <div className='flex items-center justify-between mb-4'>
        <span className='font-source text-gray-600'>Subtotal</span>
        <span className='font-source font-medium'>
          {cart.cost?.subtotalAmount?.amount ? (
            <Money data={cart.cost?.subtotalAmount} />
          ) : (
            '-'
          )}
        </span>
        
      </div>
      {/* discounts */}
        <CartDiscounts discountCodes={cart.discountCodes} />
      {/* gift cards */}
          <CartGiftCards giftCardCodes={cart.appliedGiftCards} />
      {/* checkout button */}

      {/* extra information */}
      <div className='mt-8 space-y-4'>
        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <Gift className='w-4 h-4' />
          <span>Complimentary gift wrapping available</span>
        </div>

        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <CreditCard className='w-4 h-4' />
          <span>Secured checkout powered by shopify</span>
        </div>
      </div>
    </div>
  );
}
function CartCheckoutActions({ checkoutUrl }: { checkoutUrl?: string }) {
  if (!checkoutUrl) return null;

  return (
    <div>
      <a href={checkoutUrl} target="_self">
        <p>Continue to Checkout &rarr;</p>
      </a>
      <br />
    </div>
  );
}





