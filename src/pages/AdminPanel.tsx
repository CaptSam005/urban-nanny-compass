
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Shield, Users, Calendar, Settings, Star, MessageCircle, FileText } from "lucide-react";
import Navigation from "@/components/Navigation";

const AdminPanel = () => {
  const [selectedNanny, setSelectedNanny] = useState("N001");
  const [currentStage, setCurrentStage] = useState("Active");
  const [verificationScore, setVerificationScore] = useState("85");
  const [parentComments, setParentComments] = useState("");
  const [parentRating, setParentRating] = useState("4.5");

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
                  <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">12</div>
                  <div className="text-sm text-gray-600">This Week</div>
                </CardContent>
              </Card>
            </div>
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
