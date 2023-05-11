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
  };
  /* TODO: Make Indevidual Product Request */
  static async product() {
    /* TODO: Add Function */
  };
  static async getProductList(categoryID) {
    return axios({
      method: "post",
      url: `${shopwareDomain}product-listing/${categoryID}`,
      headers: { "sw-access-key": shopwareKey },
    }).then((res) => {
      return res.data.elements;
    });
  };
  /* TODO: Change LogIn Function */
  static async login(loginObj) {
    return axios({
      method: "post",
      url: `${shopwareDomain}product-listing/${categoryID}`,
      headers: { "sw-access-key": shopwareKey },
    }).then((res) => {
      return res.data.elements;
    });
  };
  /* TODO: Chnage Billing Info to Dynamic Data */
  /* TODO: Fix Context Token */
  static async registerUser(userObj) {
    return axios({
      method: "post",
      url: `${shopwareDomain}account/register`,
      headers: {
        "sw-access-key": shopwareKey,
        "sw-context-token": userObj.contextToken,
      },
      data: {
        salutationId: userObj.pronounce,
        firstName: userObj.firstName,
        lastName: userObj.lastName,
        email: userObj.email,
        password: userObj.password,
        storefrontUrl: "http://127.0.0.1:5173",
        billingAddress: {
          street: userObj.street,
          zipcode: userObj.zipcode,
          city: userObj.city,
          countryId: userObj.countryID,
        },
      },
    })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((e) => {
        console.error(e);
      });
  };
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
  };

  static async getContext(){
    return axios({
      method: "get",
      url: `${shopwareDomain}context`,
      headers: { "sw-access-key": shopwareKey },
    }).then((res) => {
      return res.data;
    });
  }
}


export class devApiHelper{
  static async loginCheck(token){

   
      
      return axios({
        method: "get",
        url: `${shopwareDomain}account/customer`,
        headers: { "sw-access-key": shopwareKey, "sw-context-token": token },
      }).then((res) => {
        console.log(res.data);
        return res.data;
      });
    


    
  }
}