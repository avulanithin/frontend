import { useEffect, useState } from "react";
import { fetchDailySummary } from "../services/dashboardService";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

type DashboardData = {
  date: string;
  emails_today: {
    id: number;
    sender: string;
    subject: string;
    summary: string;
    received_at: string;
  }[];
  pending_tasks: {
    id: number;
    title: string;
    priority: string;
  }[];
  approved_tasks: {
    id: number;
    title: string;
    priority: string;
  }[];
  calendar_events: {
    id: number;
    title: string;
    start_time: string;
    end_time: string;
  }[];
};

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDailySummary()
      .then((res) => setData(res))
      .catch(() => setError("Failed to load dashboard data"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!data) return null;

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Daily Executive Summary — {data.date}
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">📧 Emails Today</Typography>
        <List>
          {data.emails_today.map((e) => (
            <ListItem key={e.id}>
              <ListItemText
                primary={e.subject}
                secondary={`${e.sender} — ${e.summary}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">⏳ Pending Tasks</Typography>
        {data.pending_tasks.length === 0 ? (
          <Typography>No pending tasks</Typography>
        ) : (
          data.pending_tasks.map((t) => (
            <Typography key={t.id}>
              {t.title} ({t.priority})
            </Typography>
          ))
        )}
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">📅 Calendar Events</Typography>
        {data.calendar_events.map((c) => (
          <Typography key={c.id}>
            {c.title} — {new Date(c.start_time).toLocaleString()}
          </Typography>
        ))}
      </Paper>
    </Box>
  );
}
