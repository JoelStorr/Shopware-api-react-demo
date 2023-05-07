import axios from "axios";

const shopwareDomain = "http://localhost/store-api/";
const shopwareKey = "SWSCWDHDQLQ4UM9YZZZIEUXLBQ";


export default class StoreApiRequest {
  static async getCategories() {
    return axios({
      method: "post",
      url: `${shopwareDomain}category`,
      headers: { "sw-access-key": shopwareKey },
    }).then((res) => {
      return res.data.elements;
    });
  }
  /* TODO: Make Indevidual Product Request */
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
  static async login(loginObj) {
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
          countryId: userObj.countryId,
        },
      },
    }).then((res) => {
      return res.data.elements;
    }).catch((e)=>{console.error(e)});
  }
   static async salutation() {
    return axios({
      method: "post",
      url: `${shopwareDomain}salutation`,
      headers: { "sw-access-key": shopwareKey }
    }).then((res) => {
      return res.data.elements;
    }).catch(e=>{});
  };

  static async getCountries(){
    return axios({
      method: "post",
      url: `${shopwareDomain}country`,
      headers: { "sw-access-key": shopwareKey },
    }).then((res) => {
      return res.data.elements;
    });
  }

}
