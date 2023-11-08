require('dotenv').config()
import app from "./expressApp";
import environment from "../config/environment";

app.listen(environment.PORT, () => {
    console.log(`Example app listening on port ${environment.PORT}`)
})
