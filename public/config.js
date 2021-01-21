window["config"] = {
    "API_URL": "http://localhost:5000/" 
}

const getURL = () => {
    if(process.env === "production") {
        return "http://foodapiback-env.eba-ymfgjehm.us-west-2.elasticbeanstalk.com/"
    } else {
        return "http://localhost:5000/" 
    }
}


