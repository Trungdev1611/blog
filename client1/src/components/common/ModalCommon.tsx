import React from "react";
import Modal , { Styles } from "react-modal";
interface IPropsModal {
    children: JSX.Element,
    modalIsOpen: boolean
    handleAfterOpenModal: () => void
    closeModal: () => void,
    styleModal?:Styles
}

const customStyles: Styles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      minWidth: "300px",
      minHeight: "400px"
    },
  };
const ModalCommon = React.memo(({children, modalIsOpen, handleAfterOpenModal, closeModal, styleModal}:IPropsModal) => {
  return (
    <Modal
    isOpen={modalIsOpen}
    onAfterOpen={handleAfterOpenModal}
    onRequestClose={closeModal}
    style={styleModal ?  {...customStyles, ...styleModal}: customStyles }
    contentLabel="Example Modal"
    
  >
    {/* <button onClick={closeModal}>close</button> */}
  {children}
  </Modal>
  )
})


export default (ModalCommon)
