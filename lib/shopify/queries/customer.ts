import imageFragment from '@/lib/shopify/fragments/image';

export const getCustomerQuery = /* GraphQL */ `
  query getCustomer {
    customer {
      displayName
      defaultAddress {
        formatted
      }
      emailAddress {
        emailAddress
      }
      phoneNumber {
        phoneNumber
      }
      orders(first: 100) {
        edges {
          node {
            name
            createdAt
            totalPrice {
              amount
              currencyCode
            }
            lineItems(first: 100) {
              edges {
                node {
                  name
                  image {
                    ...image
                  }
                  quantity
                  price {
                    amount
                    currencyCode
                  }
                  totalPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  ${imageFragment}
`;
