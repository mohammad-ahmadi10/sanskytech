import { IconType } from "react-icons";
import styles from "@/styles/EditorTools.module.scss";
import { memo, StrictMode, useEffect } from "react";

interface EditorIconType {
    Icon: IconType;
    onIcon: () => void;
    shouldDisable?: boolean;
    event?: boolean;

}

const EditorIcon =  memo( ({ Icon, onIcon, shouldDisable, event }: EditorIconType) => {

    useEffect(() => {
        if(event !== undefined && event){
            onIcon();
        }
    }, [event]);


    return    <StrictMode>

    
    <div onClick={e => {e.preventDefault(); onIcon()}}>
              <Icon  className={(shouldDisable && shouldDisable===true ) ? 'fill-black/30' : 'fill-black/60'}/>
      </div>
    </StrictMode>
});


export default EditorIcon;



