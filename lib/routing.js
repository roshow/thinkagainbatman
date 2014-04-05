module.exports = {
    port: 5000,
    routes: [
        {
            path: "/public",
            public: true
        },
        {
            path: "/",
            method: "get",
            action: "index"
        },
        {
            path: "*",
            method: "get",
            action: "defaultAction"
        }
    ]
};