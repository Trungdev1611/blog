
interface IPropsBtn {
    text: string,
    icon: JSX.Element,
    handleClick: () => void
}
const ButtonBorder = ({text, icon, handleClick}: IPropsBtn) => {
  return (
      <button className='btnborder'
      onClick={handleClick}
      >
        <span>{icon}</span>
        <span className='text-slate-600'>{text}</span>
      </button>
  )
}

export default ButtonBorder
