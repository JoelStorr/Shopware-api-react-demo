
import apiRequest, { RequestType } from "./apiHelper";




export async function getProductList(categoryID){


    let listData = await apiRequest(RequestType.productList, categoryID).then((res) => {
      console.log(res);
      return res;
    });
    return Promise.resolve(listData);
}
