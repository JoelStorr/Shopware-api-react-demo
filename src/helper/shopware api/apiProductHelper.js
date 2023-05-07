
import StoreApiRequest from "./apiHelper";




export async function getProductList(categoryID){


    let listData = await StoreApiRequest.productList(categoryID).then((res) => {
      console.log(res);
      return res;
    });
    return Promise.resolve(listData);
}
