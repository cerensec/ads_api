import React from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return (  
            <div className='formContainer'>
                <h3>Form Page</h3>
                <form className='addOne'>
                    <label>Title</label>
                    <input type="text"/>
                    <label>Content</label>
                    <textarea name="contents" cols="30" rows="10"></textarea>
                    <label>File</label>
                    <input type="file" />
                    <button style={{marginTop:"10px"}} >Submit</button>
                </form>
            </div>
        );
    }
}
 
export default Form;