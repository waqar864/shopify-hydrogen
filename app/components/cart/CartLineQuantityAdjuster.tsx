import { OptimisticCartLine } from "@shopify/hydrogen";
import { CartApiQueryFragment } from "storefrontapi.generated";
import CartLineUpdateButton from "./CartLineUpdateButton";
import CartLineRemoveButton from "./CartLineRemoveButton";
import { Minus, Plus } from "lucide-react";

type CartLine = OptimisticCartLine<CartApiQueryFragment>;

type CartLineQuantityAdjusterProps = {
    line: CartLine;
}

const CartLineQuantityAdjuster = ({ line }: CartLineQuantityAdjusterProps) => {
    
    if(!line || typeof line?.quantity === 'undefined') return null;
    const { id: lineId, quantity, isOptimistic } = line;
    const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
    const nextQuantity = Number(Math.round(quantity + 1));

    return (
        <div className="flex items-center gap-2">
            <CartLineUpdateButton lines={[{id:lineId, quantity: prevQuantity}]}>
                <button
                    disabled={quantity <= 1}
                    className={`w-8 h-8 flex items-center justify-center rounded border transition-colors ${quantity <= 1 ? 'border-gray-200 text-gray-300' : 'border-gray-200 hover:border-gray-400 text-gray-500'}`}
                >
                    <Minus className="w-4 h-4" />
                </button>
            </CartLineUpdateButton>
            <span className="font-source w-8 text-center">{quantity}</span>

            <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
            <button
                    
                    className={`w-8 h-8 flex items-center justify-center rounded border transition-colors `}
                >
                    <Plus className="w-4 h-4" />
                </button>
            </CartLineUpdateButton>
            <CartLineRemoveButton lineIds={[lineId]}
            disabled={isOptimistic === true}
            >

            </CartLineRemoveButton>
        </div>
    );
}

export default CartLineQuantityAdjuster
// function CartLineQuantity({ line }: { line: CartLine }) {
//   if (!line || typeof line?.quantity === 'undefined') return null;
//   const { id: lineId, quantity, isOptimistic } = line;
//   const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
//   const nextQuantity = Number((quantity + 1).toFixed(0));

//   return (
//     <div className="cart-line-quantity">
//       <small>Quantity: {quantity} &nbsp;&nbsp;</small>
//       <CartLineUpdateButton lines={[{ id: lineId, quantity: prevQuantity }]}>
//         <button
//           aria-label="Decrease quantity"
//           disabled={quantity <= 1 || !!isOptimistic}
//           name="decrease-quantity"
//           value={prevQuantity}
//         >
//           <span>&#8722; </span>
//         </button>
//       </CartLineUpdateButton>
//       &nbsp;
//       <CartLineUpdateButton lines={[{ id: lineId, quantity: nextQuantity }]}>
//         <button
//           aria-label="Increase quantity"
//           name="increase-quantity"
//           value={nextQuantity}
//           disabled={!!isOptimistic}
//         >
//           <span>&#43;</span>
//         </button>
//       </CartLineUpdateButton>
//       &nbsp;
//       <CartLineRemoveButton lineIds={[lineId]} disabled={!!isOptimistic} />
//     </div>
//   );
// }