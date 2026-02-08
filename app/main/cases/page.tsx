"use client";

import { useEffect, useState } from "react";
import QueueItem from "./QueueItem";
import styles from "./page.module.css";

type CaseItem = {
  id?: number | string;
  fileName?: string;
  file_name?: string;
  filename?: string;
  date?: string;
  receivedDate?: string;
  createdAt?: string;
  status?: string;
  statusLabel?: string;
  caseId?: number | string;
  patientName?: string;
  patientCode?: string;
  measuredAt?: string;
  imageCount?: number;
};

type CasesResponse = CaseItem[] | { data?: CaseItem[] };

export default function QueuePage() {
  const [items, setItems] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadCases = async () => {
      try {
        setLoading(true);
        setError(null);

        // Lấy token từ cookie
        const getCookie = (name: string) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop()?.split(";").shift();
          return "";
        };
        const token = getCookie("accessToken");

        const res = await fetch("http://localhost:8080/api/cases", {
          cache: "no-store",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        if (res.status === 401) {
          document.cookie =
            "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          window.location.href = "/auth/login";

          return;
        }
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const json: CasesResponse = await res.json();
        console.log("=== RAW RESPONSE ===");
        console.log(json);
        console.log("Is array:", Array.isArray(json));
        console.log("json.data:", (json as any).data);
        const list = Array.isArray(json)
          ? json
          : Array.isArray(json?.data)
            ? json.data
            : [];

        if (!cancelled) {
          setItems(list);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadCases();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>HÀNG ĐỢI FILE ECG</h1>

      <div className={styles.listWrapper}>
        {loading ? (
          <div className={styles.stateText}>LOADING...</div>
        ) : error ? (
          <div className={styles.stateTextError}>ERROR: {error}</div>
        ) : items.length === 0 ? (
          <div className={styles.stateText}>NO DATA</div>
        ) : (
          items.map((item, index) => {
            const key = item.id ?? index;
            return (
              <QueueItem
                key={key}
                patientName={item.patientName ?? "UNKNOWN"}
                patientCode={item.patientCode ?? ""}
                measuredAt={item.measuredAt ?? item.createdAt ?? ""}
                status={item.status ?? ""}
                imageCount={item.imageCount ?? 0}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
