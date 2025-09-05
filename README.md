

# Toastify

Toastify is a customizable React toast notification system built with TypeScript. It provides a ToastProvider and a Toast service for showing notifications anywhere in your app.

## Features
- Show success, error, and info toasts
- Custom title, description, CTA, and position
- Pause/resume on hover
- Animated exit and progress bar
- Easy integration with React context/provider

## Installation

```bash
npm install toastify
```

## Usage

Wrap your app with the `ToastProvider`:

```tsx
import ToastProvider from 'toastify/dist/provider/ToastProvider';
import { Toast } from 'toastify';

function App() {
  return (
    <ToastProvider>
      <YourComponent />
    </ToastProvider>
  );
}
```

Show a toast from anywhere:

```tsx
Toast.sendToast({
  title: 'Success',
  description: 'This is a success toast',
  type: 'success', // 'success' | 'error' | 'info'
  cta: 'Undo',     // optional
  position: 'top-right' // 'top-right', 'top-left', 'bottom-right', 'bottom-left'
});
```

## API

- `Toast.sendToast({ title, description, type, cta?, position? })`
  - `title`: string (required)
  - `description`: string (required)
  - `type`: 'success' | 'error' | 'info' (optional, default: 'success')
  - `cta`: string (optional)
  - `position`: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' (optional, default: 'top-right')

## Example

```tsx
import { Toast } from 'toastify';

function MyButton() {
  const handleClick = () => {
    Toast.sendToast({
      title: 'Success',
      description: 'Your action was successful!',
      type: 'success',
      position: 'top-right'
    });
  };
  return <button onClick={handleClick}>Show Toast</button>;
}
```

## License

MIT
