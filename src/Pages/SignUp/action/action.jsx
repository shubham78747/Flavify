import Axios from "../../../Helper/axiosHelper";
// post placeorder
export const userInfo = async (data) => {
  try {
    const response = await Axios({
      method: "post",
      url: `/customerinfo`,
      data: data,
    });
    return response; 
  } catch (error) {
    throw error; 
  }
};
