import { useAuth } from "../context/AuthContext";

export default function Chat () {

const { user } = useAuth(); 
return(
    <div>
        Chat page here
    </div>
)
}