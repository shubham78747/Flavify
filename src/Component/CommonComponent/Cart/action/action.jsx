import Axios from "../../../../Helper/axiosHelper";
// post placeorder
export const placeorder = async (data) => {
  try {
    const response = await Axios({
      method: "post",
      url: `/placeorder`,
      data: data,
    });
    return response; 
  } catch (error) {
    throw error; 
  }
};

export const Updateplaceorder = async (data) => {
  try {
    const response = await Axios({
      method: "put",
      url: `/placeorderupdate`,
      data: data,
    });
    return response; 
  } catch (error) {
    throw error; 
  }
};
