import axios from "axios";

const shopwareDomain = "http://localhost/store-api/";
const shopwareKey = "SWSCWDHDQLQ4UM9YZZZIEUXLBQ";


export class StoreApiRequest {
  static async getCategories() {
    return axios({
      method: "post",
      url: `${shopwareDomain}category`,
      headers: { "sw-access-key": shopwareKey },
    }).then((res) => {
      return res.data.elements;
    });
  }
  static async product() {
    /* TODO: Add Function */
  }
  static async getProductList(categoryID) {
    return axios({
      method: "post",
      url: `${shopwareDomain}product-listing/${categoryID}`,
      headers: { "sw-access-key": shopwareKey },
    }).then((res) => {
      return res.data.elements;
    });
  }
  /* TODO: Change LogIn Function */
  static async login() {
    return axios({
      method: "post",
      url: `${shopwareDomain}product-listing/${categoryID}`,
      headers: { "sw-access-key": shopwareKey },
    }).then((res) => {
      return res.data.elements;
    });
  }
  /* TODO: Chnage to Dynamic data */
  static async registerUser(userObj) {
    return axios({
      method: "post",
      url: `${shopwareDomain}account/register`,
      headers: { "sw-access-key": shopwareKey },
      data: {
        salutationId: "32d6c76401d749d2b025eba20a511e54",
        firstName: "Alice",
        lastName: "Apple",
        email: "alice.apple@example.com",
        password: "ilovefruits",
        storefrontUrl: "http://localhost",
        billingAddress: {
          street: "Apple Alley 42",
          zipcode: "1234-5",
          city: "Appleton",
          countryId: "de7ca8cbb8934e63bed964f8d592d501",
        },
      },
    }).then((res) => {
      return res.data.elements;
    });
  }
  static async salutation() {
    return axios({
      method: "post",
      url: `${shopwareDomain}salutation`,
      headers: { "sw-access-key": shopwareKey },
    }).then((res) => {
      return res.data.elements;
    });
  }
}
