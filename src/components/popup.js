import {useState} from 'react'

function Popup(){


    const [isOpen, setOpen] = useState(false);

    function handleVisibility() {
        console.log("HERE AT")
        setOpen(prev => !prev);
        console.log(isOpen)
    }

    const popUpWrapperStyle = {
        position: "fixed",
        zIndex: 1,
        
    }
    const popUpStyle = {
        backgroundColor: "grey",
        position: "absolute"
    }
    return (
    <div>
        <button type='button' onClick={handleVisibility}>Info</button>
        {isOpen &&

        (<div style={popUpWrapperStyle}>
            <div style={popUpStyle}>
                <span onClick={handleVisibility}> hello</span>
                <p> HelloHelloHelloHelloHelloHelloHelloHello </p>
            </div>
        </div>)
            
        }
    </div>
    )

}

export default Popup;