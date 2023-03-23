import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    //Filter to maxPrice of the Products
    let maxPrice = Math.max(...action.payload.map((p) => p.price));
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      //For the filters in initialState of filter_context.js, we do not want to alter the filter object items so we copy them using ...state.filters,
      //and price:maxPrice because we want to display all the items of ProductPage as the page gets open(default)
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  //Sorting dropdown menu
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProduct = [...filtered_products]; //bcs we want some products to be sorted, it cannot be empty
    if (sort === "price-lowest") {
      tempProduct = tempProduct.sort((a, b) => {
        return a.price - b.price;
      });
    }
    if (sort === "price-highest") {
      tempProduct = tempProduct.sort((a, b) => {
        return b.price - a.price;
      });
    }
    if (sort === "name-a") {
      tempProduct = tempProduct.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    }
    if (sort === "name-z") {
      tempProduct = tempProduct.sort((a, b) => {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      });
    }
    return { ...state, filtered_products: tempProduct };
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }
  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    const { text, category, company, color, price, shipping } = state.filters;

    //start will all the products
    let tempProduct = [...all_products];

    //search input
    if (text) {
      tempProduct = tempProduct.filter((product) => {
        return product.name.toLowerCase().includes(text);
      });
    }
    //category
    if (category !== "all") {
      tempProduct = tempProduct.filter((product) => {
        return product.category === category;
      });
    }
    //company
    if (company !== "all") {
      tempProduct = tempProduct.filter((product) => {
        return product.company === company;
      });
    }
    //colors
    if (color !== "all") {
      tempProduct = tempProduct.filter((product) => {
        return product.colors.find((c) => c === color);
      });
    }
    //price
    tempProduct = tempProduct.filter((product) => {
      return product.price <= price;
    });
    //shipping
    if (shipping) {
      tempProduct = tempProduct.filter((product) => {
        return product.shipping === shipping;
      });
    }

    return { ...state, filtered_products: tempProduct };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        //even if we remove the price, there will be no change(optional)
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
