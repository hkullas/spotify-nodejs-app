/*
    Discover New Music
    A simple Spotify application to search for similar bands and artists.
    ---
    Files: "/server.js", "/public/script.js", "/public/style.css" & "/views/index.ejs"
    Used: HTML, JavaScript, CSS & Node.JS
    ---
    Heikki Kullas (c) 2019
*/

const express = require("express");

const app = express();
const async = require("async");
const bodyParser = require("body-parser");
const request = require("request");

let _data;

/*
    Do NOT share these with anyone. If compromised, get another one!
*/
const client_id = "[CLIENT_ID]";
const client_secret = "[CLIENT_SECRET]";

const PORT = 5000;
const auth_ops = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
        "Authorization": "Basic " + (new Buffer.from(client_id + ":" + client_secret).toString("base64"))
    },
    form: {
        grant_type: "client_credentials"
    },
    json: true
}

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        data: _data
    });
});

app.post("/search", (req, res) => {
    async.parallel({
        one: (callback) => {
            request.post(auth_ops, (err, res, body) => {
                if (!err && res.statusCode === 200) {
                    const query = req.body.search === "" ? "year:0000-9999" : req.body.search;
                    const ops = {
                        url: `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=50`,
                        headers: {
                            "Authorization": "Bearer " + body.access_token
                        },
                        json: true
                    }
        
                    request.get(ops, (err, res, body) => {
                        _data = body.artists.items;
                        callback(null, 1);
                    });
                }
            });
        }
    },
    
    (err, _res) => {    
        res.redirect("/");
    });
});

app.post("/similar", (req, res) => {
    async.parallel({
        one: (callback) => {
            request.post(auth_ops, (err, res, body) => {
                if (!err && res.statusCode === 200) {
                    const ops = {
                        url: `https://api.spotify.com/v1/artists/${req.query.id}/related-artists?limit=50`,
                        headers: {
                            "Authorization": "Bearer " + body.access_token
                        },
                        json: true
                    }

                    request.get(ops, (err, res, body) => {
                        _data = body.artists;
                        callback(null, 1);
                    });
                }
            });
        }
    },
    
    (err, _res) => {
        res.redirect("/");
    });
});

console.log("Listening to port", PORT);
app.listen(PORT);
