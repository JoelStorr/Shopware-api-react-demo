import axios from "axios";

const shopwareDomain = "http://localhost/store-api/";


export class RequestType{

    constructor(){
        this.categories = 'Categories';
        this.product = 'Product';
        this.productList = 'ProductList';
    }

}



export default async function apiRequest(requestType) {

    let data;

  if (requestType === RequestType.categories) {
    data = axios({
      method: "post",
      url: `${shopwareDomain}category`,
      headers: { "sw-access-key": "SWSCWDHDQLQ4UM9YZZZIEUXLBQ" },
    }).then((res) => {
   /*      console.log('--------------------------------------------')
        console.log(res.data.elements); */
      //setCategories([]);
     return res.data.elements;
    });
  }

  return data;
}
