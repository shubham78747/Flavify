const getPaxTemplate = (pax) => {
  // returns array of ideal quantities of items for each category based on pax
  return [pax, pax + 1, pax]; // [Salads, Starters, Main Course]
};

const getCartQuantities = (cart) => {
  // returns array of quantities of items in cart based on their category
  const cartQuantities = cart.reduce(
    (acc, item) => {
      if (item.item_category === "Soups & Salads") {
        acc[0] += item.qty;
      } else if (item.item_category === "Starters") {
        acc[1] += item.qty;
      } else if (item.item_category === "Main Course") {
        acc[2] += item.qty;
      }
      return acc;
    },
    [0, 0, 0]
  );

  return cartQuantities;
};

const calculateRatio = (
  paxTemplate,
  cartQuantities,
  recommendationQuantities
) => {
  // returns array of ratios (current / template)
  const ratios = paxTemplate.map((idealValue, index) => {
    return (
      (cartQuantities[index] + recommendationQuantities[index]) / idealValue
    );
  });

  return ratios;
};

function getAllIndexes(arr, val) {
  // returns array of indexes of val in arr
  var indexes = [],
    i;
  for (i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);

  return indexes;
}

const getLeastRatio = (ratios) => {
  // returns array of indexes of least ratios
  const minRatio = Math.min(...ratios);
  const leastRatios = [];

  for (let i = 0; i < ratios.length; i++) {
    if (ratios[i] === minRatio) {
      leastRatios.push(i);
    }
  }

  return leastRatios;
};

const getLeastRepresented = (recommendationQuantities, leastRatios) => {
  // returns array of indexes (out of those present in leastRatios) of least
  // represented categories in the recommendationQuantities

  let leastRepresented = [];
  let leastValue = 1000;

  leastRatios.forEach((index) => {
    leastValue = Math.min(leastValue, recommendationQuantities[index]);
  });

  leastRatios.forEach((index) => {
    if (recommendationQuantities[index] === leastValue) {
      leastRepresented.push(index);
    }
  });

  return leastRepresented;
};

const allRecommendationsOfSameCategory = (recommendationQuantities) => {
  // checks if all recommendations are of the same category
  const n = recommendationQuantities.length;
  for (let i = 0; i < n; i++) {
    if (recommendationQuantities[i] === n) {
      return true;
    }
  }
  return false;
};

const ifRecommendable = (item, catToRecc, recommendations) => {
  return (
    item.item_category === catToRecc &&
    !recommendations.includes(item.item_id) &&
    (item.flavify_category === "Horses" || item.flavify_category === "Stars")
  );
};

const handleNoFlavifyCategory = (recommendationQuantities, j) => {
  // handle the case when flavify_category is not present in the menu_universe_cart
  // instead of recommending the Jth category, recommend the category which is least represented
  let miniRec = 199;
  for (let k = 0; k < recommendationQuantities.length; k++) {
    if (k !== j) {
      miniRec = Math.min(miniRec, recommendationQuantities[k]);
    }
  }
  const indexes = getAllIndexes(recommendationQuantities, miniRec);
  if (indexes.length === 1) {
    recommendationQuantities[indexes[0]]++;
  } else {
    const randIndex = Math.floor(Math.random() * indexes.length);
    recommendationQuantities[indexes[randIndex]]++;
  }
};

const recommendation2 = (
  pax,
  cart,
  menu_universe_cart,
  noOfRecommendations
) => {
  const paxTemplate = getPaxTemplate(pax);
  const cartQuantities = getCartQuantities(cart);
  let recommendationQuantities = [0, 0, 0];
  let recommendations = []; // array of item_id's of recommended items
  for (let i = 0; i < noOfRecommendations; i++) {
    const ratios = calculateRatio(
      paxTemplate,
      cartQuantities,
      recommendationQuantities
    );

    const leastRatios = getLeastRatio(ratios);

    if (leastRatios.length === 1) {
      recommendationQuantities[leastRatios[0]]++;
    } else {
      const leastRepresented = getLeastRepresented(
        recommendationQuantities,
        leastRatios
      );

      if (leastRepresented.length === 1) {
        recommendationQuantities[leastRepresented[0]]++;
      } else {
        const randomIndex = Math.floor(Math.random() * leastRepresented.length);
        recommendationQuantities[leastRepresented[randomIndex]]++;
      }
    }
  }

  // check if all 3 are the same!!!!
  if (allRecommendationsOfSameCategory(recommendationQuantities)) {
    let ratio = calculateRatio(
      paxTemplate,
      cartQuantities,
      recommendationQuantities
    );
    const index = getAllIndexes(
      recommendationQuantities,
      recommendationQuantities.length
    )[0];
    recommendationQuantities[index]--;
    ratio[index] = 1000; // making ratio of that index so high that it'll never be recommended again
    const leastRatio = getLeastRatio(ratio);
    if (leastRatio.length === 1) {
      recommendationQuantities[leastRatio[0]]++;
    } else {
      const randIndex = Math.floor(Math.random() * leastRatio.length);
      recommendationQuantities[leastRatio[randIndex]]++;
    }
  }

  const mp = {
    0: "Soups & Salads",
    1: "Starters",
    2: "Main Course",
  };

  const shuffledMenuCart = menu_universe_cart.sort(() => Math.random() - 0.5);
  let errors = 0;
  for (let i = 0; i < noOfRecommendations; i++) {
    if (errors >= noOfRecommendations) {
      // this will happen if the menu_universe_cart does not have enough items/(horses/stars) to recommend
      console.log(
        `ERROR: not enough items in menu_universe_cart to recommend ${noOfRecommendations} items.`
      );
      return recommendations;
    }

    let flag = false; // to check if an item has been recommended

    for (let j = 0; j < recommendationQuantities.length; j++) {
      if (recommendationQuantities[j] > 0) {
        recommendationQuantities[j]--;
        const catToRecc = mp[j];
        for (let k = 0; k < shuffledMenuCart.length; k++) {
          if (
            ifRecommendable(shuffledMenuCart[k], catToRecc, recommendations)
          ) {
            recommendations.push(shuffledMenuCart[k].item_id);
            flag = true;
            break;
          }
        }
        // handle the case when flavify_category is not present in the menu_universe_cart
        if (flag) {
          break;
        }
        errors++;
        handleNoFlavifyCategory(recommendationQuantities, j);
        console.log(
          "recommendationQuantities POST HANDLING FLAVIFY_ERROR: ",
          recommendationQuantities
        );
        i--; // to repeat the same iteration since nothing was recommended in this iteration
      }
    }
  }

  return recommendations;
};

export default recommendation2;
