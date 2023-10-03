import graphql from "graphql-client";

const client = graphql({
  url: "http://localhost:4000",
  headers: {
    "Access-Control-Allow-Origin": true,
  },
});

export async function readData(offset, limit) {

  var variables = {
    options: {
      limit,
      offset,
    },
  };
  
   return client
    .query(
      `
    query Query($options: ProductOptions) {
      products(options: $options) {
            image_url
            category {
              name
            }
          }
        }`,
      variables,
      function (req, res) {
        if (res.status === 401) {
          throw new Error("Not authorized");
        }
      }
    )
    .then(function (body) {
      return ({
        data: body.data,
        quantity: body.data.length,
      });
    })
    .catch(function (err) {
      return ({
        message: err.message
      });
    });
   
}


export async function readDataBySearch(string, page, limit) {}
export const getQueryById = async (pd_id) => {};

export const getCommentById = async (ids) => {};

export const createComment = async (comment, username, pid) => {};

export const loginUser = async (username) => {};

export const RegisterUser = async (user) => {};

export const AddProductToCart = async (prod_id, username) => {};

export const ViewProductsInCart = async (username) => {};
