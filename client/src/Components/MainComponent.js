import React, {useState, useEffect} from "react";
import {
    fetchData,
    addData,
    deleteData,
    updateData,
} from "../utils/requests.helper";
import loaderImg from "../assets/loader.svg";
function MainComponent() {
    const [data, setdata] = useState([]);
    const [loading, setloading] = useState(false);
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [email, setemail] = useState("");
    const [updateId, setupdateId] = useState("");
    const [dob, setdob] = useState(
        `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
        }-${new Date().getUTCDate()}`
    );
    const addEntryHandler = e => {
        setloading(true);
        e.preventDefault();
        const {fname, lname, email, dob} = e.target.elements;
        const data = {
            fname: fname.value,
            lname: lname.value,
            email: email.value,
            dob: dob.value,
        };
        addData(data, d => {
            if (d === "failed") {
                console.log("failed to Add");
                alert("Failed : Please Enter Valid data")
                setloading(false);
            } else {
                fetchData(data => {
                    if (data === "failed") {
                        console.log("failed to fetch");
                        setloading(false);
                    } else {
                        setdata(data);
                        setloading(false);
                    }
                });
            }
        });
    };
    const updateEntryHandler = value => {
        setemail(value.email);
        setfname(value.fname);
        setlname(value.lname);
        setdob(
            `${new Date(value.dob).getFullYear()}-${
                new Date(value.dob).getMonth() + 1
            }-${
                new Date(value.dob).getUTCDate() >= 10
                    ? new Date(value.dob).getUTCDate()
                    : "0" + new Date(value.dob).getUTCDate()
            }`
        );
        setupdateId(value._id);
    };
    const deleteEntryHandler = _id => {
        setloading(true);

        deleteData(_id, d => {
            if (d === "failed") {
                console.log("failed to delete");
                alert("Failed : Unable to delete data");
                
                setloading(false);
            } else {
                console.log("success");
                fetchData(data => {
                    console.log("data", data);
                    if (data === "failed") {
                        console.log("failed to fetch");
                        setloading(false);
                    } else {
                        setdata(data);
                        setloading(false);
                    }
                });
            }
        });
    };
    const updateEntry = e => {
        setloading(true);

        e.preventDefault();
        const {fname, lname, email, dob} = e.target.elements;
        const data = {
            fname: fname.value,
            lname: lname.value,
            email: email.value,
            dob: dob.value,
            _id: updateId,
        };
        updateData(data, d => {
            if (d === "failed") {
                console.log("failed to update");
                alert("Failed : Unable to update data");
                
                setloading(false);
            } else {
                fetchData(data => {
                    if (data === "failed") {
                        console.log("failed to fetch");
                        setloading(false);
                    } else {
                        setdata(data);
                        setloading(false);
                    }
                });
                setupdateId("");
                setemail("");
                setfname("");
                setlname("");
                setdob(
                    `${new Date().getFullYear()}/${
                        new Date().getMonth() + 1
                    }/${new Date().getUTCDate()}`
                );
            }
        });
    };
    useEffect(() => {
        fetchData(data => {
            if (data === "failed") {
                console.log("failed to fetch");
            } else {
                setdata(data);
            }
        });
    }, []);
    return (
        <>
            {loading && (
                <div className="loader">
                    <img src={loaderImg} alt="Please Wait ... " />
                </div>
            )}
            <div className="w-100 d-flex justify-content-around main-container">
                <form
                    className="w-50"
                    onSubmit={!!updateId ? updateEntry : addEntryHandler}
                >
                    <div>
                        <label htmlFor="fname">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="fname"
                            placeholder="Enter first name here"
                            required={true}
                            value={fname}
                            onChange={e => setfname(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="lname">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="lname"
                            placeholder="Enter last name here"
                            required={true}
                            value={lname}
                            onChange={e => setlname(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Enter email here"
                            required={true}
                            value={email}
                            onChange={e => setemail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="dob">Date of birth</label>
                        <input
                            type="date"
                            className="form-control"
                            name="dob"
                            required={true}
                            value={dob}
                            onChange={e => setdob(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="submit"
                            className="btn btn-primary btn-sm"
                            value={!!updateId ? "Update" : "Submit"}
                        />
                    </div>
                </form>
                <div>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Index</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">DOB</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((value, index) => {
                                return (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{value.fname}</td>
                                        <td>{value.lname}</td>
                                        <td>{value.email}</td>
                                        <td>
                                            {new Date(
                                                value.dob
                                            ).toLocaleDateString()}
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    updateEntryHandler(value);
                                                }}
                                                className="btn btn-sm btn-primary"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() =>
                                                    deleteEntryHandler(
                                                        value._id
                                                    )
                                                }
                                                className="btn btn-sm btn-primary"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default MainComponent;
