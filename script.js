/*
    Discover New Music
    A simple Spotify application to search for similar bands and artists.
    ---
    Files: "/server.js", "/public/script.js", "/public/style.css" & "/views/index.ejs"
    Used: HTML, JavaScript, CSS & Node.JS
    ---
    Heikki Kullas (c) 2019
*/

function f_initialize() {
    const colors = [
        [
            "rgb(200, 100, 100)",
            "rgba(200, 100, 100, 0.5)",
            "rgb(100, 50, 50)",
            "rgba(100, 50, 50, 0.5)"
        ],
        [
            "rgb(100, 200, 100)",
            "rgba(100, 200, 100, 0.5)",
            "rgb(50, 100, 50)",
            "rgba(50, 100, 50, 0.5)"
        ],
        [
            "rgb(100, 100, 200)",
            "rgba(100, 100, 200, 0.5)",
            "rgb(50, 50, 100)",
            "rgba(50, 50, 100, 0.5)"
        ],
        [
            "rgb(200, 200, 100)",
            "rgba(200, 200, 100, 0.5)",
            "rgb(100, 100, 50)",
            "rgba(100, 100, 50, 0.5)"
        ],
        [
            "rgb(200, 100, 200)",
            "rgba(200, 100, 200, 0.5)",
            "rgb(100, 50, 100)",
            "rgba(100, 50, 100, 0.5)"
        ],
        [
            "rgb(100, 200, 200)",
            "rgba(100, 200, 200, 0.5)",
            "rgb(50, 100, 100)",
            "rgba(50, 100, 100, 0.5)"
        ]
    ];

    const color = Math.floor(Math.random() * colors.length);
    const list = document.querySelectorAll(".list");
    const similar = document.querySelectorAll(".similar");
    const spotify = document.querySelectorAll(".spotify");
    
    let selected_id = "";

    document.body.style.setProperty("--theme-color", colors[color][0]);
    document.body.style.setProperty("--theme-color-o", colors[color][1]);
    document.body.style.setProperty("--sub-color", colors[color][2]);
    document.body.style.setProperty("--sub-color-o", colors[color][3]);

    list.forEach((el, i) => {
        el.addEventListener("mouseleave", () => {
            list[i].style.border = "4px solid var(--border-color)";
            list[i].children[0].style.visibility = "hidden";
            list[i].children[1].children[0].style.color = "var(--background-color-o)";
            selected_id = "";
        });

        el.addEventListener("mouseenter", () => {
            selected_id = list[i].id;
        });
        
        el.addEventListener("mouseover", () => {
            /*
                'mouseover' event triggers all the time when the 'mouseover'
                happens again after coming back from the top of other
                elements which are inside the main list element.
            */
            if(selected_id != list[i].id) {
                list[i].style.border = "4px solid var(--theme-color)";
                list[i].children[0].style.visibility = "visible";
                list[i].children[1].children[0].style.color = "var(--theme-color-o)";
            };
        });
    });

    spotify.forEach((el, i) => {
        el.addEventListener("click", (e) => {
            window.open(spotify[i].id, "_self");
        });
    });

    similar.forEach((el, i) => {
        el.addEventListener("click", (e) => {
            fetch(`/similar?id=${similar[i].id}`, { method: "POST" })
            .then((res) => {
                window.location.reload(true);
            })
            .catch((err) => {
                console.log(err);
            });
        });
    });
}
