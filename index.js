const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let lat = 0;
let long = 0;
let satellites = 0
let datetime = ""
let accuracy = ""

const decodeHDOP = (hdopValue) => {
    
    if(hdopValue < 1){
        return "Ideal"
    }
    else if (hdopValue < 2){
        return "Excellent"
    }
    else if (hdopValue < 5){
        return "Good"
    }
    else if (hdopValue < 10){
        return "Moderate"
    }
    else if (hdopValue < 20){
        return "Low"
    }
    else {
        return "Poor"
    }
}


app.listen(8080, () => {
    console.log("Started in port 8080")
})

app.get('/location', (req, res) => {
    res.send(
        "DateTime: " + datetime + "\n" +
        'https://maps.google.com/?q='+lat+","+long
        +"\n Connected satellites: "+satellites
        +"\n Accuracy: " + accuracy
    )
})

app.post('/location', (req, res) => {
    console.log(req);
    lat = req.body.lat
    long = req.body.long
    satellites = req.body.satellites
    accuracy = decodeHDOP(req.body.hdop*0.01)
    //res.send("Latitude: " + lat + "\tLongitude: " + long)
    res.status(200).send()
    console.log("Latitude: " + lat + "\tLongitude: " + long)

    datetime = setDateTime()
})

const setDateTime = () => {
    const date = new Date()
    return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + 
            " - " + (date.getHours()-3) + ":" + date.getMinutes() + ":" + date.getSeconds()

}

