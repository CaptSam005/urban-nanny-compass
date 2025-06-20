
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Phone, User, Calendar, Filter } from "lucide-react";
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

const DuplicateChecker = () => {
  const [sortBy, setSortBy] = useState("timestamp");
  const [filterSource, setFilterSource] = useState("all");

  const filteredDuplicates = mockDuplicates
    .filter(duplicate => filterSource === "all" || duplicate.source === filterSource)
    .sort((a, b) => {
      switch (sortBy) {
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
            <AlertTriangle className="w-8 h-8 text-orange-500" />
            Duplicate Checker
          </h1>
          <p className="text-gray-600">Review and manage duplicate nanny entries</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">{mockDuplicates.length}</div>
              <div className="text-gray-600">Total Duplicates</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {mockDuplicates.reduce((sum, dup) => sum + dup.duplicateCount, 0)}
              </div>
              <div className="text-gray-600">Duplicate Entries</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {mockDuplicates.filter(d => d.source === "Google Form").length}
              </div>
              <div className="text-gray-600">From Forms</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex gap-4">
            <Select value={filterSource} onValueChange={setFilterSource}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="Google Form">Google Form</SelectItem>
                <SelectItem value="Manual Entry">Manual Entry</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
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
        </div>

        {/* Duplicate List */}
        <div className="space-y-4">
          {filteredDuplicates.map((duplicate) => (
            <Card key={duplicate.id} className="border-l-4 border-orange-400">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      {duplicate.fullName}
                    </CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
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
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Phone Number</label>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">{duplicate.phone}</span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => window.open(`tel:${duplicate.phone}`, '_self')}
                      >
                        <Phone className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Submitted</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{new Date(duplicate.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-600">Duplicate Reasons</label>
                  <div className="flex flex-wrap gap-2 mt-1">
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
                    Compare Entries
                  </Button>
                  <Button size="sm" variant="destructive">
                    Mark as Duplicate
                  </Button>
                  <Button size="sm">
                    Keep Separate
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDuplicates.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No duplicates found</h3>
            <p className="text-gray-600">All entries appear to be unique based on current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DuplicateChecker;
