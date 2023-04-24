
import apiRequest, { RequestType } from "./apiHelper";




export async function getProductList(){


    let listData  = await apiRequest(RequestType.productList);
    console.log('-------------------- List Data ----------------------')
    console.log(listData)
}
