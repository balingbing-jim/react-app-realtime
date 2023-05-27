import React, {useState, useEffect} from 'react';
import fireDb from "../firebase";
import { useParams, Link } from 'react-router-dom';
import "./View.css";

const View = () => {
    const [user, setUser] = useState({});

    const {id} = useParams();

    useEffect(() => {
        fireDb.child(`Items/${id}`).get().then((snapshot) => {
            if (snapshot.exists()) {
                setUser({...snapshot.val()});
            } else {
                setUser ({});
            }
        })
    }, [id]);

    console.log("user", user);

    return(
        <div style={{marginTop: "150px"}}>
            <div className="card">
                <div className="card-header">
                    <p>Workout Info</p>
                </div>
                <div className="container">
                    <strong>ID: </strong>
                    <span>{id}</span>
                    <br></br><br></br>
                    
                    <strong>Workout: </strong>
                    <span>{user.item}</span>
                    <br></br><br></br>
                    
                    <strong>Repetition: </strong>
                    <span>{user.price}</span>
                    <br></br><br></br>
                    
                    <strong>Time(minutes): </strong>
                    <span>{user.qty}</span>
                    <br></br><br></br>

                    <Link to="/">
                        <button className="btn btn-edit">Back</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default View