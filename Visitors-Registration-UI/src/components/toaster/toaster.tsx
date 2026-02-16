// import toast from "react-hot-toast";

// export const showSuccess = (msg: string) => {
//   toast.success(msg);
// };

// export const showError = (msg: string) => {
//   toast.error(msg);
// };

// export const showInfo = (msg: string) => {
//   toast(msg);
// };

// export const showWarning = (msg: string) => {
//     toast(msg, { icon: "⚠️", });
// }

import toast from "react-hot-toast";

const buildContent = (title: string, message: string) => (
  <div>
    <div style={{ fontWeight: 600 }}>{title}</div>
    <div style={{ fontSize: "13px" }}>{message}</div>
  </div>
);

export const success = (message: string, title = "Success") => {
  console.log("SUCCESS:", message);

  toast.success(buildContent(title, message));
};

export const error = (message: string, title = "Error") => {
  console.log("ERROR:", message);

  toast.error(buildContent(title, message));
};

export const warning = (message: string, title = "Warning") => {
  console.log("WARNING:", message);

  toast(buildContent(title, message), {
    icon: "⚠️",
    style: {
      borderLeft: "6px solid #dc3545",
    },
  });
};

export const info = (message: string, title = "Info") => {
  console.log("INFO:", message);

  toast(buildContent(title, message), {
    icon: "ℹ️",
    style: {
      borderLeft: "6px solid #0d6efd",
    },
  });
};
