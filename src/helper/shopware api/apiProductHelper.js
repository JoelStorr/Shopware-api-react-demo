
import StoreApiRequest from "./apiHelper";




export async function getProductList(categoryID){


    let listData = await StoreApiRequest.getProductList(categoryID).then((res) => {
      return res;
    });
    return Promise.resolve(listData);
}
