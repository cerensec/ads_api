import React from 'react';

class FormAds extends React.Component {
    constructor(props) {
        super(props);

        this.fileInput = React.createRef();
    }

    render() { 
        return (  
            <div className='formContainer'>
                <h3>Form Page</h3>
                <form className='addOne' onSubmit={this.props.submit}>
                    <label>Title</label>
                    <input type="text" value={this.props.title} onChange={this.props.titleChange}/>
                    <label>Content</label>
                    <textarea value={this.props.contents} cols="30" rows="10"  onChange={this.props.contentsChange} ></textarea>
                    <label>File</label>
                    <input type="file" id='image'  onChange={this.props.urlChange}/>
                    <button style={{marginTop:"10px"}} >Submit</button>
                </form>
            </div>
        );
    }
}
 
export default FormAds;