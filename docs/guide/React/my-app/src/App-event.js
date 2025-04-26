import React from "react";
const AppForm = () => {
    const handlerSubmit = (event) => {
        event.preventDefault();
        console.log('form was submitted')
    }
    return (
        <form onSubmit={handlerSubmit}>
            <div>
                <label htmlFor="username">username</label>
                <input type="text" id="username" name="username" />
            </div>
            <div>
                <label htmlFor="email">email</label>
                <input type="email" id="email" name="email" />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default AppForm;