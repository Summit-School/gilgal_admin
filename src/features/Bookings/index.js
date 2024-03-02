import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { showNotification } from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard"
// import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import SearchBar from "../../components/Input/SearchBar"
import { getBookings, getRooms } from "../../app/reducers/app"
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import { openModal } from "../common/modalSlice"
import {
    CONFIRMATION_MODAL_CLOSE_TYPES,
    MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";


const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {

    const [filterParam, setFilterParam] = useState("")
    const [searchText, setSearchText] = useState("")
    // const locationFilters = ["Paris", "London", "Canada", "Peru", "Tokyo"]

    // const showFiltersAndApply = (params) => {
    //     applyFilter(params)
    //     setFilterParam(params)
    // }

    const removeAppliedFilter = () => {
        removeFilter()
        setFilterParam("")
        setSearchText("")
    }

    useEffect(() => {
        if (searchText == "") {
            removeAppliedFilter()
        } else {
            applySearch(searchText)
        }
    }, [searchText])

    return (
        <div className="inline-block float-right">
            <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
            {filterParam != "" && <button onClick={() => removeAppliedFilter()} className="btn btn-xs mr-2 btn-active btn-ghost normal-case">{filterParam}<XMarkIcon className="w-4 ml-2" /></button>}
            {/* <div className="dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} className="btn btn-sm btn-outline"><FunnelIcon className="w-5 mr-2" />Filter</label>
                <ul tabIndex={0} className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52">
                    {
                        locationFilters.map((l, k) => {
                            return <li key={k}><a onClick={() => showFiltersAndApply(l)}>{l}</a></li>
                        })
                    }
                    <div className="divider mt-0 mb-0"></div>
                    <li><a onClick={() => removeAppliedFilter()}>Remove Filter</a></li>
                </ul>
            </div> */}
        </div>
    )
}


function Bookings() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [bookings, setBookings] = useState([])
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

    const handlerGetBookinngs = async () => {
        try {
            setLoading(true)
            await dispatch(getBookings()).then((res) => {
                if (res.meta.requestStatus === "rejected") {
                    showNotification({ message: res.payload, status: 0 })
                    setLoading(false)
                    return
                }
                setBookings(res.payload)
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
        handlerGetBookinngs()
        handlerGetRooms()
    }, [])

    const formatMoney = (amount) => {
        let dollarUSLocale = Intl.NumberFormat("en-US");
        return dollarUSLocale.format(amount);
    };

    const removeFilter = () => {
        setBookings(bookings)
    }

    const applyFilter = (params) => {
        let filteredBookings = bookings.filter((t) => { return t.location == params })
        setBookings(filteredBookings)
    }

    // Search according to name
    const applySearch = (value) => {
        let filteredBookings = bookings.filter((t) => { return t.username.toLowerCase().includes(value.toLowerCase()) || t.username.toLowerCase().includes(value.toLowerCase()) })
        setBookings(filteredBookings)
    }

    const updateCurrentBooking = (item) => {
        dispatch(
            openModal({
                title: "Update Booking  Status",
                bodyType: MODAL_BODY_TYPES.UPDATE_BOOKING,
                extraObject: {
                    item,
                },
            })
        );
    };

    return (
        <>

            <TitleCard title="Bookings" topMargin="mt-2"
                TopSideButtons={<TopSideButtons applySearch={applySearch} applyFilter={applyFilter} removeFilter={removeFilter}
                />}>

                {/* Team Member list in table format loaded constant */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>User name</th>
                                <th>Phone number</th>
                                <th>Room name</th>
                                <th>Price</th>
                                <th>Check-In Date</th>
                                <th>Check-Out Date</th>
                                <th>Adults</th>
                                <th>Kids</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bookings.length > 0 ?
                                    bookings.map((l, k) => {
                                        const room = rooms?.filter((item) => item._id === l.roomId)[0]
                                        return (
                                            <tr key={k}>
                                                <td>
                                                    <div className="flex items-center space-x-3">
                                                        {/* <div className="avatar">
                                                        <div className="mask mask-circle w-12 h-12">
                                                            <img src={l.avatar} alt="Avatar" />
                                                        </div>
                                                    </div> */}
                                                        <div>
                                                            <div className="font-bold">
                                                                {l.username}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{l.phoneNumber}</td>
                                                <td>{room?.title}</td>
                                                <td>{formatMoney(room?.price)}</td>
                                                <td>{moment(l.checkInDate).format("D MMM YYYY")} {l.checkInTime}</td>
                                                <td>{moment(l.checkOutDate).format("D MMM YYYY")} {l.checkOutTime}</td>
                                                <td>{l.guestAdults}</td>
                                                <td>{l.guestKids}</td>
                                                <td
                                                    style={{
                                                        color: l.status === "pending" ? "yellow"
                                                            : l.status === "active" ? "green"
                                                                : l.status === "closed" ? "purple" : "red"
                                                    }}
                                                >{l.status}</td>
                                                <td>{moment(l.createdAt).format("D MMM YYYY")}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-square btn-ghost"
                                                        onClick={() => updateCurrentBooking(l)}
                                                    >
                                                        <PencilSquareIcon className="w-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    }) : <tr>
                                        <td colSpan="11" className="text-center py-4">
                                            No records found
                                        </td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    )
}


export default Bookings