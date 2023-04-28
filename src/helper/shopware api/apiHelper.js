import axios from "axios";

const shopwareDomain = "http://localhost/store-api/";
const shopwareKey = "SWSCWDHDQLQ4UM9YZZZIEUXLBQ";


export class RequestType{
  static categories = 1;
  static product = 2;
  static productList = 3;
  static login = 4;
  static register = 5;
  static salutation = 6;
    
}



export default async function apiRequest(requestType, categoryID = null, login = null, register = null) {

  let data;

  /* NOTE: Get Categoreis */
  if (requestType === 1) {
    data = await getCategories();

   
  }

  /* NOTE: GET Product List */
  if (requestType === 3 && categoryID != null) {
    data = await getProductList(categoryID);
  }else if(requestType === 3 && categoryID === null){
    console.error("Pleas provide a category ID to select Products");
    return;
  }
  
  /* NOTE: Login User */
  if (requestType === 4 && login != null){

  }else if(requestType === 4 && login === null){
    console.error("Pleas provide proper Login Credentials");
    return;
  }

  /* NOTE: Register User */
  if( requestType === 5 && register != null){

  }else if ((requestType === 5 && register === null)) {
    console.error("Pleas provide proper Registration Credentials");
    return;
  }

  /* NOTE:  */
  if(requestType === 6){
    data = await requestSalutation();
  }

  return data;
}


async function getCategories(){
  let result;
   result = axios({
     method: "post",
     url: `${shopwareDomain}category`,
     headers: { "sw-access-key": shopwareKey },
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
    headers: { "sw-access-key": shopwareKey},
  }).then((res) => {
    return res.data.elements;
  });
  return result;
}

/* TODO: Change Function */
async function logInUser(){
  let result;
  result = axios({
    method: "post",
    url: `${shopwareDomain}product-listing/${categoryID}`,
    headers: { "sw-access-key": shopwareKey },
  }).then((res) => {
    return res.data.elements;
  });
  return result;
}


/* TODO: Chnage Function */
async function registerUser(){
  let result;
  result = axios({
    method: "post",
    url: `${shopwareDomain}account/register`,
    headers: { "sw-access-key": shopwareKey },
    data:{
      email: '',
      password: '',
    }
  }).then((res) => {
    return res.data.elements;
  });
  return result;
}

/* NOTE: Salutation Request */
async function requestSalutation() {
  let result;
  result = axios({
    method: "post",
    url: `${shopwareDomain}salutation`,
    headers: { "sw-access-key": shopwareKey },
  }).then((res) => {
    return res.data.elements;
  });
  return result;
}