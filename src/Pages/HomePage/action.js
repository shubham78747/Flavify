import Axios from "../../Helper/axiosHelper";

// post customerpreference
export const postcustomerpreference = async (data) => {
  try {
    const response = await Axios({
      method: "post",
      url: `/customerpreference`,
      data: data,
    });
    return response; 
  } catch (error) {
    throw error; 
  }
};
