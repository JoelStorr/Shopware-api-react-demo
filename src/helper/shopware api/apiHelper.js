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
     return res.data.elements;
    });
  }else if(requestType === RequestType.productList){
     data = axios({
       method: "post",
       url: `${shopwareDomain}product-listing/929de9a601d346e49f23861b67d6575e`,
       headers: { "sw-access-key": "SWSCWDHDQLQ4UM9YZZZIEUXLBQ" },
     }).then((res) => {
       return res.data.elements;
     });
  }

  return data;
}


/* function getList */