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
import SearchBar from "../../components/Input/SearchBar";
import { getRooms } from "../../app/reducers/app";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewRoomModal = () => {
    dispatch(
      openModal({
        title: "Add New Room",
        bodyType: MODAL_BODY_TYPES.ADD_NEW_ROOM,
      })
    );
  };

  return (
    <div className="">
      <SearchBar />

      <button
        className="btn mx-3 px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewRoomModal()}
      >
        Add New
      </button>
    </div>
  );
};

function Rooms() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [rooms, setRooms] = useState([])

  const handlerGetRooms = async () => {
    try {
      setLoading(true)
      await dispatch(getRooms()).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          showNotification({ message: res.payload, status: 0 })
          setLoading(false)
          return
        }
        setRooms(res.payload)
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
    handlerGetRooms()
  }, [])

  const updateCurrentRoom = (item) => {
    dispatch(
      openModal({
        title: "Update Room",
        bodyType: MODAL_BODY_TYPES.UPDATE_ROOM,
        extraObject: {
          item,
        },
      })
    );
  };

  const deleteCurrentRoom = (item) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete ${item.title}?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.ROOM_DELETE,
          item,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Rooms"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* room List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>size</th>
                <th>Capacity</th>
                <th>Bed</th>
                <th>Service</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rooms.length > 0 ?
                rooms.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-circle w-12 h-12">
                              <img
                                src={`http://localhost:5005/uploads/gallery/${item?.images[0]}`}
                                alt="Image"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{item.title}</div>
                          </div>
                        </div>
                      </td>
                      <td>{item.price}</td>
                      <td>{item.size}</td>
                      <td>{item.capacity}</td>
                      <td>{item.bed} bed</td>
                      <td style={{ maxWidth: 220, display: 'flex', flexWrap: 'wrap' }}>
                        {item?.services[0].split(",").map((item) => (
                          <span style={{ marginRight: 10 }}>{item},</span>
                        ))}
                      </td>
                      <td>
                        <button
                          className="btn btn-square btn-ghost"
                          onClick={() => updateCurrentRoom(item)}
                        >
                          <PencilSquareIcon className="w-5" />
                        </button>
                        <button
                          className="btn btn-square btn-ghost"
                          onClick={() => deleteCurrentRoom(item)}
                        >
                          <TrashIcon className="w-5" />
                        </button>
                      </td>
                    </tr>
                  )
                }) : <tr>
                  <td colSpan="6" className="text-center py-4">
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

export default Rooms;
