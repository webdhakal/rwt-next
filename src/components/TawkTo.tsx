import { useEffect } from "react";

const TawkTo = () => {
  useEffect(() => {
    const tawkScript = document.createElement("script");
    tawkScript.src = import.meta.env.VITE_TAWK_TO_API;
    tawkScript.async = true;
    tawkScript.setAttribute("crossorigin", "*");
    document.body.appendChild(tawkScript);
    const observer = new MutationObserver(() => {
      let chatIframe = document.querySelector("iframe[title='chat widget']");
      if (chatIframe) {
        // @ts-ignore
        // chatIframe.style.border = "1px solid black";
        observer.disconnect();
      }
    });

    // Start observing the DOM for changes in child elements
    observer.observe(document.body, { childList: true, subtree: true });

  }, []);

  return null;
};

export default TawkTo;
