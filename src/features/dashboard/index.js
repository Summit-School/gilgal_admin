import DashboardStats from './components/DashboardStats'
// import AmountStats from './components/AmountStats'
// import PageStats from './components/PageStats'

import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon from '@heroicons/react/24/outline/CreditCardIcon'
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
// import UserChannels from './components/UserChannels'
// import LineChart from './components/LineChart'
// import BarChart from './components/BarChart'
// import DashboardTopBar from './components/DashboardTopBar'
import { useDispatch } from 'react-redux'
import { showNotification } from '../common/headerSlice'
// import DoughnutChart from './components/DoughnutChart'
import { useState, useEffect } from 'react'
import TitleCard from '../../components/Cards/TitleCard'
import { openModal } from '../common/modalSlice'
import {
    MODAL_BODY_TYPES
} from "../../utils/globalConstantUtil";
import moment from 'moment'
import { getBookings, getRooms } from '../../app/reducers/app'

// const statsData = [
//     { title: "Active Bookings", value: "34.7k", icon: <UserGroupIcon className='w-8 h-8' />, description: "↗︎ 2300 (22%)" },
//     { title: "Pending Bookings", value: "$34,545", icon: <CreditCardIcon className='w-8 h-8' />, description: "Current month" },
//     { title: "Closed  Bookings", value: "450", icon: <CircleStackIcon className='w-8 h-8' />, description: "50 in hot leads" },
//     { title: "Cancelled Bookings", value: "5.6k", icon: <UsersIcon className='w-8 h-8' />, description: "↙ 300 (18%)" },
// ]

function Dashboard() {

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

    const activeBookings = bookings?.filter((item) => item.status === "active")
    const pendingBookings = bookings?.filter((item) => item.status === "pending")
    const closedBookings = bookings?.filter((item) => item.status === "closed")
    const calcelledBookings = bookings?.filter((item) => item.status === "cancelled")

    // const updateDashboardPeriod = (newRange) => {
    //     // Dashboard range changed, write code to refresh your values
    //     dispatch(showNotification({ message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status: 1 }))
    // }

    const statsData = [
        { title: "Active Bookings", value: `${activeBookings?.length}`, icon: <UserGroupIcon className='w-8 h-8' />, description: "" },
        { title: "Pending Bookings", value: `${pendingBookings?.length}`, icon: <CreditCardIcon className='w-8 h-8' />, description: "" },
        { title: "Closed  Bookings", value: `${closedBookings?.length}`, icon: <CircleStackIcon className='w-8 h-8' />, description: "" },
        { title: "Cancelled Bookings", value: `${calcelledBookings?.length}`, icon: <UsersIcon className='w-8 h-8' />, description: "" },
    ]

    return (
        <>
            {/** ---------------------- Select Period Content ------------------------- */}
            {/* <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod} /> */}

            {/** ---------------------- Different stats content 1 ------------------------- */}
            <div className="grid lg:grid-cols-4 mt-4 md:grid-cols-2 grid-cols-1 gap-6">
                {
                    statsData.map((d, k) => {
                        return (
                            <DashboardStats key={k} {...d} colorIndex={k} />
                        )
                    })
                }
            </div>

            <TitleCard title="Recent Bookings" topMargin="mt-4" >

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
                                    bookings.slice(0, 10).map((l, k) => {
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



            {/** ---------------------- Different charts ------------------------- */}
            {/* <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <LineChart />
                <BarChart />
            </div> */}

            {/** ---------------------- Different stats content 2 ------------------------- */}

            {/* <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
                <AmountStats />
                <PageStats />
            </div> */}

            {/** ---------------------- User source channels table  ------------------------- */}

            {/* <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <UserChannels />
                <DoughnutChart />
            </div> */}
        </>
    )
}

export default Dashboard