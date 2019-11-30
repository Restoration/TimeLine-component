import React, { useState } from 'react';
import styled from 'styled-components';


interface TimeLineProps {
  separate?: 'half' | 'quote';
  //ampm?: boolean;
  colors?: string[];
}

const TimeLine: React.FC<TimeLineProps> = (props: TimeLineProps): JSX.Element => {
  const [currentColor, setCurrentColor] = useState<string>("");
  const [isModal, setIsModal] = useState<boolean>(false);

  const { separate, colors } = props;

  const OverLay = styled.div`
    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 100;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0, 0.6);
  `;

  const ModalWindowElement = styled.div`
  position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    -webkit-transform: translateY(-50%) translateX(-50%);
    z-index: 1000;
    padding: 120px;
    width: 50%;
    height: 50%;
    background: #ffffff;
  `;


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

  const ModalWindow = (): JSX.Element => {
    return (
      <ModalWindowElement>
        <RenderColorSelect />
      </ModalWindowElement>
    );
  }



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
    {isModal &&
      <>
        <OverLay onClick={()=>{setIsModal(false)}} />
        <ModalWindow />
      </>
    }
    <TimeLineList onClick={()=>{setIsModal(true)}}>
        <RenderTimeLine />
      </TimeLineList>
    </>
  );
}

export default TimeLine;
