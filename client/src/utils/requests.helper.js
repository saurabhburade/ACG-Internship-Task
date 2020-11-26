import Axios from "axios";

export const addData = (data,cb) => {
    Axios.post("/acg/api/add", data, {
        headers: {
            "Content-type": "application/json",
        },
    })
        .then(res => {
           cb("success")
        })
        .catch(err => {
            console.log(err);
           cb("failed");
        });
};
export const fetchData = ( cb) => {
    Axios.get("/acg/api/fetch", {
        headers: {
            "Content-type": "application/json",
        },
    })
        .then(res => {
            cb(res.data);
        })
        .catch(err => {
            console.log(err);
            cb("failed");
        });
};
export const deleteData = (_id, cb) => {
    Axios.delete("/acg/api/delete", {
        headers: {
            "Content-type": "application/json",
            _id
        },
    })
        .then(res => {
            cb("success");
        })
        .catch(err => {
            console.log(err);
            cb("failed");
        });
};

export const updateData = (data, cb) => {
    Axios.put("/acg/api/update", data, {
        headers: {
            "Content-type": "application/json",
        },
    })
        .then(res => {
            cb("success");
        })
        .catch(err => {
            console.log(err);
            cb("failed");
        });
};
