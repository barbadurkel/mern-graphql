import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {

    const [values, setValues] = useState(initialState); 

    // we use the same onChange method for 4 fields, so 'Spread' the existing values before adding the new value
    const onChange = e =>  {
        setValues({...values, [e.target.name]: e.target.value})
    }
    
    const onSubmit = e => {
        e.preventDefault();
        // Callback is different according to page : addUser, addComment...
        callback();
    }
    return {
        onChange, onSubmit, values
    }
}