import { useState } from "react";
import { cn } from "../../lib/utils";

export type ToastProps = {
  title?: string;
  description?: string;
  action?: ToastActionElement;
  onClose?: () => void;
};

export type ToastActionElement = {
  label: string;
  onClick: () => void;
};

export function Toast({ title, description, action, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg",
        "flex flex-col space-y-2 w-80"
      )}
    >
      {title && <strong className="text-lg">{title}</strong>}
      {description && <p className="text-sm">{description}</p>}
      <div className="flex justify-end space-x-2">
        {action && (
          <button
            className="bg-blue-500 hover:bg-blue-600 px-3 py-1 text-sm rounded-md"
            onClick={action.onClick}
          >
            {action.label}
          </button>
        )}
        <button
          className="bg-red-500 hover:bg-red-600 px-3 py-1 text-sm rounded-md"
          onClick={() => {
            setVisible(false);
            if (onClose) onClose();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
