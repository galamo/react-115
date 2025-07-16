// index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 2200;

// Enable CORS for all origins
app.use(cors());
app.use(bodyParser.json());

// In-memory data
const users = [];
const sessions = {}; // sessionToken -> username

// Helper: input validation
// function validate(fields, obj) {
//     for (const key of fields) {
//         const v = obj[key];
//         if (typeof v !== "string" || v.trim().length === 0) {
//             return `Field "${key}" is required and must be a non-empty string.`;
//         }
//     }
// }

app.get("/health-check", (req, res) => {
    res.send("Api is running ");
});
// POST /register
app.post("/register", function (req, res) {
    const err = validate(
        ["userName", "password", "firstName", "lastName"],
        req.body
    );
    if (err) return res.status(400).json({ error: err });

    const { userName, password, firstName, lastName } = req.body;

    if (users.some((u) => u.userName === userName)) {
        return res.status(409).json({ error: "Username already exists." });
    }

    users.push({ userName, password, firstName, lastName });
    setTimeout(() => {
        return res.json({ message: "User registered successfully." });
    }, 2000);
});

app.get("/delay", async (req, res, next) => {
    try {
        console.log("test.,..");
        setTimeout(() => {
            return res.json({});
        }, 2000);
    } catch (error) {
        return next(error);
    }
});

app.get("/user-details", async (req, res, next) => {
    res.json({
        username: "na@gmail.com",
        permissions: {
            flights: ["read"],
            cars: ["read"]
        }
    })
});


// POST /login
app.post("/login", (req, res) => {
    const err = validate(["userName", "password"], req.body);
    if (err) return res.status(400).json({ error: err });

    const { userName, password } = req.body;
    const user = users.find(
        (u) => u.userName === userName && u.password === password
    );
    if (!user) {
        return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = crypto.randomBytes(16).toString("hex");
    sessions[token] = userName;

    return res.json({ message: "Login successful.", session: token });
});

// Optional: GET /me (validate session token)
app.get("/me", (req, res) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token || !sessions[token]) {
        return res.status(401).json({ error: "Invalid or missing session token." });
    }
    res.json({ userName: sessions[token] });
});
let data = [
    {
        name: "Toyota Corolla (2022)",
        type: "Sedan",
        price: "$20,425–$28,710",
        image:
            "https://cdn.motortrend.com/uploads/2022/07/2022-toyota-corolla-sedan-feature.jpg",
    },
    {
        name: "Honda Civic (2022)",
        type: "Sedan",
        price: "$21,165–$28,710",
        image:
            "https://cdn.motortrend.com/uploads/2021/10/2022-honda-civic-sedan-lx-touring.jpg",
    },
    {
        name: "Ford F-150 (2023)",
        type: "Truck",
        price: "$35,000",
        image:
            "https://www.ford.com/cmslibs/content/dam/brand_ford/en_us/brand/trucks/f150/2023/collections/dm/23_ford_f150_ld_lunar.jpg",
    },
    {
        name: "Chevrolet Tahoe (2023)",
        type: "SUV",
        price: "$50,000",
        image:
            "https://media.chevrolet.com/content/dam/chevrolet/na/us/english/index/vehicles/2023/suvs/tahoe/mov/01-images/2023-tahoe-gallery-01.jpg",
    },
    {
        name: "Tesla Model 3 (2024)",
        type: "Electric",
        price: "$42,000",
        image: "https://www.tesla.com/ns_videos/model-3-hero-desktop.jpg",
    },
    {
        name: "BMW X5 (2023)",
        type: "SUV",
        price: "$65,000",
        image:
            "https://www.bmwusa.com/content/dam/bmwusa/x5/2023/BMW-MY23-X5-Gallery-Exterior-01.jpg",
    },
    {
        name: "Mazda CX-5 (2023)",
        type: "Crossover",
        price: "$30,000",
        image:
            "https://www.mazdausa.com/siteassets/vehicle-assets/cx-5/2023/gallery/exterior/21CX5GT2-SoulRedCrystalMetallic-00002.jpg",
    },
    {
        name: "Audi A4 (2023)",
        type: "Sedan",
        price: "$47,000",
        image:
            "https://www.audiusa.com/content/dam/nemo/us/models/a4/a4-sedan/my-2023/1920x1080-desktop-hero/a4-desktop-hero-1.jpg",
    },
    {
        name: "Jeep Wrangler (2023)",
        type: "Off-road",
        price: "$38,000",
        image:
            "https://www.jeep.com/content/dam/fca-brands/na/jeep/en_us/2023/wrangler/gallery/exterior/2023-Jeep-Wrangler-Gallery-001.jpg",
    },
    {
        name: "Hyundai Ioniq 5 (2023)",
        type: "Electric",
        price: "$45,000",
        image:
            "https://www.hyundaiusa.com/content/dam/hyundai/us/my2023/ioniq5/gallery/01-exterior/2023-ioniq5-symphony-silver-exterior-01_1920x1080.jpg",
    },
];

const shortRequest = 1000;
const longRequest = 4000;
let random = 0;
app.post("/cars", (req, res) => {
    const { name, type, price, image } = req.body;
    if (!name || !type || !price || !image)
        return res.status(400).send("missing inputs");

    data.push({ name, type, price, image });
    return res.json({ message: "added successfully!" });
});
app.get("/cars", (req, res) => {
    random++;
    const time = random % 2 === 0 ? shortRequest : longRequest;
    const input = req.query.search;
    if (!input) {
        setTimeout(() => {
            return res.json({ data });
        }, time);
    } else {
        setTimeout(() => {
            const d = data.filter((c) =>
                c.name.toLocaleLowerCase().includes(input.toLowerCase())
            );
            return res.json({ data: d });
        }, time);
    }
});

app.get("/sales", (req, res) => {
    const input = req.query.input;
    const data = [
        {
            description: "2018 Toyota Corolla SE - Silver, 1.8L, Automatic",
            price: "$13,500",
            enDate: "2025-06-30",
        },
        {
            description: "2020 Honda Civic LX - Blue, 2.0L, Manual",
            price: "$15,900",
            enDate: "2025-07-15",
        },
        {
            description: "2019 Ford Escape Titanium - White, AWD, 1.5L EcoBoost",
            price: "$18,250",
            enDate: "2025-07-05",
        },
        {
            description: "2021 Mazda CX-5 Touring - Red, 2.5L, Automatic",
            price: "$22,700",
            enDate: "2025-06-28",
        },
        {
            description: "2017 BMW 320i xDrive - Black, Turbocharged, AWD",
            price: "$20,300",
            enDate: "2025-07-01",
        },
    ];
    if (!input) {
        setTimeout(() => {
            res.json({ data });
        }, 2000);
    } else {
        const r = data.filter((s) => {
            const m = getMonthFromDate(s.enDate);
            console.log(m, input);
            if (m == "0" + input) return s;
        });
        res.json({ data: r });
    }
});

function getMonthFromDate(dateStr) {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    return month.toString().padStart(2, "0"); // Ensure 2-digit format
}
// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
