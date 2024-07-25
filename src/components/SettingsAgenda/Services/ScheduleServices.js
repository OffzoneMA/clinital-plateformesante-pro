import { toast } from "react-toastify";
import axiosInstance from "../../../services/Axios";
import Scheduleapi from "../ApiSchedule/Scheduleapi";

class ScheduleService {

  createSchedule = async (data) => {
    return await axiosInstance.post(Scheduleapi.createSchedule(), data);
  };
  async updateSchedule(id ,data) {
    return await axiosInstance.put( Scheduleapi.updateSchedule(id),data);
  };
  async GetSchedulesByConectedMed() {
    return await axiosInstance.get( Scheduleapi.GetSchedulesByConectedMed());
  };


  
}
export default new ScheduleService();
