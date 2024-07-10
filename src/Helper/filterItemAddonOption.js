const filterItemAddonOption = (menu, itemOptions, itemAddOns, item_id) => {
    const optionsGrouped = Object.values(itemOptions
    .filter((option) => option.item_id === item_id)
    .reduce((groups, itemOption) => {
        const groupName = itemOption.option_group_name;
        if (!groups[groupName]) {
        groups[groupName] = { groupName, itemList: [] };
        }
        const optionDetails = menu.options.find(
        (option) => option.option_id === itemOption.option_id
        );
        groups[groupName].itemList.push(optionDetails);
        return groups;
    }, {}));

    // Find related add-ons and group by addon_group_name
    const addOnsGrouped = Object.values(itemAddOns
    .filter((addon) => addon.item_id === item_id)
    .reduce((groups, itemAddon) => {
        const groupName = itemAddon.addon_group_name;
        if (!groups[groupName]) {
        groups[groupName] = { groupName, itemList: [] };
        }
        const addonDetails = menu.addOns.find(
        (addon) => addon.addon_id === itemAddon.addon_id
        );
        groups[groupName].itemList.push(addonDetails);
        return groups;
    }, {}));
    return { optionsGrouped, addOnsGrouped }
  };
  
  export default filterItemAddonOption;
  