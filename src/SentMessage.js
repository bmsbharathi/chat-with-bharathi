import "./css/SentMessages.css";
const SentMessage = (props) => {

    return (
        <div className="sentMessage">

            <span>
                {props.message.message}

            </span>
            <img src={props.user.photoURL} className="chatPicture" alt="displayPicture" /><br />
            {props.message.timestamp}

        </div>
    );
}

export default SentMessage;