const ifDessert = (menu_universe_cart) => {
  // check if dessert is present in the menu
  // if present, return true
  for (let i = 0; i < menu_universe_cart.length; i++) {
    if (menu_universe_cart[i].item_category === "Desserts") {
      return true;
    }
  }
  return false;
};

const getLeftOverBeverages = (menu) => {
  // get all the beverages from the menu
  const leftOverBeverages = menu.filter((item) => {
    return item.item_category === "Beverages";
  });
  return leftOverBeverages;
};

const getBeveragesAndDesserts = (menu) => {
  // get all the beverages and desserts from the menu
  const beverages = getLeftOverBeverages(menu);

  const desserts = menu.filter((item) => {
    return item.item_category === "Desserts";
  });

  return [beverages, desserts];
};

const filterBasedOnFlavifyCategory = (
  shuffledArray,
  noOfItemsToRecommend = 1
) => {
  // filters the shuffled array based on flavify_category and returns the first
  // 'noOfItemsToRecommend' items. If not enough items are found with flavify_category as
  // "Horses" or "Stars", then return the other items while making sure that they're not repeated

  // NOTE: If shuffledArray.length < noOfItemsToRecommend, then the number of recommendations
  // will be less than required (obviously)

  let recommendations = [];
  for (let i = 0; i < shuffledArray.length; i++) {
    if (
      shuffledArray[i].flavify_category === "Horses" ||
      shuffledArray[i].flavify_category === "Stars"
    ) {
      recommendations.push(shuffledArray[i]);
      if (recommendations.length === noOfItemsToRecommend) {
        return recommendations;
      }
    }
  }
  for (let i = 0; i < shuffledArray.length; i++) {
    if (
      shuffledArray[i].flavify_category !== "Horses" ||
      shuffledArray[i].flavify_category !== "Stars"
    ) {
      recommendations.push(shuffledArray[i]);
      if (recommendations.length === noOfItemsToRecommend) {
        return recommendations;
      }
    }
  }
  return recommendations;
};

const recommendation1 = (menu_universe_diet, menu_universe_cart) => {
  // WORKING
  // recommendation 1: if dessert is present, recommend 1 dessert & 1 beverage else recommend 2 beverages
  if (ifDessert(menu_universe_cart)) {
    // recommend 1 dessert and 1 beverage // WORKING
    const [beverages, desserts] = getBeveragesAndDesserts(menu_universe_cart);
    let recommendedBeverage = {};
    let recommendedDessert = {};

    // recommend 1 dessert
    const shuffledDesserts = desserts.sort(() => 0.5 - Math.random());
    recommendedDessert = filterBasedOnFlavifyCategory(shuffledDesserts, 1);

    if (beverages.length > 0) {
      // shuffle the beverages (from menu_universe_cart) and filter based on flavify_category
      const shuffledBevs = beverages.sort(() => 0.5 - Math.random());
      recommendedBeverage = filterBasedOnFlavifyCategory(shuffledBevs, 1);
    } else {
      // if no beverages returned from menu_universe_cart, recommend a beverage from
      // menu_universe_diet based on flavify_category
      const BeveragesFromDiet = getLeftOverBeverages(menu_universe_diet);
      const shuffledBevs = BeveragesFromDiet.sort(() => 0.5 - Math.random());
      recommendedBeverage = filterBasedOnFlavifyCategory(shuffledBevs, 1);
    }

    return [recommendedBeverage[0], recommendedDessert[0]];
  }

  // ELSE recommend 2 beverages
  const leftOverBeveragesCart = getLeftOverBeverages(menu_universe_cart);

  if (leftOverBeveragesCart.length >= 2) {
    // recommend 2 beverages
    let shuffled = leftOverBeveragesCart.sort(() => 0.5 - Math.random());
    return filterBasedOnFlavifyCategory(shuffled, 2);
  }
  const leftOverBeveragesDiet = getLeftOverBeverages(menu_universe_diet);

  if (leftOverBeveragesCart.length === 1) {
    // recommend 1 beverage from leftOverBeveragesCart and 1 other from leftOverBeveragesDiet
    let recommendedBevs = [];
    // No need to add flavify category filter here since we only have 1 item in the menu_universe_cart
    recommendedBevs.push(leftOverBeveragesCart[0]);
    let shuffled = leftOverBeveragesDiet.sort(() => 0.5 - Math.random());

    // remove the recommended beverage from the shuffled array
    shuffled = shuffled.filter((e) => e !== recommendedBevs[0]);

    recommendedBevs.push(filterBasedOnFlavifyCategory(shuffled, 1)[0]);
    return recommendedBevs;
  }

  // ELSE recommend 2 beverages from leftOverBeveragesDiet
  let shuffled = leftOverBeveragesDiet.sort(() => 0.5 - Math.random());
  return filterBasedOnFlavifyCategory(shuffled, 2);
};

export default recommendation1;
