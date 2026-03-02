import React from "react";

const SDK_ID = "zenchef-sdk";
const SDK_SRC = "https://sdk.zenchef.com/v1/sdk.min.js";

function ensureZenchefSdkLoaded() {
  if (typeof document === "undefined") return;
  if (document.getElementById(SDK_ID)) return;

  const firstScript = document.getElementsByTagName("script")[0];
  if (!firstScript || !firstScript.parentNode) return;

  const js = document.createElement("script");
  js.id = SDK_ID;
  js.src = SDK_SRC;
  firstScript.parentNode.insertBefore(js, firstScript);
}

export default function ZenchefWidget() {
  React.useEffect(() => {
    ensureZenchefSdkLoaded();
  }, []);

  return (
    <div
      className="zc-widget-config"
      data-restaurant="375827"
      data-lang="nl"
      data-position="right"
      data-open="false"
    />
  );
}

