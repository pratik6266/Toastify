import './index.css'
import ToastProvider from './provider/ToastProvider';
import { Toast } from './index';

function App() {

  return (
    <>
      <ToastProvider>
        <MyTest/>
      </ToastProvider>
    </>
  )
}

function MyTest() {

  // const { addToast } = useToast();

  const handleClick = () => {
    Toast.sendToast({
      title: 'Success',
      description: 'This is a success toast',
      type: 'success',
      cta: 'Undo',
      position: 'top-right'
    })
  };

  return (
    <button className='show-button' onClick={handleClick}>Show Toast</button>
  );
}

export default App