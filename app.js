const express = require("express");
const cors = require("cors");
const contactsRouter = require("./routes/contact.route");
const ApiError = require("./api-error");


const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.json({ message: "Chao mung den ung dung" });
});

app.use("/api/contacts", contactsRouter);
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
    });
    app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
    });
});


module.exports = app;