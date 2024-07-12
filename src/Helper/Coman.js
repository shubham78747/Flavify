export const getGroupedOptionsAndAddOns = (menu, quickbite) => {
    const itemOptions = Array.isArray(menu.itemOptions) ? menu.itemOptions : [];
    const itemAddOns = Array.isArray(menu.itemAddOns) ? menu.itemAddOns : [];
  
    const groupedOptions = Object.values(
      itemOptions
        .filter((option) => option.item_id === quickbite)
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
        }, {})
    );
  
    const groupedAddOns = Object.values(
      itemAddOns
        .filter((addon) => addon.item_id === quickbite)
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
        }, {})
    );
  
    return { groupedOptions, groupedAddOns };
  };
  
 export const createCombos = (menu,dispatch,setComboList,combos, diet) => {
    let comboslist = []
    for (const combo of combos) {
        let comboItems = []
        combo.items.map((item) => {
            const i = menu.items.find((i) => i.item_id === item)
            comboItems.push(i)
        })
        const data = {
            ...combo,
            diet: diet,
            items: comboItems
        }
        comboslist.push(data)
    }
    dispatch(setComboList(comboslist))
}

