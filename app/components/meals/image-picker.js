'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import classes from './image-picker.module.css';

export default function ImagePicker({label,name}) {
    const [pickedImage,setPickedImage] = useState();

    const imageInputRef = useRef();

    function handlePickClick() {
        imageInputRef.current.click();
    }

    function handleImageChange(event) {
        const file = event.target.files[0];

        if(!file) {
            setPickedImage(null);
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }

    return (
        <div className={classes.picker}>
            <label htmlFor="image">{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked yet</p>}
                    {pickedImage && <Image src={pickedImage} alt="The image selected by the user" fill/>}
                </div>
                <input 
                    className={classes.input}
                    type="file" 
                    id="image" 
                    accept="image/png, image/jpeg" 
                    name={name}
                    ref={imageInputRef}
                    onChange={handleImageChange}
                />
                <button className={classes.button} type="button" onClick={handlePickClick}>
                    Pick An Image
                </button>
            </div>
        </div>)
}