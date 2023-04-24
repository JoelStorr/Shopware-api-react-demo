import axios from "axios";

const shopwareDomain = "http://localhost/store-api/";


export class RequestType{
  static categories = 1;
  static product = 2;
  static productList = 3;
    
}



export default async function apiRequest(requestType, categoryID = null) {

    let data;

  if (requestType === 1) {
    data = await getCategories();
  }else if (requestType === 3) {
    categoryID === null ? console.error('Pleas provide a category ID to select Products') : null;
    data = await getProductList(categoryID);
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


async function getProductList(categoryID){
  let result;
  result = axios({
    method: "post",
    url: `${shopwareDomain}product-listing/${categoryID}`,
    headers: { "sw-access-key": "SWSCWDHDQLQ4UM9YZZZIEUXLBQ" },
  }).then((res) => {
    return res.data.elements;
  });
  return result;
}