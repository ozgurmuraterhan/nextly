import { FILTER_PRODUCTS, FILTER_RESET } from "../../constants/ActionTypes";


const initialSettings = {
  filterProducts: {
    brands: [],
    categories: [],
    text: "",
    variants: [],
    minPrice: null,
    maxPrice: null,
    sort: "",
    limit: 4,
    skip: 0
  }
};

const brands = (state = initialSettings, action) => {
  switch (action.type) {

    case FILTER_PRODUCTS:
      return {
        ...state,
        filterProducts: action.payload,

      };
    case FILTER_RESET:
      return {
        ...state,
        filterProducts: {
          brands: [],
          categories: [],
          text: "",
          variants: [],
          minPrice: null,
          maxPrice: null,
        }

      };

    default:
      return state;
  }
};

export default brands;
