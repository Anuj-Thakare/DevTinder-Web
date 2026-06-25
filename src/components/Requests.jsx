import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
    const requests = useSelector((store) => store.request);
    const dispatch = useDispatch();
    const handleRequest = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
            //console.log(res);
            dispatch(addRequest(res?.data?.data));
        } catch (err) {
            console.log(err);
        }
    }

    const reviewRequest = async (status, requestId) => {
        await axios.post(BASE_URL + "/request/review/" + status + "/" + requestId, {}, { withCredentials: true});
        dispatch(removeRequest(requestId));
    }

    useEffect(() => {
        handleRequest();
    }, []);

    if (!requests) return;

    if (requests.length === 0) return <h1 className="flex justify-center my-10">No request found!!</h1>


    return (
        <div className="text-center">
            <h1 className="text-bold text-3xl text-white my-10">Connection Requests</h1>
            {requests.map((request) => {
                const { _id, firstName, lastName, photoUrl, about, age, gender } = request.fromUserId;
                return (
                    <div key={_id} className="m-4 flex w-1/2 p-4 bg-base-300 mx-auto h-auto">
                        <div><img alt="photo" className="rounded-full w-20 h-20" src={photoUrl} /></div>
                        <div className="text-left pl-4 pt-2 ">
                            <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                            {age && gender && <p>{age + ", " + gender}</p>}
                            <p>{about}</p>
                            <div className="flex ">
                                <button className="btn btn-success ml-95 mr-3 mt-2" onClick={() => reviewRequest("Accepted", request._id)}>Accept</button>
                                <button className="btn btn-error mt-2" onClick={() => reviewRequest("Rejected", request._id)}>Reject</button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Requests