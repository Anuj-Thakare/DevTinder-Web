import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./userCard";

const Feed = () => {
  const feed = useSelector(store => store.feed);
  const dispatch = useDispatch();

  const handleFeed = async () => {
    try{
      if(feed) return;
      const res = await axios.get(BASE_URL + "/feed", {withCredentials: true});
      dispatch(addFeed(res?.data?.data));
    }catch(err){
      console.error(err);
    }
  };

  useEffect(() =>{
    handleFeed();
  }, []);

  if(!feed) return;

  if(feed.length <= 0) return <h1 className="text-center my-10">No New User Found!</h1>

  return (
    feed && (   
    <div className="flex justify-center my-10">
      <UserCard user = {feed[0]}/>
    </div>)
  )
}

export default Feed