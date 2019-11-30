import React, { useState } from 'react';
import styled from 'styled-components';


interface TimeLineProps {
  separate?: 'half' | 'quote';
  //ampm?: boolean;
  colors?: string[];
}

const TimeLine: React.FC<TimeLineProps> = (props: TimeLineProps): JSX.Element => {

  const [currentColor, setCurrentColor] = useState<string>("");

  const { separate, colors } = props;

  const TimeLineList = styled.ul`
    list-style-type: none;
  `;
  const TimeLineItem = styled.li`
    &:first-child {
      border-top: solid 1px #dddddd;
    }
    min-height: 50px;
    border-bottom: solid 1px #dddddd;
    text-align: left;
  `;

  const RenderColorSelect = (): JSX.Element => {
    const defaultColors = ['#96E8BF','#EB7AB0','#FFFB92','#67DAEE'];
    const colorArray = (colors && colors.length > 0)? colors : defaultColors;
    return (
      <select onChange={(e)=>setCurrentColor(e.target.value)}>
        <option>Select Task Color</option>
          {colorArray.map((color: string)=>{
            return<option key={color} value={color}>{color}</option>;
          })}
      </select>
    );
  }

  const RenderTimeLine = (): any => {
    const items: JSX.Element[] = [];
    for(let i=0; i < 24; i++){
      items.push(<TimeLineItem key={`${i}-00`} data-info={`${i}-00`}>{`${i}:00`}</TimeLineItem>);
      if(separate === 'half'){
        items.push(<TimeLineItem key={`${i}-30`} data-info={`${i}-30`}>{`${i}:30`}</TimeLineItem>);
      }
      if(separate === 'quote'){
        items.push(<TimeLineItem key={`${i}-15`} data-info={`${i}-15`}>{`${i}:15`}</TimeLineItem>);
        items.push(<TimeLineItem key={`${i}-30`} data-info={`${i}-30`}>{`${i}:30`}</TimeLineItem>);
        items.push(<TimeLineItem key={`${i}-45`} data-info={`${i}-45`}>{`${i}:45`}</TimeLineItem>);
      }
    }
    return items.map((item) => {
      return item;
    })
  }

  return (
    <>
      <RenderColorSelect />
      <TimeLineList>
        <RenderTimeLine />
      </TimeLineList>
    </>
  );
}

export default TimeLine;
