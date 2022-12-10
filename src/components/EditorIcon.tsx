import { IconType } from "react-icons";
import styles from "@/styles/EditorTools.module.scss";
import { memo, StrictMode, useEffect } from "react";

interface EditorIconType {
    Icon: IconType;
    onIcon?: () => void;
    shouldDisable?: boolean;
    event?: boolean;
    styles?: string;

}

const EditorIcon =  memo( ({ Icon, onIcon, shouldDisable, event , styles}: EditorIconType) => {

    /* useEffect(() => {
        if(event !== undefined && event){
            onIcon();
        }
    }, [event]); */


    return (
        <div className={`m-1 my-0 ${styles}`} onClick={e => {e.preventDefault(); if(onIcon) onIcon()}}
        >
                  <Icon  className={(shouldDisable && shouldDisable===true ) ? 'fill-black/30 ' : 'fill-black/60 cursor-pointer pointer-events-none'}/>
          </div>
        )
});


export default EditorIcon;



