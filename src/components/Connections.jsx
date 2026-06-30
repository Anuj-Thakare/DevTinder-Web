import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnectios } from "../utils/connectionsSlice";
import { Link } from "react-router-dom";

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();
    const handleConnection = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            //console.log(res?.data?.data);
            dispatch(addConnectios(res?.data?.data));
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        handleConnection();
    }, []);

    if (!connections) return;

    if (connections.length === 0) return <h1 className="flex justify-center my-10">No connections found!!</h1>


    return (
        <div className="text-center pb-10">
            <h1 className="text-bold text-3xl text-white my-10">Connections</h1>
            {connections.map((connection) => {
                const { _id, firstName, lastName, photoUrl, about, age, gender } = connection;
                return (
                    <div key={_id} className="m-4 flex w-1/2 p-4 bg-base-300 mx-auto">
                        <div><img alt="photo" className="rounded-full w-20 h-20" src={photoUrl} /></div>
                        <div className="text-left pl-4 pt-2 ">
                            <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                            {age && gender &&<p>{age + ", " + gender}</p>}
                            <p>{about}</p>
                        </div>
                        <Link to={"/chat/" + _id}><button className="btn btn-primary m-auto">Chat</button></Link>
                    </div>
                );
            })}
        </div>
    )
}

export default Connections