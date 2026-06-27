import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
    const dispatch = useDispatch();
    const { _id, firstName, lastName, skills, photoUrl, about, age, gender } = user;

    const handleFeed = async (status, UserId) => {
        try {
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + UserId, {}, { withCredentials: true });
            dispatch(removeFeed(UserId));
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div className="card bg-base-300 w-96 h-auto shadow-sm">
            <figure>
                <img
                    src={photoUrl}
                    alt="Shoes" />
            </figure>
            <div className="card-body ">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-secondary" onClick={() =>  handleFeed("Interested", _id) }>Interested</button>
                    <button className="btn btn-primary" onClick={() => handleFeed("Ignored", _id)}>Ignore</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard