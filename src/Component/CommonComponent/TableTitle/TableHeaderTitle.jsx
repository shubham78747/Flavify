import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./TableTitle.css";
import { Image, Modal } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchtable,
  setComboList,
  setCustomerPreference,
  setLpComboList,
} from "../../../Pages/HomePage/Tableslice/Tableslice";
import {
  fetchMenu,
  fetchQuickBites,
} from "../../HomePageComponent/QuickBites/QuickBiteSlice/QuickBiteSlice";
import { tables } from "../../../Pages/HomePage/Tablejson/Tablejson";
import { useChannel } from "ably/react";
import {
  addItemToCart,
  setAllPastOrders,
  setUserRegistered,
} from "../../../Pages/CartPage/Cartslice/Cartslice";
import { postcustomerpreference } from "../../../Pages/HomePage/action";
import { isEmpty } from "lodash";
import { getGroupedOptionsAndAddOns } from "../../../Helper/Coman";

function TableHeaderTitle(props) {
  const [tablenom, setTableNom] = useState();
  const [show, setShow] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [activeCategory, setActiveCategory] = useState("V");
  const [isImageShown, setIsImageShown] = useState(false);
  const { menu } = useSelector((state) => state.food);
  const { table, comboList, allCombos, customerPref } = useSelector((state) => state?.table);

  const { cartItemsList, pastOrdersList } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const location = useLocation();
  const { pathname } = location;

  const steps = 10;

  const { channel } = useChannel("punched_sub_order", (message) => {
    const response = JSON.parse(message.data);
    let pastOrders = [];

    const data = {
      is_punched: true,
      items: cartItemsList,
      sub_order_id: response.sub_order_id,
    };
    pastOrders = [...pastOrdersList, data];
    dispatch(setAllPastOrders(pastOrders));
    dispatch(addItemToCart([]));

    localStorage.setItem("cartItems", JSON.stringify([]));
  });

  useEffect(() => {
    dispatch(fetchtable(tables[0].table_id));
    dispatch(fetchQuickBites());
    dispatch(fetchMenu());
  }, [0]);

  const handleShow = () => {
    setTableNom(table.table_id);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  function updateOrderedItemOptions(orderedItem) {
    // Update each item's options
    const updatedItems = orderedItem.items.map(item => {
      const updatedSubItems = item.items.map(subItem => {

        const { groupedOptions } = getGroupedOptionsAndAddOns(menu, subItem.item_id);

        const optionMap = new Map();
        groupedOptions.forEach(group => {
          group.itemList.forEach(option => {
            optionMap.set(option.option_id, {
              groupName: group.groupName,
              ...option
            });
          });
        });
        // Transform options array to a grouped options object
        const options = subItem.options.reduce((acc, opt) => {
          const optionDetail = optionMap.get(opt.option_id);
          if (optionDetail) {
            acc[optionDetail.groupName] = {
              option_id: optionDetail.option_id,
              price: optionDetail.price,
            };
          }
          return acc;
        }, {});
  
        return {
          ...subItem,
          options
        };
      });
  
      return {
        ...item,
        items: updatedSubItems
      };
    });
  
    // Return the updated ordered item object
    return {
      ...orderedItem,
      items: updatedItems
    };
  }

  useEffect(() => {
    const tableDataStr = localStorage.getItem("tableData");
    const tableData = tableDataStr
      ? JSON.parse(tableDataStr)
      : { isfirst: false };
    if (table) {
      if (table?.fresh_order && !tableData.isfirst) {
        setShow(true);
        localStorage.setItem("custRef", JSON.stringify({ diet: "V", pax: 1 }));
        dispatch(addItemToCart([]));
          localStorage.setItem("cartItems", JSON.stringify([]));
      }
      if (!table?.fresh_order) {
        const getitemdata = JSON.parse(localStorage.getItem("custPref"));
        dispatch(setUserRegistered(true));
        localStorage.setItem("isRegistered", true);
        let pastOrder = [];
        let currecntOrder = [];
        for (const order of table?.order_info) {
          if (order?.is_punched) {
            pastOrder.push(order);
          } else {
            const groupWise = updateOrderedItemOptions(order)
            currecntOrder = groupWise.items;
          }
        }
        if (table?.diet) {
          localStorage.setItem(
            "custPref",
            JSON.stringify({ diet: table?.diet, pax: table?.pax || 1 })
          );
          dispatch(setCustomerPreference({ diet: table?.diet, pax: table?.pax }))
        }
        if (currecntOrder.length > 0) {
          const data = { order: true };
          localStorage.setItem("custorder", JSON.stringify(data));
          const cartData = JSON.parse(localStorage.getItem("cartItems"));
          dispatch(addItemToCart(currecntOrder));
          localStorage.setItem("cartItems", JSON.stringify(currecntOrder));
        } else {
          const data = { order: false };
          localStorage.setItem("custorder", JSON.stringify(data));
        }
      }
    }
  }, [table]);

  

  useEffect(() => {
    const tableDataStr = localStorage.getItem("tableData");
    const tableData = tableDataStr
      ? JSON.parse(tableDataStr)
      : { isfirst: false };
    const isRegistered = JSON.parse(localStorage.getItem("isRegistered"));
    dispatch(setUserRegistered(isRegistered ? isRegistered : false));
    // dispatch(addItemToCart(cart))
    if (tableData.isfirst) {
      const getitemdata = JSON.parse(localStorage.getItem("custPref"));
      dispatch(setCustomerPreference({ diet: getitemdata?.diet, pax: getitemdata?.pax }))
    }
  }, [0]);

  useEffect(() => {
    if (table && !table?.fresh_order) {
      let pastOrder = [];
      if (table?.order_info && Array.isArray(table.order_info)) {
        for (const order of table.order_info) {
          if (order?.is_punched) {
            pastOrder.push(order);
          }
        }
      }
      dispatch(setAllPastOrders(pastOrder));
    }
  }, [table]);
  const handleSliderChange = (event) => {
    setCurrentStep(Number(event.target.value));
  };

  const handleCategoryClick = (category) => {
    const getitemdata = JSON.parse(localStorage.getItem('custPref'));
    localStorage.setItem("custPref", JSON.stringify({ diet: category, pax: getitemdata?.pax || 1 }));
    dispatch(setCustomerPreference({ diet: category, pax: currentStep }))
    setIsImageShown(false);
  };

  const updateIsFirst = (value) => {
    const tableData = JSON.parse(localStorage.getItem("tableData")) || {};
    tableData.isfirst = value;
    localStorage.setItem("tableData", JSON.stringify(tableData));
  };

  const senddata = async () => {
    try {
      const header = {
        order_id: table?.order_id,
        pax: currentStep,
        diet: activeCategory,
      };
      const response = await postcustomerpreference(header);
      if (response?.data) {
        localStorage.setItem("custPref", JSON.stringify({ diet: activeCategory, pax: currentStep }));
        dispatch(setCustomerPreference({ diet: activeCategory, pax: currentStep }))
        handleClose();
        setShow(false);
        updateIsFirst(true);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  useEffect(() => {
      if (table?.lp_combos) {
        dispatch(setLpComboList(table?.lp_combos));
      }
  }, [activeCategory, table]);

  const createCombos = (combos, diet) => {
    let comboslist = [];
    for (const combo of combos) {
      let comboItems = [];
      combo.items.map((item) => {
        const i = menu.items.find((i) => i.item_id === item);
        comboItems.push(i);
      });
      const data = {
        ...combo,
        diet: diet,
        items: comboItems,
      };
      comboslist.push(data);
    }
    dispatch(setComboList(comboslist));
  };

  useEffect(() => {
    if (!isEmpty(allCombos)) {
      createCombos(allCombos[activeCategory], activeCategory);
    }
  }, [allCombos, menu]);

  useEffect(() => {
    if (!isEmpty(customerPref)) {
      setCurrentStep(customerPref?.pax)
      setActiveCategory(customerPref?.diet)
    }
  }, [customerPref]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cartItems'))
    dispatch(addItemToCart(cart))
}, [0]);

  return (
    <>
      <div className={`maintitle ${props.className}`}>
        {pathname === "/cart" ? (
          <Link to={"/menu"}>
            <Icon icon="ion:chevron-back" />
          </Link>
        ) : pathname === "/menu" ? (
          <h1 className="table-number">
            <Image src={props.titleicon} />
            {props.title}
          </h1>
        ) : pathname === "/" ? (
          <h1 className="table-number" onClick={handleShow}>
            <Image src={props.titleicon} />
            {props.title}
          </h1>
        ) : (
          <h1 className="table-number">
            <Image src={props.titleicon} />
            {props.title}
          </h1>
        )}
        <Link to={props.link}>
          <Image src={props.profileimg}></Image>
        </Link>
      </div>
      <Modal show={show} className="automodal">
        <Modal.Body className="pt-5 p-3">
          <div className="guestselectmodalmain">
            <h3>Number of guests for dining?</h3>
            <div className="progress-container">
              <div className="progress-number">
                {currentStep >= 10 ? "10+" : currentStep}
              </div>
              <input
                type="range"
                min="1"
                max={steps}
                value={currentStep}
                onChange={handleSliderChange}
                className="progress-slider"
              />
            </div>
            <ul className="selectcategories">
              <li className={activeCategory === "V" ? "active" : ""}>
                <Link href="#" onClick={() => handleCategoryClick("V")}>
                  <span>
                    <Image src="/Images/veg.svg" alt="Veg" />
                  </span>
                  Veg
                </Link>
              </li>
              <li className={activeCategory === "N" ? "active" : ""}>
                <Link href="#" onClick={() => handleCategoryClick("N")}>
                  <span>
                    <Image src="/Images/nonveg.svg" alt="Non-Veg" />
                  </span>
                  Non-Veg
                </Link>
              </li>
              <li className={activeCategory === "E" ? "active" : ""}>
                <Link href="#" onClick={() => handleCategoryClick("E")}>
                  <span>
                    <Image src="/Images/egg.svg" alt="Egg" />
                  </span>
                  Egg
                </Link>
              </li>
            </ul>
            <Link href="#" className="btngreen continue" onClick={senddata}>
              Continue <Icon icon="formkit:right" width="16px" height="16px" />
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default TableHeaderTitle;
