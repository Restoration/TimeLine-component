import React, { useState, useReducer, createContext, useContext } from 'react';
import styled from 'styled-components';

type StateType = {
  isModal: boolean;
  fromTime: string;
  endTime: string;
  separate: 'half' | 'quote' | 'hour';
  colors: string[];
}


type ActionType = {
    type : 'OPEN'| 'CLOSE' | 'DRAG'|'DROP'
}

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "OPEN":
        return { isModal: true };
    case "CLOSE":
        return { isModal: false };
    case "DRAG":
        return { isModal: true };
    case "DROP":
        return { isModal: false };
  }
}

interface StoreContextProps {
  state: StateType,
  dispatch: ({type}: ActionType) => void;
}

const StoreContext = createContext({} as StoreContextProps);

interface StoreProviderProps {
  children: JSX.Element | JSX.Element[];
  separate?: 'half' | 'quote' | 'hour';
  colors?: string[];
}

const StoreProvider: React.FC<StoreProviderProps> = (props: StoreProviderProps): JSX.Element => {
  const {children, colors, separate} = props;
  const initialState: StateType = {
    isModal: false,
    fromTime: '',
    endTime: '',
    separate: separate ? separate : 'hour',
    colors: (colors && colors.length > 0)? colors : ['#96E8BF','#EB7AB0','#FFFB92','#67DAEE'],
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
}

const useCountContext = () => useContext(StoreContext);



const RenderTimeLine: React.FC = (): JSX.Element => {
  const { state, dispatch } = useCountContext();

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
    for(let i=0; i < 24; i++){
      items.push(<TimeLineItem key={`${i}-00`} data-info={`${i}-00`}>{`${i}:00`}</TimeLineItem>);
      if(state.separate === 'half'){
        items.push(<TimeLineItem key={`${i}-30`} data-info={`${i}-30`}>{`${i}:30`}</TimeLineItem>);
      }
      if(state.separate === 'quote'){
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
    <TimeLineList onClick={(e)=>{
      e.preventDefault();
      dispatch({ type: 'OPEN' });
    }}>
        <RenderTimeLine />
    </TimeLineList>
  );
}


const RenderModalWindow: React.FC = (): JSX.Element => {
  const { state, dispatch } = useCountContext();

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

  const RenderColorSelect = (): JSX.Element => {
    return (
      <select>
        <option>Select Task Color</option>
          {state.colors.map((color: string)=>{
            return<option key={color} value={color}>{color}</option>;
          })}
      </select>
    );
  }

  const ModalWindow = (): JSX.Element => {
    return (
      <ModalWindowElement>
        <RenderColorSelect />
      </ModalWindowElement>
    );
  }


  return (
    <>
      {state.isModal &&
        <>
        <OverLay onClick={(e)=>{
          e.preventDefault();
          dispatch({ type: 'CLOSE' });
          }}
        />
          <ModalWindow />
        </>
      }
    </>
  )
}

interface TimeLineProps extends StoreProviderProps{
}

const TimeLine: React.FC<TimeLineProps> = (props: TimeLineProps): JSX.Element => {
  return(
    <StoreProvider
      colors={props.colors}
      separate={props.separate}
    >
      <RenderModalWindow />
      <RenderTimeLine />
    </StoreProvider>
  );
}

export default TimeLine;
