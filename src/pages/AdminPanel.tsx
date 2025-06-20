import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Shield, Users, Calendar, Settings, Star, MessageCircle, FileText, AlertTriangle, Phone, User, Filter } from "lucide-react";
import Navigation from "@/components/Navigation";

// Mock duplicate data
const mockDuplicates = [
  {
    id: "DUP001",
    fullName: "Priya Sharma",
    phone: "+91 9876543210",
    source: "Google Form",
    timestamp: "2024-01-15T10:30:00Z",
    duplicateCount: 2,
    originalId: "N001",
    reasons: ["Same Phone", "Same Name"]
  },
  {
    id: "DUP002",
    fullName: "Anita Devi",
    phone: "+91 9876543220",
    source: "Manual Entry",
    timestamp: "2024-01-14T15:45:00Z",
    duplicateCount: 3,
    originalId: "N008",
    reasons: ["Same Phone", "Similar Name", "Same Address"]
  },
  {
    id: "DUP003",
    fullName: "Sunita K",
    phone: "+91 9876543215",
    source: "Google Form",
    timestamp: "2024-01-13T09:20:00Z",
    duplicateCount: 2,
    originalId: "N015",
    reasons: ["Same Phone"]
  }
];

const AdminPanel = () => {
  const [selectedNanny, setSelectedNanny] = useState("N001");
  const [currentStage, setCurrentStage] = useState("Active");
  const [verificationScore, setVerificationScore] = useState("85");
  const [parentComments, setParentComments] = useState("");
  const [parentRating, setParentRating] = useState("4.5");
  const [duplicateFilterSource, setDuplicateFilterSource] = useState("all");
  const [duplicateSortBy, setDuplicateSortBy] = useState("timestamp");

  // Mock data for admin operations
  const recentActivities = [
    { id: 1, action: "Verification completed", nanny: "Priya Sharma", timestamp: "2 hours ago" },
    { id: 2, action: "New application received", nanny: "Meera Patel", timestamp: "4 hours ago" },
    { id: 3, action: "Profile updated", nanny: "Anita Devi", timestamp: "1 day ago" },
    { id: 4, action: "Reference verified", nanny: "Sunita Reddy", timestamp: "2 days ago" },
  ];

  const pendingTasks = [
    { id: 1, task: "Review police verification for N005", priority: "High", dueDate: "Today" },
    { id: 2, task: "Follow up with N012 references", priority: "Medium", dueDate: "Tomorrow" },
    { id: 3, task: "Update verification score for N008", priority: "Low", dueDate: "This week" },
  ];

  const filteredDuplicates = mockDuplicates
    .filter(duplicate => duplicateFilterSource === "all" || duplicate.source === duplicateFilterSource)
    .sort((a, b) => {
      switch (duplicateSortBy) {
        case "duplicateCount":
          return b.duplicateCount - a.duplicateCount;
        case "name":
          return a.fullName.localeCompare(b.fullName);
        default:
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Shield className="w-8 h-8 text-green-600" />
            Admin Panel
          </h1>
          <p className="text-gray-600">Administrative controls and system management</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">247</div>
                  <div className="text-sm text-gray-600">Total Nannies</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">156</div>
                  <div className="text-sm text-gray-600">Verified</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">23</div>
                  <div className="text-sm text-gray-600">Pending Review</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{mockDuplicates.length}</div>
                  <div className="text-sm text-gray-600">Potential Duplicates</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Potential Duplicates Section */}
          <div className="lg:col-span-3 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-orange-500" />
                  Potential Duplicates
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Duplicate Filters */}
                <div className="flex gap-4 mb-6">
                  <Select value={duplicateFilterSource} onValueChange={setDuplicateFilterSource}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by Source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sources</SelectItem>
                      <SelectItem value="Google Form">Google Form</SelectItem>
                      <SelectItem value="Manual Entry">Manual Entry</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={duplicateSortBy} onValueChange={setDuplicateSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="timestamp">Latest First</SelectItem>
                      <SelectItem value="duplicateCount">Most Duplicates</SelectItem>
                      <SelectItem value="name">Name A-Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Duplicate List */}
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {filteredDuplicates.map((duplicate) => (
                    <div key={duplicate.id} className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <User className="w-4 h-4" />
                            <span className="font-medium">{duplicate.fullName}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>ID: {duplicate.id}</span>
                            <span>Original: {duplicate.originalId}</span>
                            <Badge variant="outline" className="text-xs">
                              {duplicate.source}
                            </Badge>
                          </div>
                        </div>
                        <Badge variant="destructive">
                          {duplicate.duplicateCount} Duplicates
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <span className="text-sm font-medium text-gray-600">Phone: </span>
                          <span className="font-mono text-sm">{duplicate.phone}</span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="ml-2 h-6 w-6 p-0"
                            onClick={() => window.open(`tel:${duplicate.phone}`, '_self')}
                          >
                            <Phone className="w-3 h-3" />
                          </Button>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Submitted: </span>
                          <span className="text-sm">{new Date(duplicate.timestamp).toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <span className="text-sm font-medium text-gray-600">Reasons: </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {duplicate.reasons.map((reason) => (
                            <Badge key={reason} variant="secondary" className="text-xs">
                              {reason}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View Original
                        </Button>
                        <Button size="sm" variant="outline">
                          Compare
                        </Button>
                        <Button size="sm" variant="destructive">
                          Mark as Duplicate
                        </Button>
                        <Button size="sm">
                          Keep Separate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredDuplicates.length === 0 && (
                  <div className="text-center py-8">
                    <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No duplicates found</h3>
                    <p className="text-gray-600">All entries appear to be unique based on current filters.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Admin Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Nanny Management */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Nanny Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-2 block">Select Nanny</label>
                  <Select value={selectedNanny} onValueChange={setSelectedNanny}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a nanny to manage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="N001">N001 - Priya Sharma</SelectItem>
                      <SelectItem value="N002">N002 - Anita Devi</SelectItem>
                      <SelectItem value="N003">N003 - Sunita Reddy</SelectItem>
                      <SelectItem value="N004">N004 - Meera Patel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">Current Stage</label>
                    <Select value={currentStage} onValueChange={setCurrentStage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="New">New Application</SelectItem>
                        <SelectItem value="Under Review">Under Review</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Verified">Verified</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">Verification Score</label>
                    <Select value={verificationScore} onValueChange={setVerificationScore}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-30">0-30 (Low)</SelectItem>
                        <SelectItem value="31-50">31-50 (Basic)</SelectItem>
                        <SelectItem value="51-70">51-70 (Good)</SelectItem>
                        <SelectItem value="71-85">71-85 (High)</SelectItem>
                        <SelectItem value="86-100">86-100 (Complete)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 mb-2 block">Parent Rating</label>
                  <Select value={parentRating} onValueChange={setParentRating}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Star</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 mb-2 block">Parent Comments</label>
                  <Textarea
                    placeholder="Enter parent feedback and comments..."
                    value={parentComments}
                    onChange={(e) => setParentComments(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">Update Profile</Button>
                  <Button variant="outline">View Full Profile</Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="font-medium text-sm">{activity.action}</p>
                        <p className="text-xs text-gray-600">{activity.nanny}</p>
                      </div>
                      <span className="text-xs text-gray-500">{activity.timestamp}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Activities
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pending Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Pending Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingTasks.map((task) => (
                    <div key={task.id} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium mb-1">{task.task}</p>
                      <div className="flex justify-between items-center">
                        <Badge 
                          variant={task.priority === "High" ? "destructive" : task.priority === "Medium" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {task.priority}
                        </Badge>
                        <span className="text-xs text-gray-600">{task.dueDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Tasks
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Export Nanny List
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Bulk Verification
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  System Settings
                </Button>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Google Sheets Sync</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Document Storage</span>
                  <Badge variant="default">Online</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Form Integration</span>
                  <Badge variant="default">Working</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Last Backup</span>
                  <span className="text-xs text-gray-600">2 hours ago</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
