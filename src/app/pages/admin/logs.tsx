import { useState } from "react";
import { Search, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { toast } from "sonner";

const initialLogs = [
  { id: 1, timestamp: "2024-05-18 14:30:45", action: "User Login", user: "john@ddapl.com", status: "success" },
  { id: 2, timestamp: "2024-05-18 14:25:12", action: "Invoice Approved", user: "jane@zepto.com", status: "success" },
  { id: 3, timestamp: "2024-05-18 14:20:33", action: "PO Created", user: "john@ddapl.com", status: "success" },
  { id: 4, timestamp: "2024-05-18 14:15:21", action: "Failed Login Attempt", user: "unknown@test.com", status: "error" },
  { id: 5, timestamp: "2024-05-18 14:10:08", action: "POD Uploaded", user: "mike@ddapl.com", status: "success" },
  { id: 6, timestamp: "2024-05-18 13:55:01", action: "System Update", user: "admin@ddapl.com", status: "success" },
  { id: 7, timestamp: "2024-05-18 13:42:19", action: "Rejection Resolved", user: "mike@ddapl.com", status: "success" },
];

export function AdminLogs() {
  const [logs, setLogs] = useState(initialLogs);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleClearLogs = () => {
    setLogs([]);
    toast.success("System activity logs cleared");
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.user.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">System Activity Logs</h1>
          <p className="mt-1 text-neutral-500">Track actions, logins, and system events</p>
        </div>
        <Button variant="destructive" onClick={handleClearLogs} disabled={logs.length === 0}>
          <Trash2 className="mr-2 h-4 w-4" />
          Clear Logs
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Activity Logs</CardTitle>
          <CardDescription>Real-time audit trail of all transactions and system updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                placeholder="Search logs by action or user email..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>
                        <Badge variant={log.status === "success" ? "default" : "destructive"}>
                          {log.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-neutral-500">
                      No logs found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
