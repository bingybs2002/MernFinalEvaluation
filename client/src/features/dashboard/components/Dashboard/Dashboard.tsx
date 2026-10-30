import { StatsPanel } from "../StatsPanel/StatsPanel";
import { RecentActivity } from "../RecentActivity/RecentActivity";
import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import type { DashboardStats } from "../../types/dashboard.types";
import axios from "axios";
import { LoadingSpinner } from "../../../../shared/components/LoadingSpinner/LoadingSpinner";
import type { Ticket } from "../../../tickets/types/ticket.types";
import type { ApiResponse } from "../../../../shared/types/api.types";

export function Dashboard() {
  // 🔴 TODO:
  // 1. Fetch GET /stats and GET /stats/recent with axios (base URL: http://localhost:4000/api)
  // 2. Display the stats and recent activity data (pass them to StatsPanel and RecentActivity)
  // 3. Handle loading and error states

  const url:string = "http://localhost:4000/api";

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [statsRecent, setStatRecent] = useState<Ticket[]>([]);
  const [error, setError] = useState<string | null>("");
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchData = async () =>{
        try{
          const fetchStats = await axios.get<ApiResponse<DashboardStats>>(`${url}/stats`)
          const fetchStatsRecent = await axios.get<ApiResponse<Ticket[]>>(`${url}/stats/recent`)
          setStats(fetchStats.data.data);
          setStatRecent(fetchStatsRecent.data.data);
        }catch{
        setError("Failed to load dashboard");
      }finally{
        setLoading(false);
      }
    }
    fetchData();
  }, [] );

  if(loading) return <LoadingSpinner/>

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      {loading && <LoadingSpinner/>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && stats && (
        <>
        <StatsPanel stats={stats}/>
        <RecentActivity tickets={statsRecent}/>
        </>
      )}
    </div>
  );
}
