import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Notifi = () => {

    return (  <ToastContainer
                position="top-right"
                autoClose={2500}
                limit={1}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
    )


}