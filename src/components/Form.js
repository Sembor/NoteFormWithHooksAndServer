import React, {useEffect, useState} from 'react'


export const NoteForm = (props) => {
    const [value, setValue] = useState('')

    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);

    const handleChange = (event) => {
        setValue(event.target.value)
        //this.setState({value: event.target.value});
    }

   const  handleSubmit = (event) => {
        alert('A name was submitted: ' + value);
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={value} onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}

