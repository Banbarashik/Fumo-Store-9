export const getCustomerQuery = /* GraphQL */ `
  query getCustomer {
    customer {
      displayName
      orders(first: 100) {
        edges {
          node {
            name
            totalPrice {
              amount
            }
          }
        }
      }
    }
  }
`;
