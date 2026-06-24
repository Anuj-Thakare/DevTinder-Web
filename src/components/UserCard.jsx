const UserCard = ({user}) => {
    console.log(user);
    const {firstName, lastName, skills, photoUrl, about, age, gender} = user;
    return (
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img
                    src={photoUrl}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-secondary">Interested</button>
                    <button className="btn btn-primary">Ignore</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard