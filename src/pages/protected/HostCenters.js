import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import HostCenter from "../../features/HostCenters";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Host Centers" }));
  }, []);

  return <HostCenter />;
}

export default InternalPage;
