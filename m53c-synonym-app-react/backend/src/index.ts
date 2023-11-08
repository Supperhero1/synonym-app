require('dotenv').config()
import app from "./expressApp";
import environment from "../config/environment";

app.listen(environment.PORT, () => {
    console.log(`Server listening on port ${environment.PORT}`)
})
