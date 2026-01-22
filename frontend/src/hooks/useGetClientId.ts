import { useEffect } from "react";
import { initClient } from "../api/movieApi";

export default function useInitClient() {
  const storageId = localStorage.getItem("clientId");
  useEffect(() => {
    if (!storageId) {
      initClient();
    }
  }, []);
}
