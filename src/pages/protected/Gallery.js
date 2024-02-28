import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Gallery from "../../features/Gallery";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Gallery" }));
  }, []);

  return <Gallery />;
}

export default InternalPage;
