import './SolidButton.css'
const SolidButton =(props)=>{
 
 let{text,signIn} = props
    
return(
    <button onClick={signIn}>
        {text}
    </button>
)




}

export default SolidButton;
