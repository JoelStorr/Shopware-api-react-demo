
import apiRequest, { RequestType } from "./apiHelper";




export async function getProductList(){


    let listData = await apiRequest(RequestType.productList).then((res) => {
      console.log(res);
      return res;
    });
    return listData;
}
