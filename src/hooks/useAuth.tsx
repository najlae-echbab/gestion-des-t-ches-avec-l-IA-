import {useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import authService from '@/services/authService';
 interface loginCrendentials {
    username: string;
    password: string;
 }

const useAuth = () => {

    const navigate = useNavigate();
    const loginMutation =useMutation({
        mutationFn: (credentials: loginCrendentials) => authService.login(credentials),
        onSuccess: (data) => {
            localStorage.setItem("jwt", data.token);// Sauvegarde du token JWT
            navigate("/Home");
        },
        onError: (error) => {
            console.error("Authentication failed:", error);
            
        },
        

    });
    return {loginMutation};

  
};
export default useAuth;