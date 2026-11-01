"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "./api";

// Loads data from the API and gives back loading and error state.
// setData lets a page update the list after an edit or delete without reloading.
export function useFetch(path, { auth = false, enabled = true } = {}) {
  const [state, setState] = useState({
    data: null,
    error: "",
    status: 0,
    loading: true,
  });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!enabled || !path) return;
    let cancelled = false;

    apiFetch(path, { auth })
      .then((data) => {
        if (!cancelled) setState({ data, error: "", status: 200, loading: false });
      })
      .catch((err) => {
        if (!cancelled) {
          setState({
            data: null,
            error: err.message,
            status: err.status || 0,
            loading: false,
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [path, auth, enabled, tick]);

  const reload = useCallback(() => {
    setState((current) => ({ ...current, loading: true, error: "" }));
    setTick((value) => value + 1);
  }, []);

  const setData = useCallback((updater) => {
    setState((current) => ({
      ...current,
      data: typeof updater === "function" ? updater(current.data) : updater,
    }));
  }, []);

  return { ...state, reload, setData };
}