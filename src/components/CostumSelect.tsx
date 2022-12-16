import { useContext, useEffect, useState } from "react";
import { StylesConfig } from "react-select";
import Select from 'react-select/creatable';
import { GlobalContext } from "../context/state";
import {TagOption, TagOptions} from "./../utils/Tags"







export  default () => {

    const themeContext = useContext(GlobalContext);
  let colourStyles  : StylesConfig<TagOption , true>;

    colourStyles = {
      control: (styles, cx) => ({ ...styles }),
      
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
          ...styles,
          position: "relative",
          zIndex:0,
          /* color: isDisabled
            ? '#ccc'
            : isSelected
            ? chroma.contrast(color, 'white') > 2
              ? 'white'
              : 'black'
            : data.color,
          cursor: isDisabled ? 'not-allowed' : 'default', */
    
          /* ':active': {
            ...styles[':active'],
            backgroundColor: !isDisabled
              ? isSelected
                ? data.color
                : color.alpha(0.3).css()
              : undefined,
          }, */
        };
      },
      menuPortal: base => ({ ...base, zIndex: 1, position: "absolute", top: "0", left: "0"}),
      menu: base => ({ ...base, zIndex: 1, position: "absolute", top: "0", left: "0"}),
      container: base => ({ ...base, zIndex: 1, position: "relative", top: "0", left: "0"})
     
    };





    return ( 
      <>
    <Select
      id="long-value-select" instanceId="long-value-select"
                closeMenuOnSelect={false}
                //menuPortalTarget={document.body}
                defaultValue={[TagOptions[0], TagOptions[1]]}
                isMulti
                options={TagOptions}
                

/*                 styles={colourStyles} */
/*                 className="costum-select-container"
                classNamePrefix={"costum-select"} */
                theme={theme => ({...theme,
                  colors:{
                    ...theme.colors,
                    neutral0: themeContext.defaultTheme === "light" ? "white" : "#4d4d4d",
                    neutral5: themeContext.defaultTheme === "light" ? "black" : "white",
                    neutral10: themeContext.defaultTheme === "light" ? "#e6e6e6" : "#666666", // single container background
                    neutral20: themeContext.defaultTheme === "light" ? "black" : "white",
                    neutral30: themeContext.defaultTheme === "light" ? "black" : "white",
                    neutral40: themeContext.defaultTheme === "light" ? "black" : "white",
                    neutral50: themeContext.defaultTheme === "light" ? "black" : "white",
                    neutral60: themeContext.defaultTheme === "light" ? "black" : "white",
                    neutral70: themeContext.defaultTheme === "light" ? "black" : "white",
                    neutral80: themeContext.defaultTheme === "light" ? "black" : "white",
                    neutral90: themeContext.defaultTheme === "light" ? "black" : "white",
                    
                    primary25: themeContext.defaultTheme === "light" ? "black" : "white",
                    primary50: themeContext.defaultTheme === "light" ? "black" : "white",
                    primary: themeContext.defaultTheme === "light" ? "black" : "white",
                    primary75: themeContext.defaultTheme === "light" ? "black" : "white",
                    primary90: themeContext.defaultTheme === "light" ? "black" : "white",
                    primary95: themeContext.defaultTheme === "light" ? "black" : "white",
                  },
                  borderRadius: 0,
                  spacing: {
                    baseUnit: 4,
                    controlHeight: 50,
                    menuGutter: 0,
                  }
              })}

                placeholder="Select Tags for this blog..." 
      />
      </>
      )

    };