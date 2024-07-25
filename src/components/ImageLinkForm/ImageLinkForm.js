import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onImageSubmit }) => {
    return (
        <div>
            <p className="f3 white">
                {'Enter an image URL to detect faces.'}
            </p>
            <div className="center">
                <div className="form center pa4 br3" style={{ backgroundColor: 'rgb(54, 39, 123)'}}>
                    <input className="f4 pa2 w-70 center" type="text" onChange={onInputChange} placeholder="Enter url" />
                    <button
                        className="bn-l w-30 grow f4 link ph3 pv2 dib white bg-purple b--none"
                        onClick={onImageSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;