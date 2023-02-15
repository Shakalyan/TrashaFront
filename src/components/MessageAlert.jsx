import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function MessageAlert() {

    let messageAlert = useSelector((state) => state.alertMessage);
    
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);        
        }, 2500);
    }, [messageAlert]);

    if (!isVisible)
        return null;

    let color = (messageAlert.isError) ? "#b73636" : "white";
    
    return (
        <div className="MessageAlert">
            <h5 className="MessageAlertTextField" style={{color: `${color}`}}>{messageAlert.message}</h5>
        </div>
    );

}