export const metaFields = `
  is_drop_ship_from_web: metafield(namespace: "product", key: "is_drop_ship_from_web") {
    value
  }
  dropship_packaging_type: metafield(namespace: "product", key: "dropship_packaging_type") {
    value
  }
  is_ups_shippable: metafield(namespace: "product", key: "is_ups_shippable") {
    value
  }
  is_freeshipping: metafield(namespace: "product", key: "is_freeshipping") {
    value
  }
  category_id: metafield(namespace: "product", key: "category_id") {
    value
  }
  prop65_message: metafield(namespace: "product", key: "prop65_message") {
    value
  }
  giftbox_sku: metafield(namespace: "product", key: "giftbox_sku") {
    value
  }
  variant_backend_color: metafield(namespace: "product", key: "backend_color") {
    value
  }
  main_image: metafield(namespace: "product", key: "pdp_main_image") {
    value
  }
  hover_image: metafield(namespace: "product", key: "plp_hover_image") {
    value
  }
  availability_message: metafield(namespace: "product", key: "availability_message") {
    value
  }
  availability_message_override: metafield(namespace: "product", key: "availability_message_override") {
    value
  }
  special_order_override: metafield(namespace: "product", key: "special_order_override") {
    value
  }
  is_special_order: metafield(namespace: "product", key: "is_special_order") {
    value
  }
  is_in_stock: metafield(namespace: "product", key: "is_in_stock") {
    value
  }
  membership_price: metafield(namespace: "arhaus_membership", key: "membership_price") {
    value
  }
  storis_reference_id: metafield(namespace: "storis", key: "reference_id") {
    value
  }
  compare_at_price_change_date: metafield(namespace: "custom", key: "compare_at_price_change_date") {
    value
  }
  price_change_date: metafield(namespace: "custom", key: "price_change_date") {
    value
  }
  is_last_chance: metafield(namespace: "product", key: "is_last_chance") {
    value
  }
  gift_box_handle: metafield(namespace: "product", key: "gift_box_sku") {
    value
  }
  worryfree_plan: metafield(namespace: "product", key: "worryfree_plan") {
    value
  }
  worryfree_protection: metafield(namespace: "product", key: "worryfree_protection") {
    value
  }
  is_warranty_available: metafield(namespace: "product", key: "is_warranty_available") {
    value
  }
  vendor_id: metafield(namespace: "product", key: "vendor_id") {
    value
  }
  giftproduct_lineitem_id: metafield(namespace: "product", key: "giftproduct_lineitem_id") {
    value
  }
  variant_dimensions: metafield(namespace: "product", key: "dimensions_json") {
    value
  }
  dimension_details: metafield(namespace: "product", key: "dimension_details") {
    value
  }
  specification_details: metafield(namespace: "product", key: "specification_details") {
    value
  }
  shipping_and_return: metafield(namespace: "product", key: "shipping_and_return") {
    value
  }
  gallery_images: metafield(namespace: "product", key: "pdp_gallery_image") {
    value
  }
  gallery_image_alt_text: metafield(namespace: "product", key: "pdp_gallery_image_alt_text") {
    value
  }
  swatch_image: metafield(namespace: "product", key: "swatch_image") {
    value
  }
`

export const productMetaFields = `
  special_order_override: metafield(namespace: "product", key: "special_order_override") {
    value
  }
  is_special_order: metafield(namespace: "product", key: "is_special_order") {
    value
  }
`

export const variant = `
  quantityAvailable
  availableForSale
  quantityRule {
    maximum
    minimum
  }
  id
  sku
  title
  barcode
  price {
    amount
    currencyCode
  }
  compareAtPrice {
    amount
    currencyCode
  }
  selectedOptions {
    name
    value
  }
  image {
    altText
    url
    width
    height
  }
  product {
    ... on Product {
      title
      id
      handle
      options {
        id
        values
        name
      }
      tags
      ${productMetaFields}
    }
  }
  ${metaFields}
`

export const product = `
  title
  availableForSale
  productType
  descriptionHtml
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  handle
  compareAtPriceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  id
  tags
  options {
    id
    values
    name
  }
  featuredImage {
    altText
    url
    width
    height
  }
  images(first: 2) {
    edges {
      node {
        altText
        height
        width
        url
      }
    }
  }
  is_special_order: metafield(namespace: "product", key: "is_special_order") {
    value
  }
  swatch_images: metafield(namespace: "product", key: "swatch_images") {
    value
  }
  story_image: metafield(namespace: "product", key: "story_image") {
    value
  }
  reference_id: metafield(namespace: "storis", key: "reference_id") {
    value
  }
  story_copy: metafield(namespace: "product", key: "story") {
    value
  }
`
