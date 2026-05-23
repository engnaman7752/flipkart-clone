/**
 * Maps a promo config entry to a real product from the API catalog.
 */
export function resolvePromoProduct(products, promo) {
  if (!products?.length) return null;

  const { match = {}, categoryFilter, searchQuery } = promo;
  const { nameMatch, brand } = match;

  let found = null;

  if (nameMatch) {
    const term = nameMatch.toLowerCase();
    found = products.find((p) => p.name?.toLowerCase() === term) || 
            products.find((p) => p.name?.toLowerCase().includes(term));
  }

  if (!found && brand) {
    const brandLower = brand.toLowerCase();
    found = products.find(
      (p) =>
        p.brand?.toLowerCase() === brandLower &&
        (!categoryFilter || p.category === categoryFilter)
    );
  }

  if (!found && searchQuery) {
    const term = searchQuery.toLowerCase();
    found = products.find((p) => p.name?.toLowerCase() === term) ||
            products.find((p) => p.name?.toLowerCase().includes(term));
  }

  if (!found && categoryFilter) {
    found = products.find((p) => p.category === categoryFilter);
  }

  if (!found) {
    found = products[0];
  }

  if (!found) return null;

  const image = promo.image || (Array.isArray(found.images) ? found.images[0] : found.images);

  return {
    productId: found.id,
    image,
    name: found.name,
    price: found.price,
  };
}

export function enrichPromo(promo, products) {
  const resolved = resolvePromoProduct(products, promo);
  if (!resolved) return { ...promo, productId: null, image: null };

  return {
    ...promo,
    productId: resolved.productId,
    image: resolved.image,
    productName: resolved.name,
  };
}

export function enrichPromoList(promos, products) {
  return promos.map((p) => enrichPromo(p, products));
}
