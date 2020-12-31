import { useSelector } from "../store";

export const useModal = () => useSelector(state=>state.modal)