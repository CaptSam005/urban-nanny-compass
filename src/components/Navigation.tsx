
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Users, Shield } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">UPC</span>
            </div>
            <span className="font-semibold text-gray-900">Urban Parents Club</span>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant={isActive("/") ? "default" : "ghost"}
              size="sm"
              asChild
            >
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
            </Button>
            <Button
              variant={isActive("/nannies") ? "default" : "ghost"}
              size="sm"
              asChild
            >
              <Link to="/nannies">
                <Users className="w-4 h-4 mr-2" />
                Nannies
              </Link>
            </Button>
            <Button
              variant={isActive("/admin") ? "default" : "ghost"}
              size="sm"
              asChild
            >
              <Link to="/admin">
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
