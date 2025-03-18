import { FetcherWithComponents } from "@remix-run/react";
import { CartForm } from "@shopify/hydrogen";
import { Loader2, Ticket } from "lucide-react";
import { useRef, useState } from "react";
import { CartApiQueryFragment } from "storefrontapi.generated";


function CartDiscounts({
  discountCodes,
}: {
  discountCodes?: CartApiQueryFragment['discountCodes'];
}) {
  // const codes: string[] =
  //   discountCodes
  //     ?.filter((discount) => discount.applicable)
  //     ?.map(({ code }) => code) || [];

  // return (
  //   <div>
  //     {/* Have existing discount, display it with a remove option */}
  //     <dl hidden={!codes.length}>
  //       <div>
  //         <dt>Discount(s)</dt>
  //         <UpdateDiscountForm>
  //           <div className="cart-discount">
  //             <code>{codes?.join(', ')}</code>
  //             &nbsp;
  //             <button>Remove</button>
  //           </div>
  //         </UpdateDiscountForm>
  //       </div>
  //     </dl>

  //     {/* Show an input to apply a discount */}
  //     <UpdateDiscountForm discountCodes={codes}>
  //       <div>
  //         <input type="text" name="discountCode" placeholder="Discount code" />
  //         &nbsp;
  //         <button type="submit">Apply</button>
  //       </div>
  //     </UpdateDiscountForm>
  //   </div>
  // );

  const [showInput,setShowInput] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const codes: string[] =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({ code }) => code) || [];

  return (
    <div className="py-4 border-t border-gray-100">
      {/* Applied Discount */}
      {codes.length > 0 && (
        <div></div>
      )}

      {/* discount input */}
      {showInput ? (
        <UpdateDiscountForm discountCodes={codes}>
          {(fetcher) => {
            //handle state
            const isLoading = fetcher.state !== 'idle';
            return (
              <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  name="discountCode"
                  placeholder="Enter Promo Code"
                  className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-brand-navy font-source text-sm"
                />
                {isLoading && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <Loader2 className="w-4 h-4 animate-spin text-brand-gold" />
                  </div>
                )}

              </div>
              <div className="flex gap-2">
                <button
                type="submit"
                className={`px-4 py-2 bg-brand-navy text-white rounded text-sm font-source transition-colors duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-navy'}`}
                >
                  Apply
                </button>
                <button
                  type="button"
                  onClick={() => setShowInput(false)}
                  className="px-4 py-2 border border-gray-200 rounded text-sm font-source hover:bg-gray-50 transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
              </div>
            )         }}
         

            </UpdateDiscountForm>
      ):(
        <button
        onClick={() => setShowInput(true)}
        className="text-sm text-brand-gold hover:text-brand-gold font-source transition-colors inline-flex items-center gap-2"
        >
          <Ticket className="w-6 h-6" />
          Add Promo Code
        </button>
      )
           }

    </div>

  )
}



function UpdateDiscountForm({
  discountCodes,
  children,
}: {
  discountCodes?: string[];
  children: React.ReactNode | ((fetcher: FetcherWithComponents<any>) => React.ReactNode);
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

export default CartDiscounts;