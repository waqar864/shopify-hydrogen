import type { CartApiQueryFragment } from 'storefrontapi.generated';
import type { CartLayout } from '~/components/cart/CartMain';
import { CartForm, Money, type OptimisticCart } from '@shopify/hydrogen';
import { useRef } from 'react';
import { FetcherWithComponents } from '@remix-run/react';
import { CreditCard, Gift } from 'lucide-react';
import CartDiscounts from './CartDiscounts';

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
        <CartDiscounts />
      {/* gift cards */}

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




function CartGiftCard({
  giftCardCodes,
}: {
  giftCardCodes: CartApiQueryFragment['appliedGiftCards'] | undefined;
}) {
  const appliedGiftCardCodes = useRef<string[]>([]);
  const giftCardCodeInput = useRef<HTMLInputElement>(null);
  const codes: string[] =
    giftCardCodes?.map(({ lastCharacters }) => `***${lastCharacters}`) || [];

  function saveAppliedCode(code: string) {
    const formattedCode = code.replace(/\s/g, ''); // Remove spaces
    if (!appliedGiftCardCodes.current.includes(formattedCode)) {
      appliedGiftCardCodes.current.push(formattedCode);
    }
    giftCardCodeInput.current!.value = '';
  }

  function removeAppliedCode() {
    appliedGiftCardCodes.current = [];
  }

  return (
    <div>
      {/* Have existing gift card applied, display it with a remove option */}
      <dl hidden={!codes.length}>
        <div>
          <dt>Applied Gift Card(s)</dt>
          <UpdateGiftCardForm>
            <div className="cart-discount">
              <code>{codes?.join(', ')}</code>
              &nbsp;
              <button onSubmit={() => removeAppliedCode}>Remove</button>
            </div>
          </UpdateGiftCardForm>
        </div>
      </dl>

      {/* Show an input to apply a discount */}
      <UpdateGiftCardForm
        giftCardCodes={appliedGiftCardCodes.current}
        saveAppliedCode={saveAppliedCode}
      >
        <div>
          <input
            type="text"
            name="giftCardCode"
            placeholder="Gift card code"
            ref={giftCardCodeInput}
          />
          &nbsp;
          <button type="submit">Apply</button>
        </div>
      </UpdateGiftCardForm>
    </div>
  );
}

function UpdateGiftCardForm({
  giftCardCodes,
  saveAppliedCode,
  children,
}: {
  giftCardCodes?: string[];
  saveAppliedCode?: (code: string) => void;
  removeAppliedCode?: () => void;
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesUpdate}
      inputs={{
        giftCardCodes: giftCardCodes || [],
      }}
    >
      {(fetcher: FetcherWithComponents<any>) => {
        const code = fetcher.formData?.get('giftCardCode');
        if (code && saveAppliedCode) {
          saveAppliedCode(code as string);
        }
        return children;
      }}
    </CartForm>
  );
}
