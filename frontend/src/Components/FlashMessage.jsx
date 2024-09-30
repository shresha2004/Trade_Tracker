import React,{useEffect,useState} from 'react'

function FlashMessage({message,duration,onClose}){
    useEffect(()=>{
        if(message){
            const timer= setTimeout(()=>{
                onClose();
            },duration);
            return ()=> clearTimeout(timer);
        }
    },[message,duration,onClose]);
    if(!message) return null;

    return(
        <div >{message}</div>
    )
}

export default FlashMessage;