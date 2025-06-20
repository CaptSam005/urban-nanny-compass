
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, Filter, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { AddNannyModal } from "@/components/AddNannyModal";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Urban Parents Club
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Nanny Management System
          </p>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/nannies">
              <CardHeader className="text-center">
                <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <CardTitle className="text-lg">Nanny Database</CardTitle>
                <CardDescription>
                  Browse and manage all registered nannies
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/duplicates">
              <CardHeader className="text-center">
                <Filter className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <CardTitle className="text-lg">Duplicate Checker</CardTitle>
                <CardDescription>
                  Review and manage duplicate entries
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/admin">
              <CardHeader className="text-center">
                <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-lg">Admin Panel</CardTitle>
                <CardDescription>
                  Administrative controls and settings
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <UserCheck className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <CardTitle className="text-lg">Verification</CardTitle>
              <CardDescription>
                Track verification status and documents
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">247</div>
              <div className="text-gray-600">Total Nannies</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">89</div>
              <div className="text-gray-600">Available Now</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">156</div>
              <div className="text-gray-600">Verified</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="text-center">
          <div className="space-x-4">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link to="/nannies">View All Nannies</Link>
            </Button>
            <AddNannyModal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
