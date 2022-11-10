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
            console.log(onIcon);
        }
    }, [event]);


    return    <StrictMode>

    
    <div className={`${(shouldDisable===true) ? styles.disableIcon  : styles.icon }`} onClick={_ => onIcon()}>
              <Icon/>
      </div>
    </StrictMode>
});


export default EditorIcon;