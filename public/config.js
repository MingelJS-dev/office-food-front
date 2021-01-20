window["config"] = {
    "API_URL": "http://localhost:5000/" 
}

const getURL = () => {
    if(process.env === "production") {
        return 
    } else {
        return "http://localhost:5000/" 
    }
}


