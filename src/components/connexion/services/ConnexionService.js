import axiosInstance from "../../../services/Axios";
import Connexionapi from "../apiendpoints/Connexionapi";
export default {
  async signin(data) {
    console.log(data);
    return await axiosInstance.post(Connexionapi.login(), JSON.stringify(data));
  },
  async SignUp(data) {
    return await axiosInstance.post(
      Connexionapi.signup(),
      JSON.stringify(data)
    );
  },
  async ForgotPassword(data) {
    return await axiosInstance.post(
      Connexionapi.forgotpassword(),
      JSON.stringify(data)
    );
  },

  async createrequest(data) {
    return await axiosInstance.post(
      Connexionapi.createrequest(),
      JSON.stringify(data)
    );
  },
  async addSpecialite(data) {
    return await axiosInstance.post(
      Connexionapi.addSpecialite(),
      JSON.stringify(data)
    );
  },


  async getConfirmationToken(userId) {
    try {
      const token = await axiosInstance.get(
        Connexionapi.gettokenbyuserid(userId)
      );

      return token;
    } catch (error) {
      throw Error;
    }
  },

  async Accountuser(token) {
    try {
      const response = await axiosInstance.get(Connexionapi.confirmAccount(), {
        params: { token },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
