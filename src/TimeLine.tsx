import React from 'react';
import styled from 'styled-components';


type SeparateType = 'hour' | 'half' | 'quote';

interface TimeLineProps {
  separate?: SeparateType;
  //ampm?: boolean;
}


const TimeLine: React.FC<TimeLineProps> = (props: TimeLineProps): JSX.Element => {

  const { separate } = props;

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

  const RenderTimeLine = (): any => {
    const items: JSX.Element[] = [];
    const separeteTime: SeparateType = separate ? separate : 'hour';
    for(let i=0; i < 24; i++){
      items.push(<TimeLineItem key={`${i}-00`}>{`${i}:00`}</TimeLineItem>);
      switch(separeteTime){
          case 'half':
            items.push(<TimeLineItem key={`${i}-30`}>{`${i}:30`}</TimeLineItem>);
          break;
          case 'quote':
            items.push(<TimeLineItem key={`${i}-15`}>{`${i}:15`}</TimeLineItem>);
            items.push(<TimeLineItem key={`${i}-30`}>{`${i}:30`}</TimeLineItem>);
            items.push(<TimeLineItem key={`${i}-45`}>{`${i}:45`}</TimeLineItem>);
          break;
      }
    }
    return items.map((item) => {
      return item;
    })
  }

  return (
    <TimeLineList>
      <RenderTimeLine />
    </TimeLineList>
  );
}

export default TimeLine;
