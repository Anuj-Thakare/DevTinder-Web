import { useState } from "react"
import UserCard from "./userCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
    //const { firstName, lastName, about } = user;
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [about, setAbout] = useState(user.about);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [showToast, setShowToast] = useState(false);

    const dispatch = useDispatch();

    const handleEdit = async () => {
        try {
            const res = await axios.put(
                BASE_URL + "/profile/edit",
                {
                    firstName,
                    lastName,
                    about,
                    photoUrl,
                    age,
                    gender
                },
                { withCredentials: true }
            );
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 2000);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="justify-items-center my-25">
                    <div className="card card-border bg-base-300 w-96">
                        <div className="card-body">
                            <h2 className="card-title justify-center font-bold text-3xl">Edit Profile</h2>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend text-base">First Name</legend>
                                <input type="text" className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend text-base">Last Name</legend>
                                <input type="text" className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend text-base">About</legend>
                                <input type="text" className="input" value={about} onChange={(e) => setAbout(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend text-base">Photo</legend>
                                <input type="text" className="input" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend text-base">Age</legend>
                                <input type="text" className="input" value={age} onChange={(e) => setAge(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend text-base">Gender</legend>
                                <input type="text" className="input" value={gender} onChange={(e) => setGender(e.target.value)} />
                            </fieldset>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" onClick={handleEdit}>Save Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            {showToast && <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile saved successfully.</span>
                </div>
            </div>}
        </>
    )
}

export default EditProfile