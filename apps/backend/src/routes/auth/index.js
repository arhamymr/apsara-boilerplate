"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hono_1 = require("hono");
var app = new hono_1.Hono();
app.get("/verify", function (c) {
    return c.json({ message: "Auth verification endpoint" });
});
app.post("/refresh", function (c) {
    return c.json({ message: "Token refresh endpoint" });
});
app.post("/logout", function (c) {
    return c.json({ message: "Logout endpoint" });
});
exports.default = app;
