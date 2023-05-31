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
  static async getProduct() {
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
  /* TODO: Transform to Search function */
  static async getSearchResult(searchVal) {
    return axios({
      method: "post",
      url: `${shopwareDomain}search`,
      headers: { "sw-access-key": shopwareKey },
      data: {
        search: searchVal,
      },
    }).then((res) => {
      return res;
    });
  }
  static async loginUser(loginObj) {
    return axios({
      method: "post",
      url: `${shopwareDomain}account/login`,
      headers: {
        "sw-access-key": shopwareKey,
        "sw-context-token": loginObj.contextToken,
      },
      data: {
        email: loginObj.email,
        password: loginObj.password,
      },
    }).then((res) => {
      return res;
    });
  }
  static async registerUser(userObj) {
    return axios({
      method: "post",
      url: `${shopwareDomain}account/register`,
      headers: {
        "sw-access-key": shopwareKey,
        "sw-context-token": userObj.contextToken,
      },
      data: {
        getSalutationId: userObj.pronounce,
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
  }
  static async getSalutation() {
    return axios({
      method: "post",
      url: `${shopwareDomain}salutation`,
      headers: { "sw-access-key": shopwareKey },
    })
      .then((res) => {
        return res.data.elements;
      })
      .catch((e) => {});
  }
  static async getCountries() {
    return axios({
      method: "post",
      url: `${shopwareDomain}country`,
      headers: { "sw-access-key": shopwareKey },
    }).then((res) => {
      return res.data.elements;
    });
  }
  static async getContext() {
    return axios({
      method: "get",
      url: `${shopwareDomain}context`,
      headers: { "sw-access-key": shopwareKey },
    }).then((res) => {
      return res.data;
    });
  }
  static async makeCart(token) {
    return axios({
      method: "get",
      url: `${shopwareDomain}checkout/cart`,
      headers: { "sw-access-key": shopwareKey, "sw-context-token": token },
      data: { name: "my-test-cart" },
    }).then((res) => {
      return res.data;
    });
  }
  static async deleteCart(token) {
    return axios({
      method: "delete",
      url: `${shopwareDomain}checkout/cart`,
      headers: { "sw-access-key": shopwareKey, "sw-context-token": token },
      data: { name: "my-test-cart" },
    }).then((res) => {
      return res.data;
    });
  }

  static async addToCart(token = null, productList = []) {
    if (token == null) {
      console.error("No valid Context Token was submitted");
      return;
    }

    if (productList.length === 0) {
      return axios({
        method: "post",
        url: `${shopwareDomain}checkout/cart/line-item`,
        headers: { "sw-access-key": shopwareKey, "sw-context-token": token },
      }).then((res) => {
        return res.data;
      });
    } else {
      return axios({
        method: "post",
        url: `${shopwareDomain}checkout/cart/line-item`,
        headers: { "sw-access-key": shopwareKey, "sw-context-token": token },
        data: {
          items: productList,
        },
      }).then((res) => {
        return res.data;
      });
    }
  }

  static async removeFromCart(token = null, idList = []) {
    if (token == null) {
      console.error("No valid Context Token was submitted");
      return;
    }

    return axios({
      method: "delete",
      url: `${shopwareDomain}checkout/cart/line-item`,
      headers: { "sw-access-key": shopwareKey, "sw-context-token": token },
      data: {
        ids: idList,
      },
    }).then((res) => {
      return res.data;
    });
  }
}

export class devApiHelper {
  static async loginCheck(token) {
    return axios({
      method: "get",
      url: `${shopwareDomain}account/customer`,
      headers: { "sw-access-key": shopwareKey, "sw-context-token": token },
    })
      .then((res) => {
        /* console.log(res.data); */
        return res.data;
      })
      .catch((e) => {
        return e.response.data.errors[0]["status"];
      });
  }
}

export class orderItem {
  constructor({ type = "product", id = null, quantity = null }) {
    this.type = type;
    this.referencedId = id;
    this.quantity = quantity;
  }

  makeObj() {
    return {
      type: this.type,
      referencedId: this.referencedId,
      quantity: this.quantity,
    };
  }
}
