import pkg from "@apollo/client";
const { ApolloClient, InMemoryCache } = pkg;
import pkg2 from "@apollo/client";
const { gql } = pkg;

const createApolloClient = () => {
  return new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
  });
};

// console.log(session);

export async function readDataBySearch(string, page, limit) {}

export async function readData(page, limit) {
  const client = createApolloClient();
  const { data } = await client.query({
    query: gql`
      query Query($options: ProductOptions) {
        products(options: $options) {
          image_url
          category {
            name
          }
        }
      }
    `,
    variables: {
      options: {
        limit: limit,
        offset: page,
      },
    },
  });
  return data;
}



export const getQueryById = async (pd_id) => {};

export const getCommentById = async (ids) => {};

export const createComment = async (comment, username, pid) => {};

export const loginUser = async (username) => {};

export const RegisterUser = async (user) => {};

export const AddProductToCart = async (prod_id, username) => {};

export const ViewProductsInCart = async (username) => {};
