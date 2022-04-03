


import { useState } from "react";
import{useNavigate} from "react-router-dom"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const firestore = firebase.firestore();

let funnyNames = ["shaquille.oatmeal","real_name_hidden","hairypoppins","fedora_the_explorer","op_rah","yellowsnowman","joenotexotic","username_copied","whos_ur_buddha","unfinished_sentenc","allgoodnamesrgone","hanging_with_my_gnomies","something","me_for_president","tinfoilhat","oprahwindfury","anonymouse","definitely_not_an_athlete","heartticker","yesimfunny","benafleckisanokactor","magicschoolbusdropout","hoosier-daddy","everybody","regina_phalange","pawneegoddess","pluralizes_everythings","chickenriceandbeans","test_name_please_ignore","iyellalot","heyyou","laugh_till_u_pee","adistraction","fast_and_the_curious","crazy_cat_lady","banana_hammock","thegodfatherpart4","unfriendme","babydoodles","fluffycookie","buh-buh-bacon","ashley_said_what","lactosetheintolerant","maneatspants","averagestudent","twentyfourhourpharmacy","applebottomjeans","babushka","toastedbagelwithcreamcheese","baeconandeggz","fartinlutherking","coolshirtbra","kentuckycriedfricken","reverandtoast","kim_chi","badkarma","idrinkchocolatemilk","saintbroseph","chin_chillin","ghostfacegangsta","bigfootisreal","santas_number1_elf","thehornoftheunicorn","ineed2p","abductedbyaliens","google_was_my_idea","actuallynotchrishemsworth","nachocheesefries","personallyvictimizedbyreginageorge","just-a-harmless-potato","frostedcupcake","avocadorable","fatbatman","quailandduckeggs","paninihead","mandymooressingingvoice","cute.as.ducks","catsordogs","fartnroses","redmonkeybutt","freddymercuryscat","casanova"]
const PublicProfile = ()=>{


let [name,setName]=useState("");
let [sm,setSm] = useState("");


let navigate = useNavigate()



const randNameGen = (arr)=>{

    let random  = Math.floor(Math.random()*arr.length)
    return arr[random]
}

const submitDetails = (e)=>{
    e.preventDefault()
    let userId = localStorage.getItem("userId"); 

    console.log(userId)
    if(firestore && userId){
        
        
         
        
        let randomName = randNameGen(funnyNames)
        console.log(randomName)
        
        firestore.collection('users').doc(userId).set({
            random_name:randomName,
        })
        firestore.collection('user_identity').doc(userId).set({
            name:name,
            social_media:sm,
            user_registered:true,
            random_name:randomName,
            location:[0,0],
            inChat:false
        }).then(()=>{
           
            navigate('/chat')
        }).catch(()=>console.log("encountered an error"))
        

    }
    


}
return(

<main>
<h1>Who are you really?</h1>
<form>

    <label>
    <p>Full Name</p>
    <input name="name" onChange={(e)=>setName(e.target.value)} />
    </label>


    <label>
    <p>Social Media Handle</p>
    <input name="sm" onChange={(e)=>setSm(e.target.value)} />
    </label>

</form>
<button onClick={submitDetails}>{"Bantah!"}</button>
</main>

)




}

export default PublicProfile;