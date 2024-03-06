import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import { showNotification } from "../common/headerSlice";
// import SearchBar from "../../components/Input/SearchBar";
import { getCategories } from "../../app/reducers/app";
import { FilterFunnction } from "../../components/TableFilter/FilterFunction";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewPartnerModal = () => {
    dispatch(
      openModal({
        title: "Add New Category",
        bodyType: MODAL_BODY_TYPES.ADD_NEW_CATEGORY,
      })
    );
  };

  return (
    <div className="">
      {/* <SearchBar /> */}
      <input type="text" className="input input-bordered w-50 mt-2" placeholder="Search text"
        onKeyUp={(e) => FilterFunnction(0, e.target)} />

      <button
        className="btn mx-3 px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewPartnerModal()}
      >
        Add New
      </button>
    </div>
  );
};

function CategoryPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  const handlerGetCategories = async () => {
    try {
      setLoading(true)
      await dispatch(getCategories()).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          showNotification({ message: res.payload, status: 0 })
          setLoading(false)
          return
        }
        setData(res.payload)
        setLoading(false)
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    handlerGetCategories()
  }, [])

  const updateCurrentCategory = (item) => {
    dispatch(
      openModal({
        title: "Update Category",
        bodyType: MODAL_BODY_TYPES.UPDATE_CATEGORY,
        extraObject: {
          item,
        },
      })
    );
  };

  const deleteCurrentCategory = (item) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete ${item.title}?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.CATEGORY_DELETE,
          item,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Categories"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* room List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full" id="dataTable">
            <thead>
              <tr>
                <th>Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ?
                data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {item?.title}
                      </td>
                      <td>
                        <button
                          className="btn btn-square btn-ghost"
                          onClick={() => updateCurrentCategory(item)}
                        >
                          <PencilSquareIcon className="w-5" />
                        </button>
                        <button
                          className="btn btn-square btn-ghost"
                          onClick={() => deleteCurrentCategory(item)}
                        >
                          <TrashIcon className="w-5" />
                        </button>
                      </td>
                    </tr>
                  )
                }) : <tr>
                  <td colSpan="3" className="text-center py-4">
                    No records found
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default CategoryPage;
