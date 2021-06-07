db.createUser(
    {
        user: "User",
        pwd: "Password",
        roles: [
            {
                role: "readWrite",
                db: "database"
            }
        ]
    }
)
