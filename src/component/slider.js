import Slider from 'react-rangeslider';
import React  from 'react';
export const InputSlider = ({min,max,value,orientaton,onChange,labels})=>{
    return(       
        <Slider
            min={min}
            max={max}
            value={value}
            onChange={onChange}
            orientation={orientaton}
            labels={labels}
          />
    );
}