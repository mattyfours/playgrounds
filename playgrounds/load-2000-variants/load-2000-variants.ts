import { after } from 'node:test'

fetch('https://arhausllc-dev.myshopify.com/api/2022-10/graphql.json', {
  headers: {
    accept: '*/*',
    'accept-language': 'en-US,en;q=0.9,es;q=0.8',
    'content-type': 'application/json',
    priority: 'u=1, i',
    'sec-ch-ua':
      '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'x-shopify-storefront-access-token': '96525a30bdc5c14f9df60c1381640ede'
  },
  referrer:
    'https://arhausllc-dev.myshopify.com/products/c?variant=45672608202930&pb=0',
  body: '{"query":"query {\\n  product(id: \\"gid://shopify/Product/8547215343794\\") {\\n    id\\n    variants(first: 250, after: \\"eyJsYXN0X2lkIjo0NTY3MjYyNDU1NDE2MiwibGFzdF92YWx1ZSI6NTAwLCJvZmZzZXQiOjQ5OX0=\\") {\\n      edges {\\n        node {\\n          \\nquantityAvailable\\navailableForSale\\nquantityRule {\\n  maximum\\n  minimum\\n}\\nid\\nsku\\ntitle\\nbarcode\\nprice {\\n  amount\\n  currencyCode\\n}\\ncompareAtPrice {\\n  amount\\n  currencyCode\\n}\\nselectedOptions {\\n  name\\n  value\\n}\\nimage {\\n  altText\\n  url\\n  width\\n  height\\n}\\nproduct {\\n  ... on Product {\\n    title\\n    id\\n    handle\\n    options {\\n      id\\n      values\\n      name\\n    }\\n    tags\\n    \\nspecial_order_override: metafield(namespace: \\"product\\", key: \\"special_order_override\\") {\\n  value\\n}\\nis_special_order: metafield(namespace: \\"product\\", key: \\"is_special_order\\") {\\n  value\\n}\\n\\n  }\\n}\\n\\nis_drop_ship_from_web: metafield(namespace: \\"product\\", key: \\"is_drop_ship_from_web\\") {\\n  value\\n}\\ndropship_packaging_type: metafield(namespace: \\"product\\", key: \\"dropship_packaging_type\\") {\\n  value\\n}\\nis_ups_shippable: metafield(namespace: \\"product\\", key: \\"is_ups_shippable\\") {\\n  value\\n}\\nis_freeshipping: metafield(namespace: \\"product\\", key: \\"is_freeshipping\\") {\\n  value\\n}\\ncategory_id: metafield(namespace: \\"product\\", key: \\"category_id\\") {\\n  value\\n}\\nprop65_message: metafield(namespace: \\"product\\", key: \\"prop65_message\\") {\\n  value\\n}\\ngiftbox_sku: metafield(namespace: \\"product\\", key: \\"giftbox_sku\\") {\\n  value\\n}\\nvariant_backend_color: metafield(namespace: \\"product\\", key: \\"backend_color\\") {\\n  value\\n}\\nmain_image: metafield(namespace: \\"product\\", key: \\"pdp_main_image\\") {\\n  value\\n}\\nhover_image: metafield(namespace: \\"product\\", key: \\"plp_hover_image\\") {\\n  value\\n}\\navailability_message: metafield(namespace: \\"product\\", key: \\"availability_message\\") {\\n  value\\n}\\navailability_message_override: metafield(namespace: \\"product\\", key: \\"availability_message_override\\") {\\n  value\\n}\\nspecial_order_override: metafield(namespace: \\"product\\", key: \\"special_order_override\\") {\\n  value\\n}\\nis_special_order: metafield(namespace: \\"product\\", key: \\"is_special_order\\") {\\n  value\\n}\\nis_in_stock: metafield(namespace: \\"product\\", key: \\"is_in_stock\\") {\\n  value\\n}\\nmembership_price: metafield(namespace: \\"arhaus_membership\\", key: \\"membership_price\\") {\\n  value \\n}\\nstoris_reference_id: metafield(namespace: \\"storis\\", key: \\"reference_id\\") {\\n  value\\n}\\ncompare_at_price_change_date: metafield(namespace: \\"custom\\", key: \\"compare_at_price_change_date\\") {\\n    value\\n}\\nprice_change_date: metafield(namespace: \\"custom\\", key: \\"price_change_date\\") {\\n  value\\n}\\nis_last_chance: metafield(namespace: \\"product\\", key: \\"is_last_chance\\") {\\n  value\\n}\\ngift_box_handle: metafield(namespace: \\"product\\", key: \\"gift_box_sku\\") {\\n  value\\n}\\nworryfree_plan: metafield(namespace: \\"product\\", key: \\"worryfree_plan\\") {\\n  value\\n}\\nworryfree_protection: metafield(namespace: \\"product\\", key: \\"worryfree_protection\\") {\\n  value\\n}\\nis_warranty_available: metafield(namespace: \\"product\\", key: \\"is_warranty_available\\") {\\n  value\\n}\\nvendor_id: metafield(namespace: \\"product\\", key: \\"vendor_id\\") {\\n  value\\n}\\ngiftproduct_lineitem_id: metafield(namespace: \\"product\\", key: \\"giftproduct_lineitem_id\\") {\\n  value\\n}\\nvariant_dimensions: metafield(namespace: \\"product\\", key: \\"dimensions_json\\") {\\n  value\\n}\\ndimension_details: metafield(namespace: \\"product\\", key: \\"dimension_details\\") {\\n  value\\n}\\nspecification_details: metafield(namespace: \\"product\\", key: \\"specification_details\\") {\\n  value\\n}\\nshipping_and_return: metafield(namespace: \\"product\\", key: \\"shipping_and_return\\") {\\n  value\\n}\\ngallery_images: metafield(namespace: \\"product\\", key: \\"pdp_gallery_image\\") {\\n  value\\n}\\ngallery_image_alt_text: metafield(namespace: \\"product\\", key: \\"pdp_gallery_image_alt_text\\") {\\n  value\\n}\\nswatch_image:  metafield(namespace: \\"product\\", key: \\"swatch_image\\") {\\n  value\\n}\\n\\n\\n        }\\n      }\\n      pageInfo {\\n        hasNextPage\\n        endCursor\\n      }\\n    }\\n  }\\n}","variables":{}}',
  method: 'POST',
  mode: 'cors',
  credentials: 'include'
})

const {
  test,
  STROEFRONT_ACCESS_TOKEN,
  STOREFRONT_API_URL,
  PRODUCT_HANDLE,
  VARIANT_COUNT_STRING
} = process.env

const VARIANTS_PER_REQUEST = 200

const STOREFRONT_QUERY = /* GraphQL */ `
  query GetProductVariants(
    $PRODUCT_HANDLE: String!
    $FIRST: Int!
    $AFTER: String
    $REVERSE: Boolean = false
  ) {
    product(handle: $PRODUCT_HANDLE) {
      variants(first: $FIRST, reverse: $REVERSE, after: $AFTER) {
        edges {
          cursor
          node {
            title
            id
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          startCursor
          hasPreviousPage
        }
      }
    }
  }
`

async function storeFrontApiFetch(variables: Record<string, any> = {}) {
  if (!STOREFRONT_API_URL || !STROEFRONT_ACCESS_TOKEN) {
    throw new Error(
      'Missing SHOPIFY_STOREFRONT_API_URL or STOREFRONT_ACCESS_TOKEN environment variables'
    )
  }

  const variablesWithDefaults = {
    PRODUCT_HANDLE: PRODUCT_HANDLE,
    FIRST: VARIANTS_PER_REQUEST,
    AFTER: null,
    REVERSE: false,
    ...variables
  }

  console.log('Fetching with variables:', variablesWithDefaults)

  const res = await fetch(STOREFRONT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STROEFRONT_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: STOREFRONT_QUERY,
      variables: variablesWithDefaults
    })
  })

  const { data } = await res.json()

  return data
}

async function singleBatchLoadProductVariants() {
  const data = await storeFrontApiFetch()
  const variants = data.product.variants.edges.map((edge: any) => edge.node)

  return variants
}

async function multiBatchLoadProductVariants(variantCount: number) {
  // Implementation for loading variants in multiple batches
  return []
}

export default async function () {
  try {
    const variantCount = Number(VARIANT_COUNT_STRING)
    if (isNaN(variantCount)) {
      throw new Error('Invalid staticProductVariantCount environment variable')
    }

    const variants =
      variantCount <= VARIANTS_PER_REQUEST
        ? await singleBatchLoadProductVariants()
        : await multiBatchLoadProductVariants(variantCount)

    console.log(variantCount, variants.length)
  } catch (error) {
    console.error('Error loading product variants:', error)
  }
}
