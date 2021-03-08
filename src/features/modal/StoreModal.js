import {useEffect} from "react";
import {Modal} from "semantic-ui-react";

export default ({render, modalOpen, setModalOpen, timeout}) => {
    useEffect(() => {
        const timeoutID = setTimeout(() => setModalOpen(false), timeout);
        return () => clearTimeout(timeoutID);
    });

    return (
        <Modal
            closeIcon
            onClose={() => {
                setModalOpen(false);
            }}
            open={modalOpen}
        >
            {render()}
        </Modal>
    );
};