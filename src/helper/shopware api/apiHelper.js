import axios from "axios";

const shopwareDomain = "http://localhost/store-api/";


export class RequestType{
  static categories = 1;
  static product = 2;
  static productList = 3;
    
}



export default async function apiRequest(requestType) {

    let data;

  if (requestType === 1) {
    data = await getCategories();
  }else if (requestType === 3) {
    data = await getProductList();
  }

  return data;
}


async function getCategories(){
  let result;
   result = axios({
     method: "post",
     url: `${shopwareDomain}category`,
     headers: { "sw-access-key": "SWSCWDHDQLQ4UM9YZZZIEUXLBQ" },
   }).then((res) => {
     return res.data.elements;
   });
   return result;
}


async function getProductList(){
  let result;
  result = axios({
    method: "post",
    url: `${shopwareDomain}product-listing/929de9a601d346e49f23861b67d6575e`,
    headers: { "sw-access-key": "SWSCWDHDQLQ4UM9YZZZIEUXLBQ" },
  }).then((res) => {
    return res.data.elements;
  });
  return result;
}