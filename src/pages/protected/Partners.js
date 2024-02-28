import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Partner from "../../features/Partners";


function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Partner" }));
  }, []);

  return <Partner /> ;
}

export default InternalPage;
