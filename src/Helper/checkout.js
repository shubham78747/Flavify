import recommendation1 from "./checkout1.js";
import recommendation2 from "./checkout2.js";

const getMenuUniverseDiet = (menu, diet) => {
  // filter the menu on basis of diet, alchohol, and combos
  const menu_universe_diet = menu.filter((item) => {
    if (diet === "V") {
      return (
        item.diet === "V" &&
        item.item_subcategory !== "Alcoholic" &&
        item.item_subcategory !== "Combos"
      );
    } else if (diet === "E") {
      return (
        (item.diet === "E" || item.diet === "V") &&
        item.item_subcategory !== "Alcoholic" &&
        item.item_subcategory !== "Combos"
      );
    } else {
      return (
        item.item_subcategory !== "Alcoholic" &&
        item.item_subcategory !== "Combos"
      );
    }
  });

  return menu_universe_diet;
};

const getMenuUniverseCart = (menu_universe_diet, cart) => {
  // make note of the items in the cart by their item_id's
  const itemIds = cart.map((item) => item.item_id);
  // only include those items in menu_universe_cart which are not present in the cart
  const menu_universe_cart = menu_universe_diet.filter((item) => {
    return !itemIds.includes(item.item_id);
  });

  return menu_universe_cart;
};

const predictCheckout = (menu, pax, cart, diet) => {
  // filter out unavailable items from menu
  menu = menu?.items;
  menu = menu?.filter((item) => item.is_available);

  const menu_universe_diet = getMenuUniverseDiet(menu, diet);
  const menu_universe_cart = getMenuUniverseCart(menu_universe_diet, cart);

  const prediction1 = recommendation1(menu_universe_diet, menu_universe_cart);
  const prediction2 = recommendation2(pax, cart, menu_universe_cart, 3);
  return [...prediction1.map((item) => item.item_id), ...prediction2]; // convert prediction1 items to item_id
};

export default predictCheckout;
