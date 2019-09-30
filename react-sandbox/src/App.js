import React, { useState, useEffect} from "react";

import styled from "styled-components";

const Frame = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: rgba(0,0,0,.5);
  color: #fff;

  overflow-y: auto;

  &::-webkit-scrollbar {
   display: none;
  }

  display: flex;
  justify-content: center;
  align-items: start;

  * {
     font-family: "Proxima Nova":
  }
`

const Modal = styled.div`
  background-color: #fff;
  color: #191919;
  width: 600px;
  border-radius: 2px;
  
  min-height: calc(300px + 99px + 83px);
  max-height: calc(100% - 64px);
  margin: 32px 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 5px 15px 0px rgba(0,0,0, .0);
`

const ModalHeader = styled.div`
  border-bottom: 1px solid #e5e5e5;
  padding: 24px;
  display: flex;
  justify-content: stretch;

  h1 {
    font-size: 20px;
    margin: 0;
    line-height: 24px;
    margin-bottom: 8px;
  }
  p {
    font-size: 16px;
    line-height: 18px;
    margin: 0;
  }

  div:first-child {
    flex-grow: 1;
  }
  .close {
    width: 16px;
    height: 24px;
    display: flex;
    align-items: center;

    svg g path {
      fill: "#757575";
    }

    :hover svg g path {
      fill: red;
    }
  }
`;

const ModalBodyRoot = styled.div`
  padding: 24px;
  flex-grow: 1;

  overflow-y: auto;

  p {
   line-height: 1.3;

   &:first-child {
        margin-top: 0;
     }
   &:last-child {
      margin-bottom: 0;
   }
  }

  ${props => props.showInset && ` 
   box-shadow: inset 0 0px 4px 2px rgba(0,0,0,.3);
  `}
`;

const ModalBody = props => {
   const [modalBodyHeight, setModalBodyHeight] = useState();
   const [screenHeight, setScreenHeight] = useState()
   const [showInset, setShowInset] = useState()

   useEffect( () => {
      const updateHeights = newScreenSize => {
         setScreenHeight(newScreenSize)
         setModalBodyHeight(/* set height? */)
         setShowInset(modalBodyHeight > (screenHeight - 99 - 83))
      }

      window.addEventListener('resize', updateHeights)
      return () => window.removeEventListener('resize', updateHeights)

   }, [])

   //.scrollHeight > this.height();
   

  //  ref.scrollHeight > ref.height();
   
   return (
      <ModalBodyRoot showInset={showInset}>
         {props.children}
      </ModalBodyRoot>
   )
}

const ModalFooter = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: end;
  align-items: center;
  align-content: center;

  height: 83px;
  flex-shrink: 0;
  border-top: 1px solid #e5e5e5;
  padding: 0 24px;
`;

const Button = styled.button`
  height: 34px;
  font-size: 16px;
  padding: 0 12px;
  background-color: #f57c00;
  border-radius: 2px;
  color: #fff;
  font-weight: 700;

  display: flex;
  justify-content: center;
  align-items: center;

  * {
    margin: 0;
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
   return (
      <Frame>
        <Modal>
          <ModalHeader>
            <div>
              <h1>Title!</h1>
              <p>This is a subheader</p>
            </div>
            <div className="close">
              <svg width="16px" height="16px" viewBox="0 0 512 512">
                <g stroke="none">
                  <path d="M275.098898,254.9808 L367.279762,347.161664 L445.256062,425.137964 C450.247979,430.155481 450.247979,438.244946 445.256062,443.236863 C442.747304,445.745621 439.470559,447 436.193813,447 C432.917068,447 429.640323,445.745621 427.157164,443.236863 L257,273.079699 L86.842836,443.236863 C84.3596773,445.745621 81.082932,447 77.8061866,447 C74.5294412,447 71.2526958,445.745621 68.7439376,443.236863 C63.7520208,438.244946 63.7520208,430.155481 68.7439376,425.137964 L146.720238,347.161664 L238.901102,254.9808 L68.7631373,84.842836 C63.7456209,79.8509192 63.7456209,71.761454 68.7631373,66.7439376 C73.7550541,61.7520208 81.8445193,61.7520208 86.8620356,66.7439376 L153.164931,133.046833 L257,236.881902 L360.835069,133.046833 L427.137964,66.7439376 C432.155481,61.7520208 440.244946,61.7520208 445.236863,66.7439376 C450.254379,71.761454 450.254379,79.8509192 445.236863,84.842836 L275.098898,254.9808 Z"></path>
                </g>
              </svg>
            </div>
          </ModalHeader>
          <ModalBody>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Nullam
              vehicula ipsum a arcu cursus vitae congue mauris. Scelerisque
              varius morbi enim nunc faucibus. Duis at tellus at urna. Enim ut
              sem viverra aliquet eget sit amet tellus cras. Vitae elementum
              curabitur vitae nunc sed velit. Molestie ac feugiat sed lectus.
              Mattis nunc sed blandit libero volutpat sed. Sed sed risus pretium
              quam vulputate dignissim suspendisse in. Convallis posuere morbi
              leo urna molestie. Cras semper auctor neque vitae tempus quam
              pellentesque. Volutpat diam ut venenatis tellus in metus vulputate
              eu. Tellus in metus vulputate eu scelerisque felis. Pellentesque
              dignissim enim sit amet venenatis. Lobortis mattis aliquam
              faucibus purus in massa. Elit sed vulputate mi sit amet mauris
              commodo. Nisi porta lorem mollis aliquam.
            </p>
            <p>
              Faucibus nisl tincidunt eget nullam non nisi est sit amet. Etiam
              sit amet nisl purus in. Morbi tristique senectus et netus et
              malesuada fames ac. Rhoncus mattis rhoncus urna neque. Lacinia
              quis vel eros donec ac odio tempor. Purus semper eget duis at
              tellus at urna. Id cursus metus aliquam eleifend mi in nulla
              posuere sollicitudin. Cras adipiscing enim eu turpis. Dictumst
              quisque sagittis purus sit amet volutpat consequat. Vulputate mi
              sit amet mauris commodo.
            </p>
            <p>
              Nisl purus in mollis nunc sed id. Leo integer malesuada nunc vel
              risus commodo viverra. Nibh venenatis cras sed felis eget. In
              fermentum et sollicitudin ac orci phasellus egestas. Viverra
              accumsan in nisl nisi scelerisque eu ultrices vitae. Suspendisse
              interdum consectetur libero id faucibus nisl. Augue eget arcu
              dictum varius duis at. Nunc eget lorem dolor sed viverra ipsum. A
              scelerisque purus semper eget duis. Viverra nibh cras pulvinar
              mattis nunc sed blandit libero. Diam sit amet nisl suscipit
              adipiscing bibendum. Eget sit amet tellus cras. Auctor augue
              mauris augue neque. Interdum velit euismod in pellentesque. Sed
              tempus urna et pharetra pharetra. Luctus accumsan tortor posuere
              ac ut consequat semper viverra nam. Volutpat est velit egestas dui
              id ornare arcu. Purus gravida quis blandit turpis cursus in hac
              habitasse platea. Nulla malesuada pellentesque elit eget gravida
              cum. Pretium nibh ipsum consequat nisl vel pretium lectus.
            </p>
            <p>
              Aliquam faucibus purus in massa tempor nec feugiat nisl. Aliquet
              bibendum enim facilisis gravida neque convallis a cras semper.
              Vulputate sapien nec sagittis aliquam malesuada bibendum arcu
              vitae elementum. Cras fermentum odio eu feugiat pretium. Aliquam
              malesuada bibendum arcu vitae elementum. Tincidunt dui ut ornare
              lectus. Orci dapibus ultrices in iaculis nunc sed augue lacus
              viverra. Eget magna fermentum iaculis eu non diam. Egestas sed
              tempus urna et pharetra. Eu facilisis sed odio morbi quis commodo
              odio aenean. Neque convallis a cras semper auctor neque vitae
              tempus quam. Odio tempor orci dapibus ultrices in iaculis nunc.
              Nunc non blandit massa enim nec dui. Dictum at tempor commodo
              ullamcorper a. Arcu risus quis varius quam quisque id diam vel
              quam.
            </p>
            <p>
              Elementum pulvinar etiam non quam lacus suspendisse. Gravida
              dictum fusce ut placerat orci nulla. Et egestas quis ipsum
              suspendisse ultrices. Et sollicitudin ac orci phasellus egestas
              tellus rutrum tellus pellentesque. Cursus eget nunc scelerisque
              viverra mauris in. Laoreet sit amet cursus sit amet dictum.
              Faucibus purus in massa tempor. Integer eget aliquet nibh praesent
              tristique magna sit. Mi eget mauris pharetra et. Vitae suscipit
              tellus mauris a diam maecenas sed. Nullam eget felis eget nunc.
              Amet venenatis urna cursus eget nunc scelerisque viverra mauris
              in. Imperdiet massa tincidunt nunc pulvinar sapien et ligula.
              Suspendisse sed nisi lacus sed viverra tellus in. Egestas tellus
              rutrum tellus pellentesque eu. Rhoncus urna neque viverra justo
              nec ultrices dui. Elit ut aliquam purus sit amet. Quis hendrerit
              dolor magna eget est lorem ipsum dolor sit.
            </p>
            <p>
              Aliquam faucibus purus in massa tempor nec feugiat nisl. Aliquet
              bibendum enim facilisis gravida neque convallis a cras semper.
              Vulputate sapien nec sagittis aliquam malesuada bibendum arcu
              vitae elementum. Cras fermentum odio eu feugiat pretium. Aliquam
              malesuada bibendum arcu vitae elementum. Tincidunt dui ut ornare
              lectus. Orci dapibus ultrices in iaculis nunc sed augue lacus
              viverra. Eget magna fermentum iaculis eu non diam. Egestas sed
              tempus urna et pharetra. Eu facilisis sed odio morbi quis commodo
              odio aenean. Neque convallis a cras semper auctor neque vitae
              tempus quam. Odio tempor orci dapibus ultrices in iaculis nunc.
              Nunc non blandit massa enim nec dui. Dictum at tempor commodo
              ullamcorper a. Arcu risus quis varius quam quisque id diam vel
              quam.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button>Continue</Button>
          </ModalFooter>
        </Modal>
      </Frame>
    );
  }
}

export default App;

// document.documentElement.clientHeight
