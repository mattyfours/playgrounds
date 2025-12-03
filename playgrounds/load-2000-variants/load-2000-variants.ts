import { variant } from './fragments'

const {
  test,
  STROEFRONT_ACCESS_TOKEN,
  STOREFRONT_API_URL,
  PRODUCT_HANDLE,
  VARIANT_COUNT_STRING
} = process.env

const OUT_IN_VARIANT_COUNT_BREAKPOINT = 200
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
            ${variant}
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

async function singleLoopLoadProductVariants(
  variantCount: number,
  variableOverrides: Record<string, any> = {}
) {
  let hasNextPage = true
  const variants = []

  do {
    const numberOfVariantsToRequest = Math.min(
      VARIANTS_PER_REQUEST,
      variantCount - variants.length
    )

    console.log(
      `Loading variants: ${variants.length}-${
        variants.length + numberOfVariantsToRequest
      } out of ${variantCount}. In ${
        variableOverrides.REVERSE === true ? 'reverse' : 'forward'
      } direction.`
    )
    const data = await storeFrontApiFetch({
      FIRST: numberOfVariantsToRequest,
      ...variableOverrides
    })

    const newVariants = data.product.variants.edges.map(
      (edge: any) => edge.node
    )
    variants.push(...newVariants)

    const pageInfo = data.product.variants.pageInfo

    hasNextPage = pageInfo.hasNextPage
  } while (variants.length < variantCount && hasNextPage === true)

  return variants
}

async function outInLoopLoadProductVariants(variantCount: number) {
  const halfVariantCount = Math.ceil(variantCount / 2)
  const firstHalfVariantCount = halfVariantCount
  const secondHalfVariantCount = variantCount - halfVariantCount

  const loadPromises = [
    singleLoopLoadProductVariants(firstHalfVariantCount),
    singleLoopLoadProductVariants(secondHalfVariantCount, { REVERSE: true })
  ]

  const promiseRes = await Promise.allSettled(loadPromises)
  const variants = []
  for (const res of promiseRes) {
    if (res.status === 'fulfilled') {
      variants.push(...res.value)
    } else {
      console.error('Error loading variants in out-in loop:', res.reason)
    }
  }

  return variants
}

export default async function () {
  try {
    const variantCount = Number(VARIANT_COUNT_STRING)
    if (isNaN(variantCount)) {
      throw new Error('Invalid staticProductVariantCount environment variable')
    }

    if (variantCount <= OUT_IN_VARIANT_COUNT_BREAKPOINT) {
      console.log(
        `Loading ${variantCount} variants for [${PRODUCT_HANDLE}] in a single loop`
      )
    } else {
      console.log(
        `Loading ${variantCount} variants for [${PRODUCT_HANDLE}] in out-in loop`
      )
    }

    console.time('\nLoad Product Variants Duration')
    const variants =
      variantCount <= OUT_IN_VARIANT_COUNT_BREAKPOINT
        ? await singleLoopLoadProductVariants(variantCount)
        : await outInLoopLoadProductVariants(variantCount)

    console.timeEnd('\nLoad Product Variants Duration')

    console.log(
      `Loaded ${variants.length} variants / ${variantCount} expected variants`
    )
  } catch (error) {
    console.error('Error loading product variants:', error)
  }
}
