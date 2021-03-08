import {useEffect} from "react";
import {Modal} from "semantic-ui-react";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({render, modalOpen, setModalOpen, timeout}) => {
    useEffect(() => {
        let timeoutID = null;
        if (timeout) {
            timeoutID = setTimeout(() => setModalOpen(false), timeout);
        }
        return () => timeoutID && clearTimeout(timeoutID);
    });

    return (
        <Modal
            closeIcon
            onClose={() => setModalOpen(false)}
            open={modalOpen}
        >
            {render()}
        </Modal>
    );
};