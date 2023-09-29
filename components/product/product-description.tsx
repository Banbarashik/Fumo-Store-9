import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product, ProductVariant } from 'lib/shopify/types';
import { VariantSelector } from './variant-selector';
import { VariantSelectorWithPseudoOptions } from './variant-selector-pseudo-options';

export function ProductDescription({
  product,
  selectedVariant
}: {
  product: Product;
  selectedVariant?: ProductVariant;
}) {
  const hasPseudoOptions = product.tags.includes('pseudo_options');

  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price
            amount={
              selectedVariant ? selectedVariant.price.amount : product.variants[0]!.price.amount
            }
            currencyCode={
              selectedVariant
                ? selectedVariant.price.currencyCode
                : product.variants[0]!.price.currencyCode
            }
          />
        </div>
      </div>
      {!hasPseudoOptions ? (
        <VariantSelector options={product.options} variants={product.variants} />
      ) : (
        <VariantSelectorWithPseudoOptions option={product.options[0]} variants={product.variants} />
      )}

      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null}

      <AddToCart variants={product.variants} availableForSale={product.availableForSale} />
    </>
  );
}
