import { useState } from "react";

import apiRequest, { RequestType } from "./apiHelper";

export default async function apiCategoriesHelper() {
  let data = await apiRequest(RequestType.categories);

  let orderData = await orderNav(data);
  let fullySorted = sortSubCategories(orderData);
  return fullySorted;
}

//NOTE: Only allows for one Child Categorie right now
//TODO: Make sure that there are no duplicates in Categories Array when data is called again.--- done

async function orderNav(queryResElemetns) {
  const tempCategories = [];

  queryResElemetns.forEach((element) => {
    if (
      element.parentId === null &&
      !tempCategories.some((ele) => element.name == ele.parent.name)
    ) {
      const categoryConversionObject = { parent: element, children: [] };

      tempCategories.push(categoryConversionObject);
    } else if (element.parentId != null && tempCategories.length > 0) {
      const parent = tempCategories.find((ele) => {
        return ele.parent.id == element.parentId;
      });

      parent.children.push(element);
    }
  });

  // TODO: Reorder Children based on ID --- done

  return tempCategories;
}

// TODO: Make sorting Class that can resort elements based on afterCategorieId
function sortSubCategories(data) {
  const categoreisCopy = [...data];

  categoreisCopy.forEach((element) => {
    //Match afterId to prev id
    let sortedArray = element.children.sort((val1, val2) => {
      if (val1.afterCategoryId === null) {
        return -1;
      } else if (val2.afterCategoryId === null) {
        return 1;
      } else if (val1.afterCategoryId.normalize() === val2.id.normalize()) {
        return 1;
      } else if (val2.afterCategoryId.normalize() === val1.id.normalize()) {
        return -1;
      }
      return 0;
    });

    //Send it back into the State

    element.children = sortedArray;
  });

  return categoreisCopy;
}
