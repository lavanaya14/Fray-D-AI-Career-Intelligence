// import { useState } from "react";

// export default function FloatingChatbot() {
//   return (
//     <div
//       style={{
//         position: "fixed",
//         right: "30px",
//         bottom: "30px",
//         width: "70px",
//         height: "70px",
//         borderRadius: "50%",
//         background: "#2563eb",
//         color: "white",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         fontSize: "30px",
//         cursor: "pointer",
//         zIndex: 9999,
//       }}
//     >
//       🤖
//     </div>
//   );
// }









import ChatbotWidget from "./ChatbotWidget";

export default function FloatingChatbot() {
  return <ChatbotWidget />;
}