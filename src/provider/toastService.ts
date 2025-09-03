class ToastService{
  _sendNotification: ((data: unknown) => void) | null = null;
  registerNotification(fn: (data: unknown) => void) {
    this._sendNotification = fn;
  }
  sendToast(data: unknown){
    if(this._sendNotification){
      this._sendNotification(data);
    }
    else {
      console.error('Toast service not initialized yet.');
    }
  }
}

const toastService = new ToastService();
export default toastService;