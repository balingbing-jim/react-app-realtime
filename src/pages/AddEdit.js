import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './AddEdit.css';
import fireDb from "../firebase";
import {toast} from "react-toastify";

const initialState = {
    item: "",
    price: "",
    qty: ""
}

const AddEdit = () => {
const [state, setState] = useState(initialState);
const [data, setData] = useState({});

const {item, price, qty} = state;

const navigate = useNavigate();

const {id} = useParams();

useEffect(() => {
    fireDb.child("Items").on("value", (snapshot) => {
        if (snapshot.val()!== null){
            setData({...snapshot.val()})
        } else {
            setData({});
        }
    });

    return () => {
        setData ({});
    };
}, [id]);

useEffect(() =>{
    if(id) {
        setState({...data[id]})
    } else {
        setState({...initialState})
    }

    return () =>{
        setState({...initialState})
    }
}, [id, data])

const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value });
};

const handleSubmit = (e) => {
    e.preventDefault();
    if(!item || !price || !qty) {
        toast.error("Please provide value in each input field")
    } else {
        if (!id){
            fireDb.child("Items").push(state, (err) => {
                 if(err) {
                    toast.error(err);
                } else {
                    toast.success("Workout Added Successfully");;
                }
            });
        } else {
            fireDb.child(`Items/${id}`).set(state, (err) => {
                if (err) {
                    toast.error(err);
                } else {
                    toast.success("Workout Updated Successfully!");
                }
            });
        setTimeout(() => navigate("/"), 500);
    }}
};
return (
    <div class="body">
        <div style={{marginTop: "10px"}}>
        <div class="">
                <p class="badd">Workout on Plan</p>
            </div>
            <form style={{
                    margin: "auto",
                    padding: "15px",
                    maxWidth: "150px",
                    alignContent: "center",
                }}
                onSubmit={handleSubmit}
            >
                <label htmlFor="item" className="label">Workout</label>
                <input
                type="text"
                id="item"
                name="item"
                placeHolder="Name of the Workout..."
                value={item || ""}
                onChange={handleInputChange}
                className="input"
            />
                <label htmlFor="price" className="label">Repetition</label>
                <input
                type="number"
                id="price"
                name="price"
                placeHolder="Reps of the Workout..."
                value={price || ""}
                onChange={handleInputChange}
                className="input"
            />
                <label htmlFor="qty" className="label">Time(minutes)</label>
                <input
                type="number"
                id="qty"
                name="qty"
                placeHolder="Time limit of the Workout..."
                value={qty || ""}
                onChange={handleInputChange}
                className="input"
            />
                <input type="submit" value={id ? "Update" : "Save"} class="button" />
            </form>
        </div>
        </div>
    );
};

export default AddEdit;