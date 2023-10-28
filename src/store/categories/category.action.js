import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { createAction } from "../../utils/reducer/reducer";
import CATEGORIES_ACTION_TYPES from "./category.types";

export const fetchCategoriesStart = () => {
  return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);
};

export const fetchCategoriesSuccess = (categoriesArray) => {
  return createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );
};

export const fetchCategoriesFailed = (error) => {
  return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
};
